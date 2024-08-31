const { getAll, Create, getOne, update, Destroy, Login } = require('../controllers/user.controllers');
const express = require('express');
const {verifyJWT} = require('../utils/verifyJWT')
const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJWT,getAll)
    .post(Create)


routerUser.route('/login')
     .post(Login)    

routerUser.route('/:id')
    .get(verifyJWT,getOne)
    .put(verifyJWT,update)
    .delete(verifyJWT,Destroy)    

module.exports = routerUser;