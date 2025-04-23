// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Contract is ERC721, Ownable {
    uint256 public tokenIdCounter;

    ///////////////
    // Functions //
    ///////////////
    constructor(string memory name, string memory symbol, address deployer) ERC721(name, symbol) Ownable(deployer) {}

    function mintNft(address to) public onlyOwner {
        uint256 _tokenId = tokenIdCounter;
        _safeMint(to, _tokenId);
        tokenIdCounter++;
    }
}
