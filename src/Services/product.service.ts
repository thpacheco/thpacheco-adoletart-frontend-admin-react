import axios from "axios";
import AuthHelper from "../Common/AuthHelper";
import Custumer from "../Models/CustumerModel";
import Product from "../Models/ProductModel";
// const API_URL = "https://thiago-golang-heroku.herokuapp.com/api/";
const API_URL = "http://localhost:8080/api/";

const header = {
    headers: {
        Authorization: `${AuthHelper.getToken()}`,
        "Content-Type" : "application/json",
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*"
    }
};

class ProductService {
    createNewProduct(objCreate: Product) {
        return axios
            .post(API_URL + "product/", objCreate, header)
            .then(response => {
                if (response.data) {
                }
                return response.data;
            });
    }

    updateProduct(id: number, objCreate: Product) {
        return axios
            .put(API_URL + "product/" + id, objCreate, header)
            .then(response => {
                if (response.data) {
                }
                return response.data;
            });
    }

    listAllProducts() {
        return axios.get(API_URL + "product/", header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }

    getProductByID(id: number) {
        return axios.get(API_URL + "product/" + id, header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });

    }

    deleteProduct(id: number) {
        return axios.delete(API_URL + "product/" + id, header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }

    countAllCustumer() {
        return axios.get(API_URL + "custumer/count", header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }
}

export default new ProductService();