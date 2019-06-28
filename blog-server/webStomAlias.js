/**
 * Created by montage_fz on 2019-06-28
 */

const resolve = dir => require('path').join(__dirname, dir);

module.exports = {
    resolve: {
        alias: {
            '@': resolve('src')
        }
    }
};
