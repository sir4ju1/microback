"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("../global/Router");
const koaBody = require("koa-body");
const body = koaBody({ multipart: true });
const koaJwt = require("koa-jwt");
const jwt = koaJwt({
    secret: process.env.SECUREKEY || 'my-key'
});
class RestGen {
    static generate(target) {
        const router = Router_1.default();
        target['routes'].forEach((v, k) => {
            let args = [`/${target['controller']}/${v.path}`];
            if (v.authorized) {
                args.push(jwt);
            }
            if (v.method !== 'get') {
                args.push(body);
            }
            const action = async (ctx) => {
                ctx.body = await target[k](ctx);
            };
            args.push(action);
            router[v.method](...args);
        });
    }
}
exports.default = RestGen;
//# sourceMappingURL=RestGen.js.map