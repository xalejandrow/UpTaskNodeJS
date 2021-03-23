const Sequelize = require('sequelize');
const slug = require('slug');
const shortid = require('shortid');

const db = require('../config/bd');

const Proyectos = db.define('proyectos', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre  :   Sequelize.STRING,
    url     :   Sequelize.STRING
    
}, {
    hooks: {
        beforeCreate(proyecto) {
            console.log('Antes de Insertar en la BD');
            const url = slug(proyecto.nombre).toLowerCase();

            proyecto.url = `${url}-${shortid.generate()}`;
        }
    }
});

module.exports = Proyectos;