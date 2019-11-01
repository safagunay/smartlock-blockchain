const NonceModel = require("./nonceModel");
//const ConnectMongoose = require("../modules/connect-mongoose-lambda");
const contractObj = require("./contract");
const contract = contractObj.contract;
const web3 = contractObj.web3;
const address = contractObj.address;

const addLogToDevice = async (data, nonce) => {
    //ConnectMongoose();
    const log = data.log;
    const logString = `${log.email},${log.time},${log.isSuccessful};`;
    const devCodeInt = parseInt(data.deviceCode);
    // try {
    // const nonce = await NonceModel.findOneAndUpdate({}, { $inc: { 'value': 1 } });
    // console.log("nonce ->", nonce);
    const tx = contract.methods.addLog(devCodeInt, logString).encodeABI();
    const tx_signed = await web3.eth.accounts.signTransaction({
        nonce: nonce,
        to: address,
        data: tx,
        gas: 5000000
    }, process.env.ACCOUNT_PK);
    const receipt = await web3.eth.sendSignedTransaction(tx_signed.rawTransaction);
    return {
        log: logString,
        nonce: nonce,
        receipt: receipt
    };
    // } catch (err) {
    //     const nonce = await web3.eth.getTransactionCount(process.env.CONTRACT_OWNER_ACCOUNT);
    //     await NonceModel.findOneAndUpdate({}, { value: nonce });
    //     err.data = {
    //         nonce_recovered: nonce
    //     }
    //     console.log(`Nonce updated to ${nonce}`);
    // }

}

module.exports = addLogToDevice;