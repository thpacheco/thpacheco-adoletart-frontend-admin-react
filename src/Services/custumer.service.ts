import axios from "axios";
import AuthHelper from "../Common/AuthHelper";
import Custumer from "../Models/CustumerModel";
const API_URL = "http://localhost:8080/api/";

const header = {
    headers: {
        Authorization: `${AuthHelper.getToken()}`,
        'Content-Type': 'application/json',
    }
};

class CustumerService {
    createNewCustumer(objCreate: Custumer) {
        console.log(header);
        return axios
            .post(API_URL + "custumer/", objCreate, header)
            .then(response => {
                if (response.data) {
                }
                return response.data;
            });
    }

    updateCustumer(id: number, objCreate: Custumer) {
        console.log(header);
        return axios
            .put(API_URL + "custumer/" + id, objCreate, header)
            .then(response => {
                if (response.data) {
                }
                return response.data;
            });
    }

    listAllCustumers() {
        return axios.get(API_URL + "custumer/", header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }
    getCustumerByID(id: number) {
        return axios.get(API_URL + "custumer/" + id, header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }
}
export default new CustumerService();