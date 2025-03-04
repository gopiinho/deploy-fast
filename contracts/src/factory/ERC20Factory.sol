// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {ERC20Contract} from "../tokens/ERC20.sol";

contract ERC20Factory  {
    ERC20Contract public erc20;

    constructor() {}

    function _deployErc20(string memory name, string memory symbol, uint256 mintAmount, address mintTo) external returns(address) {
        address erc20Address = address(new ERC20Contract(name, symbol, mintAmount, mintTo));
        erc20 = ERC20Contract(erc20Address);
        return erc20Address;
    }
 }