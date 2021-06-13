import jwt from 'jsonwebtoken';
import express, {Request, Response} from 'express';
const {TOKEN_SECRET} = process.env;
const tokenSecret: string = TOKEN_SECRET!;


// code used from Lesson 5.10 section Making a custom Express middleware
const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHeader = req.headers.authorization!;
        const token = authorizationHeader.split(' ')[1];
        //const decoded = jwt.verify(token, tokenSecret);
        const decoded = jwt.verify(token, tokenSecret);
        // token was successfully verified...
        if(decoded){
            // on to an authorization-needed action on the database
            next();
        } else {
            // token was not verified
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(`There was an error validating authorization: ${error}`);
        res.sendStatus(401);
    }
}

export default verifyAuthToken;