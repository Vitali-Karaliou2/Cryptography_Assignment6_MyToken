const { expect } = require("chai");

describe("MyToken", function () {
  it("Should deploy with correct initial supply", async function () {
    const [deployer] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(ethers.parseEther("1000000"));
    await myToken.waitForDeployment();
    
    const balance = await myToken.balanceOf(deployer.address);
    expect(balance).to.equal(ethers.parseEther("1000000"));
  });
});