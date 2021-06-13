import express, {Request, Response, Application} from 'express'
import jwt from 'jsonwebtoken';
import {Plugin,PluginStore} from '../models/plugins';
import verifyAuthToken from '../services/authorization';
const {TOKEN_SECRET} = process.env;

const tokenSecret: string = TOKEN_SECRET!;
const store = new PluginStore();

const index = async(req: Request, res:Response) => {
    try{
        const plugins = await store.index();
        res.json(plugins);
    } catch(err) {
        res.status(400).json(err);
    }
}

const create = async(req: Request, res:Response) => {
    try{
        const plugin: Plugin = {
            name: req.body.name,
            price: Number(req.body.price)
        }
        const newPlugin = await store.create(plugin);
        //const token = jwt.sign({plugin: newPlugin},tokenSecret);
        res.json(newPlugin);
    } catch(err) {
        res.status(400).json(err);
    }
}

const show = async(req: Request, res:Response) => {
    try{
        const plugin = await store.show(Number(req.params.id));
        res.json(plugin);
    } catch(err) {
        res.status(400).json(err);
    }
}

const destroy = async(req: Request, res:Response) => {
    try{
        const deleted = await store.delete(Number(req.params.id));
        //const token = jwt.sign({plugin: deleted},tokenSecret);
        res.json(deleted);
    } catch(err) {
        res.status(400).json(err);
    }
}

const update = async(req: Request, res:Response) => {
    try{
        const updated = await store.update(Number(req.params.id),req.body.name,req.body.price);
        //const token = jwt.sign({plugin: updated},tokenSecret);
        res.json(updated);
    } catch(err) {
        res.status(400).json(err);
    }
}

const plugins_routes = (app: Application) => {
    app.get('/plugins',index);
    app.get('/plugins/:id',show);
    app.post('/plugins',verifyAuthToken,create);
    app.put('/plugins/:id',verifyAuthToken,update);
    app.delete('/plugins/:id',verifyAuthToken,destroy);
}

export default plugins_routes;