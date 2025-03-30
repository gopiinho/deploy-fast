// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {ERC20Contract} from "../tokens/ERC20.sol";

contract ERC20Factory  {
    ///////////////////////
    /// State Variables ///
    ///////////////////////
    ERC20Contract public erc20;

    ///////////////
    ///  Events ///
    ///////////////
    event ERC20Deployed(string indexed name, string indexed symbol, uint256 mintAmount, address indexed erc20Address);

    ///////////////
    // Functions //
    ///////////////
    constructor() {}

    function _deployErc20(string memory name, string memory symbol, uint256 mintAmount, address mintTo) external returns(address) {
        address erc20Address = address(new ERC20Contract(name, symbol, mintAmount, mintTo));
        erc20 = ERC20Contract(erc20Address);
        emit ERC20Deployed(name, symbol, mintAmount, erc20Address);
        return erc20Address;
    }
 }