import axios from "axios";
import AuthHelper from "../Common/AuthHelper";
import Custumer from "../Models/CustumerModel";
import authHeader from "./auth-header";
const API_URL = "https://api.adoletarts.com.br/v1/api/";
// const API_URL = "https://localhost:7043/v1/api/";

class CustumerService {
    createNewCustumer(objCreate: Custumer) {
        const header = authHeader();
        return axios
            .post(API_URL + "custumer", objCreate, header)
            .then(response => {
                if (response.data) {
                }
                return response.data;
            });
    }

    updateCustumer(id: number, objCreate: Custumer) {
        const header = authHeader();
        console.log(header);
        return axios
            .put(API_URL + "custumer" + id, objCreate, header)
            .then(response => {
                if (response.data) {
                }
                return response.data;
            });
    }

    listAllCustumers() {
        const header = authHeader();
        return axios.get(API_URL + "custumer", header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }

    getCustumerByID(id: number) {
        const header = authHeader();
        return axios.get(API_URL + "custumer/" + id, header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });

    }

    deleteCustumer(id: number) {
        const header = authHeader(); return axios.delete(API_URL + "custumer/" + id, header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }

    countAllCustumer() {
        const header = authHeader();
        return axios.get(API_URL + "custumer/count", header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }
}

export default new CustumerService();