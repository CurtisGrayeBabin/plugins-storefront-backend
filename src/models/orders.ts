// @ts-ignore
import client from '../database';

export type Order = {
    user_id: number,
    order_status: string
};

export type PluginsInOrder = {
    order_id: number,
    product_id: number,
    quantity: number
};


export class Orders {
    
    async update(id: number, user_id: number, order_status:string): Promise<Order> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'UPDATE orders SET user_id=$2, order_status=$3 WHERE id=$1 RETURNING *;';
            const result = await conn.query(sql,[id,user_id,order_status]);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Can not update order: ${err}`);
        }
    }

    async index(): Promise<Order[]> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch(err) {
            throw new Error(`Can not get Orders index: ${err}`);
        }
    }

    async show(id: number): Promise<Order> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = `SELECT * FROM orders WHERE id=${id};`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Can not show Orders order: ${err}`);
        }
    }

    async delete(id: number): Promise<Order> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = `DELETE FROM orders WHERE id=$1 RETURNING *;`;
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Can not delete Orders order: ${err}`);
        }
    }

    async create(order: Order): Promise<Order> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = `INSERT INTO orders(user_id, order_status) VALUES (${order.user_id}, '${order.order_status}') RETURNING *;`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Can not create Orders order: ${err}`);
        }
    }

    async addPlugin(order_id: number, product_id: number, quantity: number): Promise<PluginsInOrder> {
        try{
            // @ts-ignore 
            const conn = await client.connect();
            const sql = `INSERT INTO plugins_orders(order_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *;`;
            const result = await conn.query(sql,[order_id,product_id,quantity]);
            conn.release();
            return result.rows[0];   
        } catch (err) {
            throw new Error(`Can not add plugin to order: ${err}`)
        }
    }
}