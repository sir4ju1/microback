import AuthType from './classes/Auth';
export declare function createServer(controllerPath: string, port?: number, host?: string): void;
export * from './decorators/Route';
export * from './decorators/Controller';
export declare const Auth: typeof AuthType;
