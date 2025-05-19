import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature') as string

  let data
  let eventType
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
        const priceId = retrievedSession.line_items?.data[0]?.price?.id

        const customerEmail = (customer as Stripe.Customer).email

        if (customerId) {
        }

        break
      }
    }
  } catch (err) {
    console.error(err)
  }
}
