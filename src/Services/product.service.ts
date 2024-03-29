import axios from "axios";
import Product from "../Models/ProductModel";
import authHeader from "./auth-header";
const API_URL = `${process.env.REACT_APP_API_URL}`;

class ProductService {
    createNewProduct(objCreate: Product) {
        const header = authHeader();
        return axios
            .post(API_URL + "product", objCreate, header)
            .then(response => {
                if (response.data) {
                }
                return response.data;
            });
    }

    updateProduct(id: number, objCreate: Product) {
        const header = authHeader();
        return axios
            .put(API_URL + "product/" + id, objCreate, header)
            .then(response => {
                if (response.data) {
                }
                return response.data;
            });
    }

    listAllProducts() {
        const header = authHeader();
        return axios.get(API_URL + "product", header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }

    getProductByID(id: number) {
        const header = authHeader();
        return axios.get(API_URL + "product/" + id, header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });

    }

    deleteProduct(id: number) {
        const header = authHeader();
        return axios.delete(API_URL + "product/" + id, header)
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

export default new ProductService();