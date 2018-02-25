export default class Auth {
    static generateHash(password: string): string;
    static generateToken(data: any): string;
}
