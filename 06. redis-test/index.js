/**
 * Created by montage_fz on 2019-06-24
 */
const redis = require('redis');

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1');

redisClient.on('error', (err) => {
    console.error(err);
});

// 设置key

redisClient.set('myName', '张三', redis.print);

// 获取key , 因为是异步, 所以有回调
redisClient.get('myName', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);

    // 退出redis  如果不退出， 那么redis进程就会一直保持

    redisClient.quit();
});