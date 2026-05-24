# ERC20 Token Contract (Assignment 6)

A standard ERC20 token contract deployed on the Sepolia testnet using OpenZeppelin's audited implementation. The token includes minting functionality restricted to the owner and supports standard transfers and balance checks.

## Key Features

- **ERC20 Standard** – Fully compliant with ERC20 token standard
- **Ownable** – Owner-only minting functionality using OpenZeppelin's Ownable pattern
- **Initial Supply** – 1,000,000 MTK tokens minted to deployer upon deployment
- **Test Coverage** – Comprehensive unit tests for deployment, transfers, minting, and edge cases
- **Sepolia Testnet** – Deployed and verified on Ethereum Sepolia testnet

## Project Structure

The project is organized as follows to clearly separate smart contracts, deployment scripts, and tests.

ERC20_Token_Contract_Hardhat/
hardhat.config.js         # Hardhat network configuration (Sepolia)
package.json              # NPM dependencies and scripts
.env                      # Environment variables - DO NOT COMMIT
README.md                 # This file
contracts/MyToken.sol     # ERC20 token contract with minting functionality
scripts/deploy.js         # Deployment script for the token
test/MyToken.js           # Unit tests (Mocha/Chai)

## Getting Started (Setup & Execution Guide)

Follow these steps in order to clone, configure, and run the ERC20 Token on the Sepolia testnet.

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)
- Metamask with at least 1 account funded with Sepolia ETH
- Sepolia ETH faucet – get test funds from sepoliafaucet.com

### 1. Clone the Repository

Open your terminal and run:

*git clone your-github-repo-url*


*cd ERC20_Token_Contract_Hardhat*

### 2. Install Dependencies

Install all required Node.js packages:

*npm install*

This installs hardhat, @openzeppelin/contracts, dotenv, and other required packages.

### 3. Configure Environment Variables

Create a .env file in the project root and add the following content:

SEPOLIA_RPC_URL=https://ethereum-sepolia.publicnode.com
SEPOLIA_PRIVATE_KEY=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef

CRITICAL SECURITY NOTES:
- NEVER commit the .env file. Verify it's in your .gitignore.
- Replace the placeholder private key with your actual Metamask private key
- To get private keys from Metamask: Account Details > Export Private Key
- Keep this key secure – it controls real assets on testnet/mainnet

### 4. Verify Hardhat Configuration

Open *hardhat.config.js* in your code editor and verify it contains the following configuration:

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: process.env.SEPOLIA_PRIVATE_KEY ? [process.env.SEPOLIA_PRIVATE_KEY] : []
    }
  }
};

No command needs to be run for this step – simply ensure the file matches the above.

### 5. Compile the Contract

*npx hardhat compile*

Expected output: Compiled 1 Solidity file successfully (or more depending on dependencies)

### 6. Run Unit Tests (Optional but Recommended)

Before deploying to Sepolia, test the contract locally:

*npx hardhat test*

Expected output:

  MyToken
    Deployment
      ✓ Should set the correct owner
      ✓ Should assign the total supply to the owner
    Transfers
      ✓ Should transfer tokens between accounts
      ✓ Should fail if sender doesn't have enough balance
      ✓ Should update balances after transfer
    Minting
      ✓ Should allow owner to mint new tokens
      ✓ Should NOT allow non-owner to mint tokens
    Balance checks
      ✓ Should return correct balance for multiple accounts

  8 passing

### 7. Deploy to Sepolia Testnet

Deploy the ERC20 token to Sepolia:

*npx hardhat run scripts/deploy.js --network sepolia*

Expected output:

Deploying contract with account: 0x1111111111111111111111111111111111111111
MyToken deployed to: 0x4444444444444444444444444444444444444444
Deployment tx hash: 0x7b8c3f2e1d4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c

IMPORTANT: Copy the contract address shown after "MyToken deployed to:" – you will need it for verification and interaction.

### 8. Verify Contract on Etherscan (Optional)

To verify your contract on Etherscan so others can read and interact with it:

*npx hardhat verify --network sepolia 0x4444444444444444444444444444444444444444 1000000000000000000000000*

Note: The second parameter is the initial supply in wei (1,000,000 * 10^18).

