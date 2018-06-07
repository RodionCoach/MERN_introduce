import path from 'path';
import {findUser} from './findUser';
import {addUser} from './addUser';
import {login} from './login';
import log from 'winston';


export const serverRouters = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(path.resolve("./src/client/index.html"), function (err) {
            if (err) {
                log.error('something bad happened', err);
            } else {
                log.info('Sent:', path.resolve("./src/client/index.html"));
            }
        })
    });
    app.get('/login/:email/:pass', login);
    app.get('/findUser/:email', findUser);

    app.get('/addUser/:email/:pass', addUser);
};
