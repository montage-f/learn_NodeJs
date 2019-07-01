/**
 * Created by montage_fz on 2019-07-01
 */
const set = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
};
const get = (key) => {
    let result = window.localStorage.getItem(key);
    try {
        return JSON.parse(result);
    } catch (e) {
        return result;
        
    }
};

const remove = (key) => {
    window.localStorage.removeItem(key);
};

export default {
    get,
    set,
    remove
};
