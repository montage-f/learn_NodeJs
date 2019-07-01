/**
 * Created by montage_fz on 2019-06-28
 */
import axios from './axios';
import formRule from './formRule';

export default (vue) => {
    vue.prototype.$axios = axios;
    // 表单校验
    /**
     *@method formRule
     *@param {formName} 表单名称
     *@return {Boolean}
     */
    vue.prototype.$formRule = formRule;
    
}
