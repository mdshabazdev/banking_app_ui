import { request, response, Router } from 'express';
import http from "./api-utils";

export const auth: Router = Router();

auth.post('/api/auth/authenticate', async function(req: request, res: response) {
    http.post('/auth/authenticate', req.body)
    .then(function(response) {
        res.send(response.data);
    })
    .catch(function(error) {
        if(error.response) {
            res.send(error.response.data);
        } else {
            res.send({
                message: 'some error occured at the server'
            })
        }
    })
})

auth.post('/api/auth/register', async function(req: request, res: response) {
    http.post('/auth/register', req.body, {
        headers: {
            Authorization: req.headers['authorization']
        }
    })
    .then(function(response) {
        res.send(response.data);
    })
    .catch(function(error) {
        if(error.response) {
            res.send(error.response.data);
        } else {
            res.send({
                message: 'some error occured at the server'
            })
        }
    })
})