"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const RestGen_1 = require("./classes/RestGen");
const Router_1 = require("./global/Router");
const Auth_1 = require("./classes/Auth");
const fs = require("fs");
const path = require("path");
const chalk_1 = require("chalk");
const dotenv = require("dotenv");
dotenv.config();
const koa = require("koa");
const cors = require("kcors");
const app = new koa();
app.use(cors());
function createServer(controllerPath, port, host) {
    const paths = fs.readdirSync(controllerPath);
    paths.forEach(p => {
        const cPath = path.join('~', controllerPath, p);
        const obj = require(cPath).default;
        RestGen_1.default.generate(new obj());
    });
    const routes = Router_1.default().routes();
    app.use(routes);
    const p = port === undefined ? 2000 : port;
    const h = host === undefined ? 'localhost' : host;
    app.listen(p, h, () => console.log(chalk_1.default.bgGreen('  OK  '), chalk_1.default.green(`Server started`), chalk_1.default.dim(`[http://${h}:${p}]`)));
}
exports.createServer = createServer;
__export(require("./decorators/Route"));
__export(require("./decorators/Controller"));
exports.Auth = Auth_1.default;
//# sourceMappingURL=index.js.map