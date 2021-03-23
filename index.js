const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// Crear una app express
const app = express();

// Dónde cargar los archivos estáticos
app.use(express.static('public'));

// Habilitar pug
app.set('view engine','pug');

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes());

app.listen(3000);

