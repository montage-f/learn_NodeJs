/**
 * Created by montage_fz on 2019-06-24
 */
const redis = require('redis');
const {REDIS_CONF} = require('../config/db');


const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

redisClient.on('error', (err) => {
    console.error(err);
});

const redis_set = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    redisClient.set(key, value);
};

const redis_get = (key) => new Promise((resolve, reject) => {
    redisClient.get(key, (err, data) => {
        if (err) {
            reject(err);
        }
        // 如果没有找到key对应的值， 则返回一个空
        if (!data) {
            resolve(null);
        }
        // 使用try catch 来兼容返回的值是否是一个对象
        try {
            resolve(JSON.parse(data));
        } catch (e) {
            resolve(data);
        }
    });
});

module.exports = {
    redis_set,
    redis_get
};