import express from 'express';
import open from 'open';
import path from 'path';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(
    webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true
    })
);

app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, error => {
    if (error) console.log(error);
    else open('http://localhost:' + port, 'google chrome');
});
