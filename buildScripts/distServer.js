import express from 'express';
import open from 'open';
import path from 'path';
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist')); // need to configure files to cache for a year

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(error) {
    if (error)
        console.log(error);
    else
        open('http://localhost:' + port);
});
