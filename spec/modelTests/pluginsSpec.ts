import {Plugin, PluginStore} from '../../src/models/plugins';
const store = new PluginStore();

const plugin1: Plugin = {name:'compressor',price:29.99}
const plugin2: Plugin = {name:'limiter',price:99.99}
const plugin3: Plugin = {name:'equalizer',price:49.99}
const plugin4: Plugin = {name:'vinylizer',price:9.99}


describe("Plugins Model", ()=>{
    
    // set up all plugins for this spec
    beforeAll(async()=>{
        await store.create(plugin1);
        await store.create(plugin2);
        await store.create(plugin3);
        await store.create(plugin4);
        await store.create(plugin1);
        await store.create(plugin2);
        await store.create(plugin3);
        await store.create(plugin4);
        await store.create(plugin1);
    });


    // index test
    it('should have a list of current product(s)',async()=>{
        const result = await store.index();
        expect(result.length).toBeGreaterThan(7);
    });

    // show test
    it('should show 1 product exists with product id of 1',async()=>{
        const result = await store.show(1);
        expect([result]).toHaveSize(1);
    });

    // create test
    it('should create 1 new product',async()=>{
        const created = await store.create({name:'brand new plugin name',price:29.95});

        expect(created.name).toEqual('brand new plugin name');
        expect(Number(created.price)).toEqual(29.95);
    });

    // delete test
    it('should delete 1 product with id 9',async()=>{
        await store.delete(9);
        const pluginID9 = await store.show(9);

        expect(pluginID9).toBeUndefined;
    });

    // update test
    it('should update 1 plugin of id 7',async()=>{
        const updated = await store.update(7,'updated plugin name',4.95);

        expect(updated.name).toEqual('updated plugin name');
        expect(Number(updated.price)).toEqual(4.95);
    });


});

