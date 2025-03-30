// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20Contract is ERC20, Ownable {
    ///////////////
    // Functions //
    ///////////////
    constructor(string memory name, string memory symbol, uint256 mintAmount, address mintTo, address deployer)
        ERC20(name, symbol)
        Ownable(deployer)
    {
        _mint(mintTo, mintAmount);
    }

    function mintTokens(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }
}
