const { getAll, create, getOne, remove, update } = require('../controllers/item.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerItem = express.Router();

routerItem.route('/')
    .get(verifyJWT,getAll)
    .post(verifyJWT,create);

routerItem.route('/:id')
    .get(verifyJWT,getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = routerItem;