/**
 * Created by montage_fz on 2019-06-28
 */
// vue.config.js
module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
            },
        }
    }
};
