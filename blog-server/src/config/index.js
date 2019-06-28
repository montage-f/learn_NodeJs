/**
 * Created by montage_fz on 2019-06-28
 */
import axios from './axios';

export default (vue) => {
    vue.prototype.$axios = axios;
    
}
