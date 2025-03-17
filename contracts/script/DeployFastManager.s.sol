// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Script, console2} from "forge-std/Script.sol";
import {DeployFastManager} from "../src/DeployFastManager.sol";

contract DeployTokenFactory is Script {
    DeployFastManager public dpManager;

    function setUp() public {}

    function run() external {
        vm.startBroadcast();
        dpManager = new DeployFastManager();
        // Log the address of the deployed contract and the transaction hash
        console2.log("DeployFastManager deployed to: ", address(dpManager));
        vm.stopBroadcast();
    }
}