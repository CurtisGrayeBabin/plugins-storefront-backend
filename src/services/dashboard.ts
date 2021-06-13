import client from '../database';

export class DashboardQueries {

    // Get all users that have made completed orders
    async usersWithCompletedOrders(id: number): Promise<{first_name: string, last_name: string, username: string}[]> {
        try {
            //@ts-ignore
            const conn = await client.connect();
            const sql = `SELECT orders.id FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.order_status='completed' AND users.id=${id} ORDER BY orders.id ASC`;
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable get users with completed orders: ${err}`);
        } 
    }
}