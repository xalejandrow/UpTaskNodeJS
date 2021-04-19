const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {
    // res.send('Enviado');
    // console.log(req.params.url);

    // obtenermos el proyecto actual
    const proyecto = await Proyectos.findOne({ where: { url: req.params.url }});

    // console.log(proyecto);
    // console.log(req.body);

    // leer el valor del imput
    const {tarea} = req.body;

    // estado 0 = incompleto y ID del Proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    // Insertar en la base de datos 
    const resultado = await Tareas.create({ tarea, estado, proyectoId });

    if(!resultado){
        return next();
    }

    // redireccionar
    res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = (req, res) => {
    res.send('Todo bien...');
}