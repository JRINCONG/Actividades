const { getAll, create, getOne, remove, update } = require('../controllers/actividad.controllers');
const express = require('express');

const routerActividad = express.Router();

routerActividad.route('/')
    .get(getAll)
    .post(create);

routerActividad.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerActividad;