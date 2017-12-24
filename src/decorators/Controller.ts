export function Controller(api: string) {
  return function (target: any) {
    target.prototype['controller'] = api;
  };
}
