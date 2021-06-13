import {Order, PluginsInOrder, Orders} from '../../src/models/orders';
import {User, Users} from '../../src/models/users';
import {Plugin, PluginStore} from '../../src/models/plugins';
const userTable = new Users();
const orderTable = new Orders();
const pluginTable = new PluginStore();

// need users to relate foreign key to from order to user table 
const user1: User = {first_name:'Joe', last_name:'Shmo', username:'jshmo27', pass:'9099d09df9df9df'};
const user2: User = {first_name:'Christine', last_name:'H', username:'ch96', pass:'sdf78df77'};

const order1: Order = {user_id:2,order_status:'completed'};
const order2: Order = {user_id:2,order_status:'open'};
const order3: Order = {user_id:2,order_status:'open'};

const plugin1: Plugin = {name:"Fader 9000",price:19.99}
const plugin2: Plugin = {name:"EQ-Pro",price:49.99}
const plugin3: Plugin = {name:"Limiter Unlimited",price:99.99}

describe("Orders Model", ()=>{
    
    // set up products for testing
    beforeAll(async()=>{
        await userTable.create(user1);
        await userTable.create(user2);
        await userTable.create(user1);
        await userTable.create(user2);
        await userTable.create(user1);
        await userTable.create(user2);

        await orderTable.create(order1);
        await orderTable.create(order2);
        await orderTable.create(order3);
        await orderTable.create(order1);
        await orderTable.create(order2);
        await orderTable.create(order3);
        await orderTable.create(order1);
        await orderTable.create(order2);
        await orderTable.create(order3);

        await pluginTable.create(plugin1);
        await pluginTable.create(plugin2);
        await pluginTable.create(plugin3);

    });


    // index test
    it('should have index return a list of more than 0 orders',async()=>{
        const result = await orderTable.index();
        expect(result.length).toBeGreaterThan(0);
    });

    // show test
    it('should show 1 order exists',async()=>{
        const result = await orderTable.show(1);
        expect([result]).toHaveSize(1);
    });

    // create test
    it('should create 1 new order in addition to 3 others',async()=>{
        const newOrder: Order = {user_id:1,order_status:'open'};
        const created = await orderTable.create(newOrder);
        
        expect(created.user_id).toBe(1);
        expect(created.order_status).toBe('open');
    });

    // delete test
    it('should delete 1 order with id 9',async()=>{
        const deleted = await orderTable.delete(9);
        const pluginID9 = await orderTable.show(9);
        // deleted id 9 => show id 9 should return 0 rows since it was deleted
        expect(pluginID9).toBeUndefined;
    });

    // update test
    it('should update 1 order of id 8',async()=>{
        const updated = await orderTable.update(8,1,'completed');
        const user_id: number = +updated.user_id;
        const order_status = updated.order_status;

        // all orders are attributed to user with id 2, so changing to id 1 is a good check
        expect(user_id).toEqual(1);
        expect(order_status).toBe('completed');
    });

    // addPlugin to order test
    it('should add plugins to an order',async()=>{
        // add plugin of id 1 to order of id 1 with quantity of 50
        const pluginsOrdersRowCreated = await orderTable.addPlugin(5,3,50);
        expect(Number(pluginsOrdersRowCreated.quantity)).toEqual(50);
    });

});

