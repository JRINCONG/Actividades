const { getAll, create, getOne, remove, update } = require('../controllers/item.controllers');
const express = require('express');

const routerItem = express.Router();

routerItem.route('/')
    .get(getAll)
    .post(create);

routerItem.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerItem;