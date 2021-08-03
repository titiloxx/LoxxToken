const Token = artifacts.require('Token')
const EthSwap = artifacts.require('EthSwap')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('EthSwap', ([deployer, investor]) => {
  let token,ethswap;
  before(async ()=>{
    token = await Token.new();
    ethswap = await EthSwap.new(token.address);
    //Transfer all tokens to ethswap
    await token.transfer(ethswap.address,"2");
  })

  describe("buyToken()",()=>{
    it('Purchase tokens for ethswap',async ()=>{
      await ethswap.buyToken(2)
      const balanceMain=await token.balanceOf(deployer)
      const balanceEthSwap=await token.balanceOf(ethswap.address)
      assert.equal(balanceMain.toString(),"2");
      assert.equal(balanceEthSwap.toString(),"0");
    })
  })

  describe("sellToken()",()=>{
    it('Sell tokens for ethswap',async ()=>{
      await token.approve(ethswap.address,2)
      await ethswap.sellToken(2)
      const balanceMain=await token.balanceOf(deployer)
      const balanceEthSwap=await token.balanceOf(ethswap.address)
      assert.equal(balanceMain.toString(),"0");
      assert.equal(balanceEthSwap.toString(),"2");
    })
  })
})