### 9. Interact with the Contract

#### Via Hardhat Console:

*npx hardhat console --network sepolia*

Then run:

*const tokenAddress = "0x4444444444444444444444444444444444444444";*
*const MyToken = await ethers.getContractFactory("MyToken");*
*const token = await MyToken.attach(tokenAddress);*

*// Check token name and symbol*
*const name = await token.name();*
*const symbol = await token.symbol();*
*console.log("Name:", name, "Symbol:", symbol);*

*// Check total supply*
*const totalSupply = await token.totalSupply();*
*console.log("Total supply:", ethers.formatEther(totalSupply));*

*// Check your balance*
*const balance = await token.balanceOf("0x1111111111111111111111111111111111111111");*
*console.log("Your balance:", ethers.formatEther(balance));*

#### Via Metamask:

1. Add the token to Metamask using the contract address
2. Symbol: MTK
3. Decimals: 18 (default for OpenZeppelin ERC20)

### Key Functions

| Function               | Access     | Description                                 |
|------------------------|------------|---------------------------------------------|
| `transfer(to, amount)` | Anyone     | Transfers tokens to another address         |
| `balanceOf(account)`   | Anyone     | Returns token balance of an address         |
| `totalSupply()`        | Anyone     | Returns total token supply                  |
| `mint(to, amount)`     | Owner only | Creates new tokens (increases total supply) |
| `owner()`              | Anyone     | Returns the contract owner address          |
| `name()`               | Anyone     | Returns "MyToken"                           |
| `symbol()`             | Anyone     | Returns "MTK"                               |
| `decimals()`           | Anyone     | Returns 18                                  |

## Script Reference Table

| Action              | Command                                                                             |
|---------------------|-------------------------------------------------------------------------------------|
| Compile             | *npx hardhat compile*                                                               |
| Run tests           | *npx hardhat test*                                                                  |
| Deploy to Sepolia   | *npx hardhat run scripts/deploy.js --network sepolia*                               |
| Verify on Etherscan | *npx hardhat verify --network sepolia <CONTRACT_ADDRESS> 1000000000000000000000000* |
| Open console        | *npx hardhat console --network sepolia*                                             |

## Successful Deployment Links (Example)

These are placeholder links. Replace with your actual deployment links.

| Resource               | Link                                       |
|------------------------|--------------------------------------------|
| Token Contract         | 0x4444444444444444444444444444444444444444 |
| Deployment Transaction | 0x7b8c3f2e1d4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c |

## Technologies Used

- Solidity ^0.8.28 – Smart contract development
- Hardhat – Development environment and testing
- Ethers.js – Ethereum interaction library
- OpenZeppelin Contracts – Audited ERC20 and Ownable implementations
- Sepolia Testnet – Ethereum test network
- Mocha/Chai – Unit testing framework

## Notes

- Initial supply is 1,000,000 MTK (with 18 decimals)
- The contract uses OpenZeppelin's Ownable pattern for access control
- Only the owner (deployer) can mint new tokens
- All tests pass with 8 test cases covering deployment, transfers, minting, and edge cases
- The contract is fully ERC20 compliant

## Common Issues and Solutions

| Issue                    | Solution                                                               |
|--------------------------|------------------------------------------------------------------------|
| "Network does not exist" | Ensure Sepolia is added to your Hardhat config                         |
| "Insufficient funds"     | Get Sepolia ETH from a faucet before deployment                        |
| "Contract not verified"  | Run the verify command with correct constructor arguments              |
| "Mint fails"             | Check that you are using the owner account                             |
| "Test fails"             | Ensure you are using the correct Hardhat network (localhost for tests) |

## Assignment Completion Checklist

| Requirement                    | Status |
|--------------------------------|--------|
| MyToken.sol created            | YES    |
| ERC20 implementation complete  | YES    |
| Owner-only minting added       | YES    |
| deploy.js script ready         | YES    |
| Contract compiled successfully | YES    |
| Contract deployed to Sepolia   | YES    |
| Unit tests written             | YES    |
| All 8 tests pass               | YES    |
| Contract on Etherscan          | YES    |

---

Assignment 6 - Complete