require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dec, _desc, _value, _class;

var _index = __webpack_require__(7);

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

let User = (_dec = (0, _index.route)('get', 'some'), (_class = class User extends _index.RestGen {
  constructor() {
    super('user');
  }

  async get(ctx) {
    ctx.body = 'hello world';
  }
}, (_applyDecoratedDescriptor(_class.prototype, 'get', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'get'), _class.prototype)), _class));
exports.default = User;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

const Koa = __webpack_require__(3);
// const glob = require('glob')

const app = new Koa();
// var appRoot = require('path').resolve(process.cwd())
// let routes = []
const normalizedPath = __webpack_require__(4).join(__dirname, '../app/api');
__webpack_require__(5).readdirSync(normalizedPath).forEach(function (file) {
  var Cls = __webpack_require__(6)(`./${file}`).default;
  var cls = new Cls();
  app.use(cls.generate());
});

// const app = (app) => {
//   routes.forEach(route => {
//     app.use(route)
//   })
// }
app.listen(2000);
module.exports = app;
/* WEBPACK VAR INJECTION */}.call(exports, "src"))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./user": 0,
	"./user.js": 0
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 6;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const rest = __webpack_require__(8);

module.exports = rest;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const router = __webpack_require__(9)({
  prefix: '/api'
});
const body = __webpack_require__(10)({ multipart: true });

function destruct(args) {
  const hasPath = typeof args[0] === 'string';
  const path = hasPath ? args[0] : '';
  const middleware = hasPath ? args.slice(1) : args;

  if (middleware.some(m => typeof m !== 'function')) {
    throw new Error('Middleware must be function');
  }

  return [path, middleware];
}

// @route(method, path: optional, ...middleware: optional)
function route(method, ...args) {
  if (typeof method !== 'string') {
    throw new Error('The first argument must be an HTTP method');
  }

  const [path] = destruct(args);

  return function (target, name) {
    if (!target['routes']) {
      target['routes'] = {};
    }
    target['routes'][name] = { method, path };
  };
}
let RestGen = class RestGen {
  constructor(path, model) {
    this.path = path;
    this.model = model;
  }
  async find(ctx) {
    try {
      const models = await this.model.find().exec();
      ctx.body = { success: true, data: models };
    } catch (error) {
      ctx.body = { success: false, error };
    }
  }
  async findOne(ctx) {
    try {
      const id = ctx.params.id;
      const model = await this.model.findById(id).exec();
      ctx.body = { success: true, data: model };
    } catch (error) {
      ctx.body = { success: false, error };
    }
  }
  async create(ctx) {
    try {
      const body = ctx.request.body;
      const model = await this.model.create(body);
      ctx.body = { success: true, data: model };
    } catch (error) {
      ctx.body = { success: false, error };
    }
  }
  async update(ctx) {
    try {
      const id = ctx.params.id;
      const body = ctx.request.body;
      const result = await this.model.update({ _id: id }, body);
      ctx.body = { success: true, data: result };
    } catch (error) {
      ctx.body = { success: false, error };
    }
  }
  async remove(ctx) {
    try {
      const id = ctx.params.id;
      const result = await this.model.deleteOne({ _id: id });
      ctx.body = { success: true, data: result };
    } catch (error) {
      ctx.body = { success: false, error };
    }
  }

  /**
   * Generate Route for Class
   */
  generate() {
    var self = this;
    if (this.model) {
      router.get(`/${this.path}`, this.find.bind(this));
      router.get(`/${this.path}/:id`, this.findOne.bind(this));
      router.post(`/${this.path}`, body, this.create.bind(this));
      router.put(`/${this.path}/:id`, body, this.update.bind(this));
      router.delete(`/${this.path}/:id`, this.remove.bind(this));
    }
    let list = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(f => {
      if (typeof self[f] === 'function') {
        return f;
      }
    }).map(f => f);
    list.forEach(fun => {
      switch (fun) {
        case 'constructor':
        case 'route':
          break;
        case 'find':
          router[fun](`/${this.path}`, this[fun].bind(this));
          break;
        case 'post':
        case 'put':
        case 'patch':
        case 'delete':
          router[fun](`/${this.path}`, body, this[fun].bind(this));
          break;
        default:
          let route = this.routes && this.routes[fun] ? this.routes[fun] : {
            method: fun.includes('post') ? 'post' : fun.includes('put') ? 'put' : 'get',
            path: fun
          };
          route.path = `/${this.path}/${route.path}`;
          switch (route.method) {
            case 'post':
            case 'put':
            case 'patch':
            case 'delete':
              router[route.method](`${route.path}`, body, this[fun].bind(this));
              break;
            default:
              router.get(`${route.path}`, this[fun].bind(this));
              break;
          }
          break;
      }
    });
    return router.routes();
  }
};


module.exports = { route, RestGen };

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("koa-body");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map