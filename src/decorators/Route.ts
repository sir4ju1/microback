import RouteProp from '../interfaces/RouteProp';

export function Route(method: string, path: string, auth?: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!target['routes']) {
      target['routes'] = new Map<string, RouteProp>();
    }
    const authorized = auth !== undefined ? auth : false;
    target['routes'].set(propertyKey, { method, path, authorized });
  };
}