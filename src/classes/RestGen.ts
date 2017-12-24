import RouteProp from '../interfaces/RouteProp';
import Router from '../global/Router';
import { Context } from 'koa';
import * as koaBody from 'koa-body';
const body = koaBody({ multipart: true });

import * as koaJwt from 'koa-jwt';
const jwt = koaJwt({
  secret: process.env.SECUREKEY || 'my-key'
})

export default class RestGen {
  static generate(target: any) {
    const router = Router();
    target['routes'].forEach((v: RouteProp, k: string) => {
      let args: any[] = [`/${target['controller']}/${v.path}`];
      if (v.authorized) {
        args.push(jwt);
      }
      if (v.method !== 'get') {
        args.push(body);
      }
      const action = async (ctx: Context) => {
        ctx.body = await target[k](ctx);
      }
      args.push(action);
      router[v.method](...args);
    })
  }
}
