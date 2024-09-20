const { getAll, create, getOne, remove, update } = require('../controllers/actividad.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerActividad = express.Router();

routerActividad.route('/')
    .get(verifyJWT,getAll)
    .post(verifyJWT,create);

routerActividad.route('/:id')
    .get(verifyJWT,getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = routerActividad;