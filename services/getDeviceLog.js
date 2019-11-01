const CreateKoaLambda = require("../modules/create-koa-lambda");
const contract = require("./contract").contract;

const getDeviceLogs = async (devCode) => {
    const devCodeInt = parseInt(devCode);
    return await contract.methods.getLogs(devCodeInt).call();
}

module.exports = CreateKoaLambda(app => {
    app.use(async ctx => {
        if (ctx.method === "POST") {
            ctx.body = await getDeviceLogs(
                ctx.request.body.deviceCode
            );
            ctx.status = 200;
        }
        else {
            ctx.status = 404;
        }

    });
})