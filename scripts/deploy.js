const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(hre.ethers.parseEther("1000000"));
  await myToken.waitForDeployment();

  console.log("MyToken deployed to:", await myToken.getAddress());
  
  const tx = myToken.deploymentTransaction();
  console.log("Deployment tx hash:", tx.hash);
}

main().catch(console.error);