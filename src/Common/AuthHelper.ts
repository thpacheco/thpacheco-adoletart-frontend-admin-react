import jwtDecode, { JwtPayload } from "jwt-decode";

export interface JwtData {
    status: boolean;
    data: Data;
}
export interface Data {
    id: number,
    name: string,
    email: string,
    token: string
}

export default class AuthHelper {

    public static isAutenticed(): boolean {
        const localItem = localStorage.getItem('accessToken');
        if (localItem === null) return false;
      
        const token = JSON.parse(localItem!) as JwtData
        if (token.data.token !== null) {
            const decoded = jwtDecode<JwtPayload>(token.data.token);
            if (decoded && decoded.exp! > Date.now() / 1000) {
                return true;
            }
        }
        localStorage.clear();
        return false;
    }

    public static getUserName(): string {
        const localItem = localStorage.getItem('accessToken');
        const token = JSON.parse(localItem!) as JwtData
        if (token.data.token !== null) {
            const decoded = jwtDecode<JwtPayload>(token.data.token);
            if (decoded && decoded.exp! > Date.now() / 1000) {
                return token.data.name;
            }
        }
        return '';
    }
}
