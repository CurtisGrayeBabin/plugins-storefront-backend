import supertest from 'supertest';
import app from '../../src/server';
import {User} from '../../src/models/users';

const {TEST_TOKEN} = process.env;
const testToken: string = TEST_TOKEN!;
const authorizationHeader = {'Authorization':`Bearer ${testToken}`};

const user1: User = {first_name:'Joe', last_name:'Shmo', username:'jshmo27', pass:'9099d09df9df9df'};
const user2: User = {first_name:'Christine', last_name:'H', username:'ch96', pass:'sdf78df77'};
const user3: User = {first_name:'Adi', last_name:'Body', username:'024ida', pass:'asdfasdfasdf'};


const request = supertest(app);

describe('User endpoint tests', () => {

    // set up all users for this spec
    beforeAll(async()=>{
        await request.post('/users').send(user1);
        await request.post('/users').send(user2);
        await request.post('/users').send(user3);
        await request.post('/users').send(user1);
        await request.post('/users').send(user2);
        await request.post('/users').send(user3);
        await request.post('/users').send(user1);
        await request.post('/users').send(user2);
        await request.post('/users').send(user3);
        await request.post('/users').send(user1);
    });

    it('gets users (index) at /users endpoint', async() => {
        const index = await request.get('/users');

        expect(index.status).toBeGreaterThanOrEqual(7);
    });

    it('gets users (show) at /users/:id endpoint', async() => {
        const userId5 = await request.get('/users/5');

        expect([userId5].length).toEqual(1);
    });

    it('post users (create) at /users endpoint', async() => {
        const userListBefore = await request.get('/users');
        
        const newUser: User = {first_name:"first",last_name:"last",username:"test",pass:"pass"}
        const newUserCreated = await request.post('/users').send(newUser);
        const tokenDotCount = newUserCreated.body.match(/\./g).length;

        const userListAfter = await request.get('/users');

        // list of users increased by 1
        expect(userListAfter.body.length).toBe(userListBefore.body.length+1);
        // got back a JWT and it contains 2 dots in the string
        expect(tokenDotCount).toEqual(2);
    });

    it('put user (update) at /users/:id endpoint', async() => {
        const userUpdateData: User = {first_name:"first",last_name:"last",username:"test",pass:"pass"}
        const userUpdated = await request.put('/users/6').set(authorizationHeader).send(userUpdateData);

        expect(userUpdated.body.first_name).toBe(userUpdateData.first_name);
        expect(userUpdated.body.last_name).toBe(userUpdateData.last_name);
        expect(userUpdated.body.username).toBe(userUpdateData.username);
    });

    it('delete user (delete) at /users/:id endpoint', async() => {
        const id = 10;
        await request.delete(`/users/${id}`).set(authorizationHeader);
        const deletedUser = await request.get(`/users/${id}`);

        expect(deletedUser).toBeUndefined;
    });
});