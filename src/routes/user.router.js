const { getAll, Create, getOne, update, Destroy, Login } = require('../controllers/user.controllers');
const express = require('express');

const routerUser = express.Router();

routerUser.route('/')
    .get(getAll)
    .post(Create)


routerUser.route('/login')
     .post(Login)    

routerUser.route('/:id')
    .get(getOne)
    .put(update)
    .delete(Destroy)    

module.exports = routerUser;