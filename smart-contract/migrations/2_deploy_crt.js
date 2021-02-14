const CRT = artifacts.require("CRT");

module.exports = function(deployer) {
  deployer.deploy(CRT, "Community Reward Token", "CRT", 10000, 50);
}