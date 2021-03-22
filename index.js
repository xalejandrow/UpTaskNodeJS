const express = require('express');
const routes = require('./routes');

// Crear una app express
const app = express();

app.use('/', routes());

app.listen(3000);

