import AuthHelper from "../Common/AuthHelper";

export default function authHeader() {
  return {
    headers: {
      Authorization: 'Bearer ' + `${AuthHelper.getToken()}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*"
    }
  };
} 