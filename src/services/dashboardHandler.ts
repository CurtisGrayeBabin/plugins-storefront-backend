import express, { Request, Response } from 'express';
import verifyAuthToken from './authorization';
import { DashboardQueries } from './dashboard';

const dashboard = new DashboardQueries();

const usersCompletedOrders = async (req: Request, res: Response) => {
    const users = await dashboard.usersWithCompletedOrders(Number(req.params.user_id));
    res.json(users)
}

const dashboardRoutes = (app: express.Application) => {
    app.get('/orders/:user_id/completed',verifyAuthToken,usersCompletedOrders);
}

export default dashboardRoutes;