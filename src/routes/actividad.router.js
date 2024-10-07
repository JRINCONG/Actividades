const { getAll, create, getOne, remove, update, setActivity } = require('../controllers/actividad.controllers');
const {Create}= require('../controllers/item_actividad.controllers')
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerActividad = express.Router();

routerActividad.route('/')
    .get(verifyJWT,getAll)
    .post(verifyJWT,create);

//actividad/:id/items
    routerActividad.route('/:id/items')
     .post(verifyJWT,Create)

routerActividad.route('/:id')
    .get(verifyJWT,getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = routerActividad;