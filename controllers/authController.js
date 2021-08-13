const passport = require('passport');

const Usuarios = require('../models/Usuarios');

const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const enviarEmail = require('../handlers/email');


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

    // console.log(resetUrl);
    // Enviar el correo con el Token
    await enviarEmail.enviar({
        usuario,
        subject: 'Password Reset',
        resetUrl,
        archivo: 'restablecer-password'
    });

    // terminar
    req.flash('correcto', 'Se envió un mensaje a tu correo');
    res.redirect('/iniciar-sesion');
};

exports.validarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    });

    //  si no encuentra el usuario
    if(!usuario){
        req.flash('error', 'No Válido');
        res.redirect('/restablecer');
    }
    // console.log(usuario);
    // Formualario para generar el password
    res.render('resetPassword', {
        nombrePagina: 'Restablecer Cnotraseña'
    });
};

// cambia el password por uno nuevo
exports.actualizarPassword = async (req, res) => {

    // Verifica el token valido pero también la fecha de expiración
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte]: Date.now()
            }
        }
    });
    // console.log(req.params.token);
    // console.log(usuario);
    // verificamos si el usuario existe
    if(!usuario){
        req.flash('error','No Válido');
        res.redirect('/restablecer');
    }

    // hashear el nuevo password

    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;

    // guardamos el nuevo password
    await usuario.save();

    req.flash('correcto', 'Tu password se ha modificado correctamente');
    res.redirect('/iniciar-sesion');
};