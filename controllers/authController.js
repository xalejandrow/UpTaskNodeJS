const passport = require('passport');

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