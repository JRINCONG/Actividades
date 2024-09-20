const express = require('express');
const routerUser = require('./user.router');
const routerItem = require('./item.router');
const routerActividad = require('./actividad.router');
const {verifyJWT} = require('../utils/verifyJWT')
const router = express.Router();


// colocar las rutas aquí
router.use('/users',routerUser)
router.use('/items', routerItem)
router.use('/actividades',routerActividad)

module.exports = router;