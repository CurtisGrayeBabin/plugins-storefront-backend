import supertest from 'supertest';
import app from '../../src/server';
import {User} from '../../src/models/users';
import {Order, PluginsInOrder} from '../../src/models/orders';
import {Plugin} from '../../src/models/plugins';

const {TEST_TOKEN} = process.env;
const testToken: string = TEST_TOKEN!;
const authorizationHeader = {'Authorization':`Bearer ${testToken}`};

const user1: User = {first_name:'Joe', last_name:'Shmo', username:'jshmo27', pass:'9099d09df9df9df'};
const user2: User = {first_name:'Christine', last_name:'H', username:'ch96', pass:'sdf78df77'};
const user3: User = {first_name:'Adi', last_name:'Body', username:'024ida', pass:'asdfasdfasdf'};

const order1: Order = {user_id:1,order_status:'completed'};
const order2: Order = {user_id:1,order_status:'open'};
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

    it('gets orders (index) at /orders endpoint', async() => {
        const index = await request.get('/orders');

        expect(index.status).toBeGreaterThanOrEqual(2);
    });

    it('gets orders (show) at /orders/:id endpoint', async() => {
        const orderId1 = await request.get('/orders/2').set(authorizationHeader);

        expect([orderId1].length).toEqual(1);
    });

    it('post orders (create) at /orders endpoint', async() => {
        const orderListBefore = await request.get('/orders');
        
        const newOrder: Order = {user_id:3,order_status:'open'}
        const newOrderCreated = await request.post('/orders').send(newOrder);

        const orderListAfter = await request.get('/orders');

        // list of orders increased by 1
        expect(orderListAfter.body.length).toBe(orderListBefore.body.length+1);
    });

    it('put order (update) at /orders/:id endpoint', async() => {
        const orderUpdateData: Order = {user_id:3,order_status:'completed'}
        const orderUpdated = await request.put('/orders/2').set(authorizationHeader).send(orderUpdateData);

        expect(Number(orderUpdated.body.user_id)).toBe(orderUpdateData.user_id);
        expect(orderUpdated.body.order_status).toBe(orderUpdateData.order_status);
    });

    it('delete order (delete) at /orders/:id endpoint', async() => {
        const id = 1;
        await request.delete(`/orders/${id}`).set(authorizationHeader);
        const deletedOrder = await request.get(`/orders/${id}`).set(authorizationHeader);

        expect(deletedOrder).toBeUndefined;
    });

    it('adds plugin to order (create) at /orders/:id/plugins endpoint', async() => {
        const id = 3;
        const x: PluginsInOrder = {order_id:id,product_id:3,quantity:50};
        const pluginsOrdersRowCreated = await request.post(`/orders/${id}/plugins`).set(authorizationHeader).send(x);

        expect(Number(pluginsOrdersRowCreated.body.quantity)).toBe(50);
        expect(Number(pluginsOrdersRowCreated.body.order_id)).toBe(id);
        expect(Number(pluginsOrdersRowCreated.body.product_id)).toBe(3);
    });

});