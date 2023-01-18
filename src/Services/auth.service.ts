import axios from "axios";
import AuthHelper from "../Common/AuthHelper";
const API_URL = "https://api.adoletarts.com.br/v1/api/";
// const API_URL = `${process.env.REACT_APP_API_URL}`;


let axiosConfig = {
    headers: {
        "Content-Type": "application/json"
    }
};

class AuthService {
    login(email: string, password: string) {
        return axios
            .post(API_URL + "auth", {
                email,
                password
            }, axiosConfig)
            .then(response => {
                if (response.data.data.token) {
                    AuthHelper.ClearSession()
                    localStorage.setItem("accessToken", JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(username: string, email: string, password: string) {
        return axios.post(API_URL + "auth/login", {
            username,
            email,
            password
        });
    }
    getCurrentUser() {
        const userStr = localStorage.getItem("accessToken");
        if (userStr) return JSON.parse(userStr);
        return null;
    }
}
export default new AuthService();