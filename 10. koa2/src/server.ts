/**
 * Created by montage_fz on 2019-07-07
 */
import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = 'debug';
logger.debug('nihao')

// 路由
import index from './routes';
import users from './routes/users';
import blogs from './routes/blogs';

const app = new Koa();

app.use(bodyparser(
    {
        enableTypes: ['json', 'form', 'text']
    }
));

app.use(json());

// 路由
app.use(index.routes());
app.use(users.routes());
app.use(blogs.routes());


app.listen(4000, () => {
    console.log(`http://localhost:4000`);
});
