pragma solidity = 0.8.6;
import "./Token.sol";

contract EthSwap  {
  string name= "Titiloxx defi";
  Token token;
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
    emit bought(msg.sender,msg.value);
    return true;
  }

  function sellToken(uint _amount) public payable returns(bool success) {
    token.transferFrom(msg.sender,address(this),_amount);
    payable(msg.sender).transfer(address(this).balance);
    emit sell(msg.sender,msg.value);
    return true;

  }
}
