// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AgentPayToken is ERC20, Ownable {
    constructor(string memory name, string memory symbol, address initialOwner) ERC20(name, symbol) Ownable(initialOwner) {
        // Mint initial supply to the initial owner
        _mint(initialOwner, 1000000 * 10 ** decimals());
    }

    // Function to mint new tokens (only owner can call)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Function to burn tokens
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
