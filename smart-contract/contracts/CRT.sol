// SPDX-License-Identifier: MIT

pragma solidity ^0.7.1;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0/contracts/token/ERC20/IERC20.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0/contracts/token/ERC20/ERC20.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0/contracts/access/Ownable.sol";


contract CRT is ERC20, Ownable  {
    uint public _tokenPrice;
    uint public _signupBonus;
    
    address[] private _users;
    
    constructor(string memory name_, string memory symbol_, uint tokenPrice_, uint signupBonus_) ERC20(name_, symbol_) {
        _tokenPrice = tokenPrice_;
        _signupBonus = signupBonus_;
    }
    
    function setSignUpBonus (uint signupBonus_) public onlyOwner {
       _signupBonus = signupBonus_;
    }
    
    function setTokenPrice(uint tokenPrice_) public onlyOwner {
       _tokenPrice = tokenPrice_;
    } 
    
    function register() public payable returns (uint) {
        require(msg.value >= _tokenPrice * _signupBonus, "Not enough funds");
        require(balanceOf(msg.sender) == 0, "Already registered");
        _mint(msg.sender, _signupBonus);
        _users.push(msg.sender);
        return _signupBonus;
    }
    
    function buyTokens(uint _amount) public payable returns (uint) {
        require(msg.value >= _tokenPrice * _amount, "Not enough funds");
        _mint(msg.sender, _amount);
        return balanceOf(msg.sender);
    }
    
    function userCount() public view returns (uint) {
        return _users.length;
    }
    
    function getUsers(uint start, uint8 limit) public view returns (address[] memory) {
        uint noOfUsers = _users.length;
        require(start < noOfUsers - 1, "Invalid start index");
        uint end = start + limit;
        if (end > noOfUsers) {
            end = noOfUsers;
        }
        address[] memory users = new address[](end - start);
        for (uint i = start; i < end; i++) {
            users[i] = _users[i];
        }
        return users;
    }
    
    fallback() external payable {}
    
    receive() external payable {}
}
    