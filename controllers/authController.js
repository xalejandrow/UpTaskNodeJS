const passport = require('passport');

const Usuarios = require('../models/Usuarios');

const crypto = require('crypto');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos son Obligatorios'
});

// Función para revisar si el usuario está logueado o no
exports.usuarioAutenticado = (req, res, next) => {

    // si el usuario está autenticado, adelante
    if(req.isAuthenticated()){
        return next();
    }

    // si no está autenticado, redirigir al formulario
    return res.redirect('/iniciar-sesion');
};

// Función para cerrar sesión
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');
    });
};

// genera un token si el usuario es válido
exports.enviarToken = async (req, res) => {
    // verificar que el usuario existe
    const {email} = req.body;
    const usuario = await Usuarios.findOne({where: {email} });

    // Si no existe el usuario
    if(!usuario){
        req.flash('error', 'No existe esa cuenta');
        res.redirect('/restablecer');
        // res.render('restablecer', {
        //     nombrePagina: 'Restablecer tu Contraseña',
        //     mensajes: req.flash()
        // });
    }

    // usuario existe
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    // guardarlos en la base de datos
    await usuario.save();

    // url de reset
    const resetUrl = `http://${req.headers.host}/restablecer/${usuario.token}`;

    console.log(resetUrl);
};

exports.resetPassword = async (req, res) => {
    res.json(req.params.token);
};