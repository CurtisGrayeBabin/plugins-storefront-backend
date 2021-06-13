import express, {Request, Response, Application} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import plugins_routes from './handlers/plugins';
import user_routes from './handlers/users';
import order_routes from './handlers/orders';
import dashboard_routes from './services/dashboardHandler'

const app: Application = express();
const address: string = "0.0.0.0:3000";

app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
})

plugins_routes(app);
user_routes(app);
order_routes(app);
dashboard_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});

export default app;
