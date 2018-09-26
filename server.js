const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {server, database} = require('./config')
const {user} = require('./routes')


mongoose.connect(database.uri, database.options);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.status(200).send('Welcome to the Node express JWT Tutorial')
});

app.use('/', user)

app.listen(server.port, server.host, () =>{
   console.log(`Server running on http://${server.host}:${server.port}`);
});

