const web3 = require("./contract").web3;

module.exports = async () => {
    return await web3.eth.getTransactionCount(process.env.CONTRACT_OWNER_ACCOUNT);
}