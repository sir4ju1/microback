import * as Router from 'koa-router';

export default function getRouter () {
  if (!(global as any).router) {
    (global as any).router = new Router({ prefix: '/api' });
  } 
  return (global as any).router;
}
