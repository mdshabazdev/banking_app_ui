import { request, response, Router } from 'express';
import http from "./api-utils";

export const account: Router = Router();

account.get('/api/account/fetchAccounts', async function(req: request, res: response) {
    http.get('/account/fetchAccounts', {
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
        } else if(error.error) {
            res.send(error.error.message);
        } else {
            res.send({
                message: 'some error occured at the server'
            })
        }
    })
})

account.post('/api/account/createAccount/:accountType', async function(req: request, res: response) {
    http.post(`/account/createAccount?accountType=${req.params.accountType}`, null, {
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