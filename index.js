const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');

// helpers con algunas funciones
const helpers = require('./helpers');

// Crear la conexión a la Base de Datos
const db = require('./config/bd');

// Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch((error) => console.log(error));

// Crear una app express
const app = express();


// Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

// Agregamos express validator a toda la aplicación
app.use(expressValidator());

// Dónde cargar los archivos estáticos
app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));

// Habilitar pug
app.set('view engine','pug');

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// agregar flash messages
app.use(flash());

// Pasar var dump a la aplicación
app.use((req, res, next) => {
    // res.locals.year = 2019;
    res.locals.vardump = helpers.vardump;
    next();
});


app.use('/', routes());

app.listen(3000);

