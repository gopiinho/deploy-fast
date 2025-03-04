// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {ERC20Factory} from "./factory/ERC20Factory.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract DeployFastManager is ERC20Factory, Ownable {
    ERC20Factory erc20Factory;

    constructor() Ownable(msg.sender) {
        erc20Factory = new ERC20Factory();
    }

    function updateErc20Factory(address _erc20Factory) external onlyOwner {
        erc20Factory = ERC20Factory(_erc20Factory);
    }   
 }