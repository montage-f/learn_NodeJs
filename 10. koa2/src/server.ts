/**
 * Created by montage_fz on 2019-07-07
 */
import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as json from 'koa-json';


// 路由
import index from './routes';
import users from './routes/users';

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


app.listen(4000, () => {
    console.log(`http://localhost:4000`);
});
