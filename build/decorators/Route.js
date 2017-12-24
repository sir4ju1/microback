"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Route(method, path, auth) {
    return function (target, propertyKey, descriptor) {
        if (!target['routes']) {
            target['routes'] = new Map();
        }
        const authorized = auth !== undefined ? auth : false;
        target['routes'].set(propertyKey, { method, path, authorized });
    };
}
exports.Route = Route;
//# sourceMappingURL=Route.js.map