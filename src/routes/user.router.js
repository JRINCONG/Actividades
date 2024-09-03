const { getAll, Create, getOne, update, Destroy, Login, envioMail, recoverPassword, } = require('../controllers/user.controllers');
const express = require('express');
const {verifyJWT} = require('../utils/verifyJWT')
const routerUser = express.Router();
const {verifyJWTpassword}= require('../utils/verifyJWTpassword')

routerUser.route('/')
    .get(verifyJWT,getAll)
    .post(Create)


routerUser.route('/login')
     .post(Login)
     
routerUser.route('/recover')
      .post(envioMail)

routerUser.route('/:token/recover_password')
      .post(recoverPassword)         

routerUser.route('/:id')
    .get(verifyJWT,getOne)
    .put(verifyJWT,update)
    .delete(verifyJWT,Destroy)    

module.exports = routerUser;