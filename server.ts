import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import { auth as auth} from './src/services/authentication.service';
import { account as account} from './src/services/account.service';
import { transaction as transaction} from './src/services/transaction.service';

const port = 3000;

const root = path.join(__dirname, 'banking_app_frontend', 'dist', 'banking_app_frontend', 'browser');

const app = express()
    .use(express.static(root))
    .use(bodyParser.json())
    .use(auth)
    .use(account)
    .use(transaction);

app.get('*', (req, res) => {
    fs.stat(root + req.path, function(err){
        if(err){
            res.sendFile("index.html", { root });
        } else {
            res.sendFile(req.path, { root });
        }
    })
  
});

app.listen(port, () => {
  return console.log(`Banking app listening at http://localhost:${port}`);
});
