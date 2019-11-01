require('dotenv').config();
const app = require("./services/getDeviceLog");
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const addDeviceLog = require("./services/addDeviceLog");
const getNonce = require("./services/getNonce");
var nonce;

const startServer = async () => {
    nonce = await getNonce();
    console.log("nonce <--", nonce);
    io.on('connection', function (socket) {
        socket.on('log', function (data) {
            socket.emit(data.deviceCode);
            console.log("log event ->", data);
            addDeviceLog(data, nonce++)
                .then(result => {
                    console.log("\nTransaction successful ->");
                    console.log(result);
                }).catch(async err => {
                    console.log("\nTransaction failed with err ->", err);
                    nonce = await getNonce();
                    console.log(`nonce updated to ${nonce}`);
                })
        });
    });
    try {
        //Start the server.
        server.listen(port, () => console.log(`The app is running on port : ${port}`));
    } catch (err) {
        console.log(err);
    }
};
startServer();