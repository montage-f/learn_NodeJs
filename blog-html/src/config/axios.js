/**
 * Created by montage_fz on 2019-06-28
 */
import localStore from './localStore';
import axios from 'axios';
import router from '../router';

axios.interceptors.request.use((config) => {
    const userInfo = localStore.get('userInfo');
    if (userInfo) {
        config.headers.token = userInfo['token'];
    }
    return config;
}, (err) => Promise.resolve(err));


axios.interceptors.response.use((config) => {
    const {status, message} = config.data;
    switch (status) {
        case 200:
            break;
        case 400:
            router.push('/login');
            break;
        case 404:
            break;
    }
    return config.data;
}, (err) => Promise.resolve(err));
export default axios;
