const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Referencia al Modelo donde vamos a autenticar
const Usuarios = require('../models/Usuarios');

// local strategy - Login con credenciales propios (usuario y password)
passport.use(
    new LocalStrategy(
        // por default passport espera un usuario y password
        {
            
        }
    )
)