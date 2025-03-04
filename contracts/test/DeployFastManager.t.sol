// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Test} from "forge-std/Test.sol";
import {DeployFastManager} from "../src/DeployFastManager.sol";
import {ERC20Factory} from "../src/factory/ERC20Factory.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ERC20FactoryTest is Test {
    DeployFastManager dfManager;
    ERC20Factory factory;
    
    address DEPLOYER;
    address USER; 

    function setUp() public {
        DEPLOYER = makeAddr("deployer");
        USER = makeAddr("user");
        vm.startPrank(DEPLOYER);
        dfManager = new DeployFastManager();
        vm.stopPrank();
    }

    function testDeployErc20() public {
        vm.startPrank(USER);
        address erc20Address = dfManager._deployErc20("Token", "TKN", 10000000, USER);
        vm.stopPrank();

        uint userTokenBalance = IERC20(erc20Address).balanceOf(USER);
        assertEq(userTokenBalance, 10000000);
    }

    function testOnlyOwnerCanChangeFactoryAddress() public {
        vm.startPrank(USER);
        ERC20Factory newFactory   = new ERC20Factory();
        address newFactoryAddress = address(newFactory);
        vm.expectRevert();
        dfManager.updateErc20Factory(newFactoryAddress);
        vm.stopPrank();
    }
}