import express from 'express';
import fs from 'fs';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router'
import routes from './routes';

const app = express();
const PORT = 8080;

app.use(express.static('dist'));

// app.get('/test', (req, res) => res.send('test'));

app.get('*', (req, res) => {
    match({
        routes,
        location: req.url
    }, (error, redirectLocation, renderProps) => {
        const app = renderToString(<RouterContext {...renderProps}/>);
        fs.readFile(__dirname + '/app.html', 'utf8', (err, data = '') =>
			res.send(data.replace('id="app">', `id="app">${app}`)) || err);
    });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
