const { expect } = require("chai");

describe("MyToken", function () {
  let myToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Получаем тестовые аккаунты
    [owner, addr1, addr2] = await ethers.getSigners();
    
    // Деплоим новый контракт перед каждым тестом
    const MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy(ethers.parseEther("1000000"));
    await myToken.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      // Проверяем, что владелец контракта — деплоер
      expect(await myToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply to the owner", async function () {
      const ownerBalance = await myToken.balanceOf(owner.address);
      expect(ownerBalance).to.equal(ethers.parseEther("1000000"));
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      // Отправляем 100 токенов с owner на addr1
      await myToken.transfer(addr1.address, ethers.parseEther("100"));
      
      const addr1Balance = await myToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(ethers.parseEther("100"));
    });

    it("Should fail if sender doesn't have enough balance", async function () {
      // addr1 не имеет токенов, попытка отправить должна провалиться
      await expect(
        myToken.connect(addr1).transfer(owner.address, ethers.parseEther("1"))
      ).to.be.reverted;
    });

    it("Should update balances after transfer", async function () {
      const initialOwnerBalance = await myToken.balanceOf(owner.address);
      
      await myToken.transfer(addr1.address, ethers.parseEther("100"));
      await myToken.transfer(addr2.address, ethers.parseEther("200"));
      
      const finalOwnerBalance = await myToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - ethers.parseEther("300"));
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint new tokens", async function () {
      const initialSupply = await myToken.totalSupply();
      
      await myToken.mint(addr1.address, ethers.parseEther("500"));
      
      const newSupply = await myToken.totalSupply();
      expect(newSupply).to.equal(initialSupply + ethers.parseEther("500"));
      
      const addr1Balance = await myToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(ethers.parseEther("500"));
    });

    it("Should NOT allow non-owner to mint tokens", async function () {
      await expect(
        myToken.connect(addr1).mint(addr2.address, ethers.parseEther("100"))
      ).to.be.reverted;
    });
  });

  describe("Balance checks", function () {
    it("Should return correct balance for multiple accounts", async function () {
      await myToken.transfer(addr1.address, ethers.parseEther("300"));
      await myToken.transfer(addr2.address, ethers.parseEther("200"));
      
      expect(await myToken.balanceOf(owner.address)).to.equal(ethers.parseEther("999500"));
      expect(await myToken.balanceOf(addr1.address)).to.equal(ethers.parseEther("300"));
      expect(await myToken.balanceOf(addr2.address)).to.equal(ethers.parseEther("200"));
    });
  });
});