const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

module.exports = async function(deployer) {
  //Deploy token
  await deployer.deploy(Token);
  const token= await Token.deployed()
  //Deploy exchange with token address as parameter
  await deployer.deploy(EthSwap,token.address);
  const ethswap= await EthSwap.deployed()

  await token.transfer(ethswap.address,'2')
};
