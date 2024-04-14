import { request, response, Router } from 'express';
import http from "./api-utils";

export const transaction: Router = Router();

transaction.post('/api/transaction/deposit', async function(req: request, res: response) {
    http.post('/transaction/deposit', req.body, {
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

transaction.post('/api/transaction/withdraw', async function(req: request, res: response) {
    http.post('/transaction/withdraw', req.body, {
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

transaction.post('/api/transaction/sendMoney', async function(req: request, res: response) {
    http.post('/transaction/sendMoney', req.body, {
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

transaction.post('/api/transaction/transactions', async function(req: request, res: response) {
    http.post('/transaction/transactions', req.body, {
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