// @ts-ignore
import client from '../database';

export type Plugin = {
    name: string,
    price: number
};

export class PluginStore {
    
    async index(): Promise<Plugin[]> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM plugins;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch(err) {
            throw new Error(`Can not get PluginStore index: ${err}`);
        }
    }
    
    async update(id: number, name: string, price:number): Promise<Plugin> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'UPDATE plugins SET name=$1, price=$2 WHERE id=$3 RETURNING *;';
            const result = await conn.query(sql,[name,Number(price),id]);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Can not update PluginStore index: ${err}`);
        }
    }

    async show(id: number): Promise<Plugin> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = `SELECT * FROM plugins WHERE id=$1;`;
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Can not show PluginStore plugin: ${err}`);
        }
    }

    async delete(id: number): Promise<Plugin[]> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = `DELETE FROM plugins WHERE id=$1 RETURNING *;`;
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Can not delete PluginStore plugin: ${err}`);
        }
    }

    async create(plugin: Plugin): Promise<Plugin> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = `INSERT INTO plugins(name, price) VALUES ($1,$2) RETURNING *;`;
            const result = await conn.query(sql,[plugin.name,Number(plugin.price)]);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Can not create PluginStore plugin: ${err}`);
        }
    }


}