/**
 * Created by montage_fz on 2019-06-27
 */

const redis = require('redis');
// 127.0.0.1:6379
const connectRedis = redis.createClient(6379, '127.0.0.1');


const redis_set = (key, value) => {
    const isObject = typeof value === 'object';
    if (isObject) {
        value = JSON.stringify(value);
    }
    connectRedis.set(key, value);
};


const redis_get = (key) => new Promise(resolve => {
    connectRedis.get(key, (err, data) => {
        if (!err) {
            // 如果能被JSON.parse解析, 就返回解析后的值, 否则就直接返回这个数据
            try {
                resolve(JSON.parse(data));
            } catch (e) {
                resolve(data);
            }
            return
        }
        console.log('redis获取错误');
    });
});


module.exports = {
    redis_set,
    redis_get
};
