const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// helpers con algunas funciones
const helpers = require('./helpers');

// Crear la conexión a la Base de Datos
const db = require('./config/bd');

// Importar el modelo
require('./models/Proyectos');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch((error) => console.log(error));

// Crear una app express
const app = express();

// Dónde cargar los archivos estáticos
app.use(express.static('public'));

// Habilitar pug
app.set('view engine','pug');

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Pasar var dump a la aplicación
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

// Aprendiendo Middleware
app.use((req, res, next) => {
    console.log('Yo soy un middleware');
    next();
});

app.use((req, res, next) => {
    console.log('Yo soy otro middleware');
    next();
});

// Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes());

app.listen(3000);

