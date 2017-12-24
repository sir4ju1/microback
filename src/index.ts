import RestGen from './classes/RestGen';
import Router from './global/Router';

import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

import * as koa from 'koa';
import * as cors from 'kcors';
const app = new koa();
app.use(cors());

export function createServer (controllerPath: string, port?: number, host?: string) {
  const paths = fs.readdirSync(controllerPath);  
  paths.forEach(p => {
    const cPath = path.join('~', controllerPath, p);
    const obj = require(cPath).default;
    RestGen.generate(new obj());
  })
  
  const routes = Router().routes();
  app.use(routes);
  const p = port === undefined ? 2000 : port;
  const h = host === undefined ? 'localhost' : host;
  app.listen(p, h, () => console.log(chalk.bgGreen('  OK  '), chalk.green(`Server started`), chalk.dim(`[http://${h}:${p}]`)));
}


export * from './decorators/Route';
export * from './decorators/Controller';

