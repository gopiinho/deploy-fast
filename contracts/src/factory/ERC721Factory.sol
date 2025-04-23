// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {ERC721Contract} from "../tokens/ERC721.sol";

contract ERC721Factory {
    ///////////////
    ///  Events ///
    ///////////////
    event ERC721Deployed(string indexed name, string indexed symbol, address indexed erc20Address);

    ///////////////
    // Functions //
    ///////////////
    constructor() {}

    function _deployErc721(string memory name, string memory symbol) external returns (address) {
        address erc721Address = address(new ERC721Contract(name, symbol, msg.sender));
        emit ERC721Deployed(name, symbol, erc721Address);
        return erc721Address;
    }
}
