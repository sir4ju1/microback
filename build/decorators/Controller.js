"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Controller(api) {
    return function (target) {
        target.prototype['controller'] = api;
    };
}
exports.Controller = Controller;
//# sourceMappingURL=Controller.js.map