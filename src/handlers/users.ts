import express, {Request, Response, Application} from 'express'
import jwt from 'jsonwebtoken';
import {User,Users} from '../models/users';
import verifyAuthToken from '../services/authorization';
const {TOKEN_SECRET} = process.env;

const tokenSecret: string = TOKEN_SECRET!;
const userTable = new Users();

const index = async(req: Request, res:Response) => {
    try{
        const users = await userTable.index();
        res.json(users);
    } catch(err) {
        res.status(400).json(err);
    }
}

const create = async(req: Request, res:Response) => {
    try{
        const u: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            pass: req.body.pass
        }
        const newUser = await userTable.create(u);
        const token = jwt.sign({user: newUser},tokenSecret);

        res.json(token);
    } catch(err) {
        res.status(400).json(err);
    }
}

const show = async(req: Request, res:Response) => {
    try{
        const user = await userTable.show(Number(req.params.id));
        res.json(user);
    } catch(err) {
        res.status(400).json(err);
    }
}

const destroy = async(req: Request, res:Response) => {
    try{
        const deleted = await userTable.delete(Number(req.params.id));
        res.json(deleted);
    } catch(err) {
        res.status(400).json(err);
    }
}

const update = async(req: Request, res:Response) => {
    try{
        const id = req.params.id;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const username = req.body.username;
        const pass = req.body.pass;

        const updated = await userTable.update(Number(id),first_name,last_name,username,pass);
        res.json(updated);
    } catch(err) {
        res.status(400).json(err);
    }
}

const users_routes = (app: Application) => {
    app.get('/users',index);
    app.get('/users/:id',show);
    app.post('/users',create);
    app.put('/users/:id',verifyAuthToken,update);
    app.delete('/users/:id',verifyAuthToken,destroy);
}

export default users_routes;