import axios from "axios";
const API_URL = "http://adoleta-api-dev.us-east-1.elasticbeanstalk.com/v1/api/";
// const API_URL = "https://localhost:7043/v1/api/";
class AuthService {
    login(email: string, password: string) {
        return axios
            .post(API_URL + "auth", {
                email,
                password
            })
            .then(response => {
                if (response.data.data.token) {
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