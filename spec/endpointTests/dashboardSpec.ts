import supertest from 'supertest';
import app from '../../src/server';
import {User} from '../../src/models/users';
import {Order} from '../../src/models/orders';
import {Plugin} from '../../src/models/plugins';

const {TEST_TOKEN} = process.env;
const testToken: string = TEST_TOKEN!;
const authorizationHeader = {'Authorization':`Bearer ${testToken}`};

const user1: User = {first_name:'Joe', last_name:'Shmo', username:'jshmo27', pass:'9099d09df9df9df'};
const user2: User = {first_name:'Christine', last_name:'H', username:'ch96', pass:'sdf78df77'};
const user3: User = {first_name:'Adi', last_name:'Body', username:'024ida', pass:'asdfasdfasdf'};

const order1: Order = {user_id:1,order_status:'completed'};
const order2: Order = {user_id:1,order_status:'completed'};
const order3: Order = {user_id:2,order_status:'completed'};

const plugin1: Plugin = {name:"Fader 9000",price:19.99}
const plugin2: Plugin = {name:"EQ-Pro",price:49.99}
const plugin3: Plugin = {name:"Limiter Unlimited",price:99.99}

const request = supertest(app);

describe('Order endpoint tests', () => {

    // set up all users for this spec
    beforeAll(async()=>{

        await request.post('/users').send(user1);
        await request.post('/users').send(user2);
        await request.post('/users').send(user3);
        
        await request.post('/orders').send(order1);
        await request.post('/orders').send(order2);
        await request.post('/orders').send(order3);
        
        await request.post('/plugins').set(authorizationHeader).send(plugin1);
        await request.post('/plugins').set(authorizationHeader).send(plugin2);
        await request.post('/plugins').set(authorizationHeader).send(plugin3);
    });

    it('gets list of users who made completed orders at /orders/:user_id/completed endpoint', async() => {
        
        const index = await request.get('/orders/2/completed').set(authorizationHeader);
        const firstId = Number(index.body[0].id);

        const orderFound = await request.get(`/orders/${firstId}`).set(authorizationHeader);
        const orderFoundStatus = orderFound.body.order_status;
        
        expect(orderFoundStatus).toBe("completed");
    });

});