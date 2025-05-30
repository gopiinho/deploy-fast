// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {ERC20Contract} from "../tokens/ERC20.sol";

contract ERC20Factory {
    ///////////////
    ///  Events ///
    ///////////////
    event ERC20Deployed(string indexed name, string indexed symbol, uint256 mintAmount, address indexed erc20Address);

    ///////////////////////
    /// State Variables ///
    ///////////////////////
    address[] public deployedContracts;
    mapping(address => address[]) public userContracts;

    ///////////////
    // Functions //
    ///////////////
    constructor() {}

    function _deployErc20(string memory name, string memory symbol, uint256 mintAmount, address mintTo)
        external
        returns (address)
    {
        address erc20Address = address(new ERC20Contract(name, symbol, mintAmount, mintTo, msg.sender));
        deployedContracts.push(erc20Address);
        userContracts[msg.sender].push(erc20Address);
        emit ERC20Deployed(name, symbol, mintAmount, erc20Address);
        return erc20Address;
    }
}
