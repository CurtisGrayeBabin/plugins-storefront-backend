import express, {Request, Response, Application} from 'express'
import {Order,Orders} from '../models/orders';
import { DashboardQueries } from '../services/dashboard'
import verifyAuthToken from '../services/authorization';
const {TOKEN_SECRET} = process.env;

const tokenSecret: string = TOKEN_SECRET!;
const orders = new Orders();

const index = async(req: Request, res:Response) => {
    try{
        const orderList = await orders.index();
        res.json(orderList);
    } catch(err) {
        res.status(400).json(err);
    }
}

const create = async(req: Request, res:Response) => {
    try{
        const order: Order = {
            user_id: req.body.user_id,
            order_status: req.body.order_status
        }
        const newOrder = await orders.create(order);
        res.json(newOrder);
    } catch(err) {
        res.status(400).json(err);
    }
}

const show = async(req: Request, res:Response) => {
    try{
        const order = await orders.show(Number(req.params.id));
        res.json(order);
    } catch(err) {
        res.status(400).json(err);
    }
}

const destroy = async(req: Request, res:Response) => {
    try{
        const deleted = await orders.delete(Number(req.params.id));
        res.json(deleted);
    } catch(err) {
        res.status(400).json(err);
    }
}

const update = async(req: Request, res:Response) => {
    try{
        const updated = await orders.update(Number(req.params.id),req.body.user_id,req.body.order_status);
        res.json(updated);
    } catch(err) {
        res.status(400).json(err);
    }
}

const addPlugin = async(req: Request, res:Response) => {
    try{
        const addedProduct = await orders.addPlugin(Number(req.params.id),Number(req.body.plugin_id),Number(req.body.quantity));
        res.json(addedProduct);
    } catch(err) {
        res.status(400).json(err);
    }
}


const order_routes = (app: Application) => {
    app.get('/orders',verifyAuthToken,index);
    app.get('/orders/:id',verifyAuthToken,show);
    app.post('/orders',verifyAuthToken,create);
    app.put('/orders/:id',verifyAuthToken,update);
    app.delete('/orders/:id',verifyAuthToken,destroy);
    app.post('/orders/:id/plugins',verifyAuthToken,addPlugin);
}

export default order_routes;