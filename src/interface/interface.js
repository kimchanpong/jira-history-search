import axios from "axios";
import Variable from "../variable/variable";

class Interface {
    callGet = async (url, params) => {
        const response = await axios.get(url, {
                params: params,
                headers: {
                    Authorization: 'Basic ' + Variable.AuthorizationToken,
                    'Content-type': 'application/json'
                }
            }
        );

        return response.data;
    }

    callPost = async (url, params) => {
        const response = await axios.post(url, {
                params: params,
                headers: {
                    Authorization: 'Basic ' + Variable.AuthorizationToken,
                    'Content-type': 'application/json'
                }
            }
        );

        return response.data;
    }

    callApi = (method, url, params) => {
        return method === 'GET' ? this.callGet(url, params) : this.callPost(url, params);
    }
}

export default Interface;