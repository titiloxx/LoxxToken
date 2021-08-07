pragma solidity = 0.8.6;
import "./Token.sol";

contract EthSwap  {
  string public name= "Titiloxx defi";
  Token token;
  uint256 public tokensLeft;
  event bought(
    address buyer,
    uint quantity
  );
  event sell(
    address buyer,
    uint quantity
  );

  constructor(Token _token) {
    token = _token;
  }

  function buyToken(uint _amount) public payable returns(bool success) {
    token.transfer(msg.sender, _amount);
    tokensLeft=token.balanceOf(address(this));
    emit bought(msg.sender,_amount);
    return true;
  }

  function sellToken(uint _amount) public payable returns(bool success) {
    token.transferFrom(msg.sender,address(this),_amount);
    payable(msg.sender).transfer(address(this).balance);
    tokensLeft=token.balanceOf(address(this));
    emit sell(msg.sender,_amount);
    return true;
  }
}
