import {User, Users} from '../../src/models/users';
const userTable = new Users();

const user1: User = {first_name:'Joe', last_name:'Shmo', username:'jshmo27', pass:'9099d09df9df9df'};
const user2: User = {first_name:'Christine', last_name:'H', username:'ch96', pass:'sdf78df77'};
const user3: User = {first_name:'Adi', last_name:'Body', username:'adi024', pass:'asdfasdfasdf'};


describe("Users Model", ()=>{

    beforeAll(async()=>{
        await userTable.create(user1);
        await userTable.create(user2);
        await userTable.create(user3);
        await userTable.create(user1);
        await userTable.create(user2);
        await userTable.create(user3);
        await userTable.create(user1);
        await userTable.create(user2);
        await userTable.create(user3);
    });

    // index test
    it('should have index return a list of at least 6 current users',async()=>{
        const result = await userTable.index();
        expect(result.length).toBeGreaterThan(6);
    });

    // authenticate test
    it('should authenticate 1 user by username and password',async()=>{
        const result = await userTable.authenticate('adi024','asdfasdfasdf');
        const resultIsntNull = result!;
        // receive user, token bundle as a result of authenticate method
        expect(resultIsntNull.user.first_name).toBe('Adi');
    });

    // show test
    it('should show 1 user exists',async()=>{
        const result = await userTable.show(1);
        expect([result]).toHaveSize(1);
    });

    // create test
    it('should create 1 new user',async()=>{
        const created = await userTable.create({first_name:'Moe', last_name:'Noe', username:'moenoefoesho', pass:'bruh'});
        
        const first_name = created.first_name;
        const last_name = created.last_name;
        const username = created.username;

        expect(first_name).toEqual('Moe');
        expect(last_name).toEqual('Noe');
        expect(username).toEqual('moenoefoesho');
    });

    // delete test
    it('should delete 1 user with id 9',async()=>{
        const deleted = await userTable.delete(9);
        const pluginID9 = await userTable.show(9);
        // deleted id 9 => show id 9 should return 0 rows since it was deleted
        expect(pluginID9).toBeUndefined;
    });

    // update test
    it('should update 1 user of id 7',async()=>{
        const updated = await userTable.update(7,'Harry','Terry','harryterry4lyfe','ht95pass123');
        
        const username = updated.username;
        const first_name = updated.first_name;
        const last_name = updated.last_name;

        expect(username).toEqual('harryterry4lyfe');
        expect(first_name).toEqual('Harry');
        expect(last_name).toEqual('Terry');
    });

});

