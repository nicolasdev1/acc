import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthData } from "../contexts/Auth";
import { config } from '../../.env.config'

const instance = Axios.create({
    baseURL: config.API_URL,
    timeout: 10000,
});

Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.common['Accept'] = 'application/json';

async function getJWT() {
    let auth = await AsyncStorage.getItem('@AuthData')
    let res: AuthData = {} as AuthData
    auth ? res = JSON.parse(auth) as AuthData : null
    return res != null ? res.token : null
}

export const httpService = {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    patch: instance.patch,
    delete: instance.delete,
    getJWT
};