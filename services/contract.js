const Web3 = require("web3");
const abi = require("./abi.json");
const address = Web3.utils.toChecksumAddress(process.env.CONTRACT_ADDRESS);
const web3 = new Web3(process.env.REMOTE_NODE);
const contract = new web3.eth.Contract(abi, address, {
    from: process.env.CONTRACT_OWNER_ACCOUNT
});

module.exports = {
    contract: contract,
    web3: web3,
    address: address
}