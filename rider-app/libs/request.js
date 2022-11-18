
import axios from "axios";
import _configs from "../configs";

import {AsyncStorage} from "react-native"

const request = () => {
    let instance = axios.create({});
    instance.interceptors.request.use(async (config) => {
        let logged = await AsyncStorage.getItem("auth/logged");
        let token = logged ? JSON.parse(logged).token : null;
        config.headers["authorization"] = token ? `Bearer ${token}` : ""
        config.baseURL = _configs.endpoints.api
        return config;
    });

 //     instance.interceptors.response.use((response) => {
    //     return response;
    // }, (error) => {


    // })

    return instance;
};

export default request();
