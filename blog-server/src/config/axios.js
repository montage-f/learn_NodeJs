/**
 * Created by montage_fz on 2019-06-28
 */
import axios from 'axios';

axios.interceptors.request.use((config) => {
    return config;
}, (err) => Promise.resolve(err));


axios.interceptors.response.use((config) => {
    const {status, message} = config.data;
    switch (status) {
        case 200:
            break;
        case 404:
            break;
    }
    return config.data;
}, (err) => Promise.resolve(err));
export default axios;
