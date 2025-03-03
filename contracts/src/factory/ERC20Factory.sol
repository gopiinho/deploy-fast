// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {ERC20Contract} from "../tokens/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20Factory is Ownable {
    ERC20Contract public erc20;

    constructor() Ownable(msg.sender) {}

    function deployErc20(string memory name, string memory symbol, uint256 mintAmount, address mintTo) external onlyOwner returns(address) {
        address erc20Address = address(new ERC20Contract(name, symbol, mintAmount, mintTo));
        erc20 = ERC20Contract(erc20Address);
        return erc20Address;
    }
 }