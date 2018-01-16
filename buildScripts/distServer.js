import express from 'express';
import opn from 'opn';
import path from 'path';
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist')); // need to configure files to cache for a year

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, error => {
    if (error) console.log(error);
    else {
        opn('http://localhost:' + port, {
            app: ['google chrome', '--remote-debugging-port=9222']
        });
    }
});
