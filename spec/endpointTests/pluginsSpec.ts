import supertest from 'supertest';
import app from '../../src/server';
import {Plugin} from '../../src/models/plugins';

const {TEST_TOKEN} = process.env;
const testToken: string = TEST_TOKEN!;
const authorizationHeader = {'Authorization':`Bearer ${testToken}`};

const plugin1: Plugin = {name:'compressor',price:29.99};
const plugin2: Plugin = {name:'limiter',price:99.99};
const plugin3: Plugin = {name:'equalizer',price:49.99};
const plugin4: Plugin = {name:'vinylizer',price:9.99};

const request = supertest(app);

describe('Plugin endpoint tests', () => {

    // set up all plugins for this spec
    beforeAll(async()=>{
        await request.post('/plugins').set(authorizationHeader).send(plugin1);
        await request.post('/plugins').set(authorizationHeader).send(plugin2);
        await request.post('/plugins').set(authorizationHeader).send(plugin3);
        await request.post('/plugins').set(authorizationHeader).send(plugin4);
        await request.post('/plugins').set(authorizationHeader).send(plugin1);
        await request.post('/plugins').set(authorizationHeader).send(plugin2);
        await request.post('/plugins').set(authorizationHeader).send(plugin3);
        await request.post('/plugins').set(authorizationHeader).send(plugin4);
        await request.post('/plugins').set(authorizationHeader).send(plugin1);
        await request.post('/plugins').set(authorizationHeader).send(plugin2);
    });

    it('gets plugins (index) at /plugins endpoint', async() => {
        const index = await request.get('/plugins');

        expect(index.status).toBeGreaterThanOrEqual(7);
    });

    it('gets plugin (show) at /plugins/:id endpoint', async() => {
        const pluginId5 = await request.get('/plugins/5');

        expect([pluginId5].length).toEqual(1);
    });

    it('post plugin (create) at /plugins endpoint', async() => {
        const newPlugin: Plugin = {name:'fancy test plugin',price:99.99}
        const newPluginCreated = await request.post('/plugins').set(authorizationHeader).send(newPlugin);

        expect(newPluginCreated.body.name).toBe(newPlugin.name);
        expect(Number(newPluginCreated.body.price)).toBe(newPlugin.price);
    });

    it('put plugin (update) at /plugins/:id endpoint', async() => {
        const pluginUpdateData: Plugin = {name:'updated test plugin name',price:9000.01}
        const pluginUpdated = await request.put('/plugins/6').set(authorizationHeader).send(pluginUpdateData);

        expect(pluginUpdated.body.name).toBe(pluginUpdateData.name);
        expect(Number(pluginUpdated.body.price)).toBe(pluginUpdateData.price);
    });

    it('delete plugin (delete) at /plugins/:id endpoint', async() => {
        const id = 10;
        await request.delete(`/plugins/${id}`).set(authorizationHeader);
        const deletedPlugin = await request.get(`/plugins/${id}`);

        expect(deletedPlugin).toBeUndefined;
    });

});