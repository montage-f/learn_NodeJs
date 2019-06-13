/**
 * Created by MonTage_fz on 2019/6/13
 */
const loginCheck = ({username, password}) => {
    if (username === 'zhangSan' && password === 123) {
        return true;
    }
    return false;
};

module.exports = {
    loginCheck
};
