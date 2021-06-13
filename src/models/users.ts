// @ts-ignore
import client from '../database';
import bcrypt from 'bcrypt';
const {BCRYPT_PASSWORD, SALT_ROUNDS} = process.env;

export type User = {
    first_name: string,
    last_name: string,
    username: string,
    pass: string
};

export class Users {

    async update(id: number, first_name: string, last_name:string, username:string, pass:string): Promise<User> {
        try{

            const saltRounds = SALT_ROUNDS!;
            const hashedPassword = bcrypt.hashSync(pass+BCRYPT_PASSWORD,parseInt(saltRounds));
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'UPDATE users SET first_name=$2, last_name=$3, username=$4, pass=$5 WHERE id=$1 RETURNING *;';
            const result = await conn.query(sql,[id,first_name,last_name,username,hashedPassword]);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Can not update user: ${err}`);
        }
    }

    async delete(id: number): Promise<User> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = `DELETE FROM users WHERE id=$1 RETURNING*;`;
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Can not delete user: ${err}`);
        }
    }


    async create(user: User): Promise<User> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            
            // encrypting the given user password
            // need the '!' to prevent: Argument of type 'string | undefined' is not assignable to parameter of type 'string'. error
            const saltRounds = SALT_ROUNDS!;
            const hashedPassword = bcrypt.hashSync(user.pass+BCRYPT_PASSWORD,parseInt(saltRounds));

            const sql = `INSERT INTO users(first_name, last_name, username, pass) VALUES ($1,$2,$3,$4) RETURNING *;`;
            const result = await conn.query(sql,[user.first_name,user.last_name,user.username,hashedPassword]);


            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Can not create new user: ${err}`);
        }
    }

    async authenticate(username: string, password: string): Promise<User|null>{
        // @ts-ignore
        const conn = await client.connect();
        const sql = `SELECT * FROM users WHERE username=$1;`;
        const result = await conn.query(sql,[username]);

        // if the given username exists in the users table...
        if(result.rows.length){
            const user = result.rows[0];
            // if given password matches user password in the table then return user
            if(bcrypt.compareSync(password+BCRYPT_PASSWORD, user.pass)){
                return user;
            }
        }
        // given username doesn't exist OR given password doesn't match actual user password
        return null;
    }

    async index(): Promise<User[]>{
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM users;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch(err) {
            throw new Error(`Can not get Users index: ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = `SELECT * FROM users WHERE id=$1;`;
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Can not show user: ${err}`);
        }
    }

}