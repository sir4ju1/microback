"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
function getRouter() {
    if (!global.router) {
        global.router = new Router({ prefix: '/api' });
    }
    return global.router;
}
exports.default = getRouter;
//# sourceMappingURL=Router.js.map