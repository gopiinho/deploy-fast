import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { api } from '../../../../../convex/_generated/api'
import { ConvexHttpClient } from 'convex/browser'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
const convexClient = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret)
  } catch (err) {
    const message =
      err instanceof Error
        ? `Webhook signature verification failed: ${err.message}`
        : 'Unknown error during Stripe webhook verification.'

    console.error(message)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object

        const retrievedSession = await stripe.checkout.sessions.retrieve(
          session.id,
          { expand: ['line_items'] }
        )

        const customerId = retrievedSession.customer
        const customer = await stripe.customers.retrieve(customerId as string)
        const customerEmail = (customer as Stripe.Customer).email
        const priceId = retrievedSession.line_items?.data[0]?.price?.id

        if (!customerEmail) {
          console.log('No customer email found')
          break
        }

        try {
          const user = await convexClient.query(api.users.getUserByEmail, {
            email: customerEmail,
          })

          if (user) {
            await convexClient.mutation(api.users.updateUserProAccess, {
              privyDid: user?.privyDid,
              hasPro: true,
              priceId: priceId,
            })
          } else {
            console.error(`No user found with email: ${customerEmail}`)
          }
        } catch (err) {
          console.error('Error updating user:', err)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        const customerId = subscription.customer as string | null
        if (!customerId) {
          console.error(
            'No customer ID found in customer.subscription.deleted event for subscription:',
            subscription.id
          )
          break
        }

        const customer = await stripe.customers.retrieve(customerId)
        if (customer.deleted) {
          console.error('Customer object is deleted for ID:', customerId)
          break
        }

        const customerEmail = (customer as Stripe.Customer).email
        if (!customerEmail) {
          console.error(
            `No customer email found for customer ID: ${customerId} during subscription deletion.`
          )
          break
        }

        try {
          const user = await convexClient.query(api.users.getUserByEmail, {
            email: customerEmail,
          })

          if (user) {
            await convexClient.mutation(api.users.updateUserProAccess, {
              privyDid: user.privyDid,
              hasPro: false,
              priceId: undefined,
            })
            console.log(`Pro access revoked for user: ${customerEmail}`)
          } else {
            console.error(
              `Subscription deleted: No user found with email: ${customerEmail}`
            )
          }
        } catch (err) {
          console.error('Error updating user after subscription deletion:', err)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Error processing webhook:', err)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
