const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const item = require('../models/Item')
const actividad = require('../models/Actividad')


const getAll = catchError(async(req, res) => {

 const results = await User.findAll({include:[item, actividad]})
    return res.status(200).json(results)
});

const Create = catchError(async(req, res)=>{
  const { password } = req.body
  console.log("este es req.bpod",req.body)
  const hashedPassword= await bcrypt.hash(password, 10)
   const results = await User.create({...req.body, password:hashedPassword})
   return res.status(201).json(results)

}) 

const getOne = catchError(async(req, res)=>{
    const {id}= req.params
    const results = await User.findByPk(id)
    if(!results) return res.status(404).json({"message":"User not Found"})
        return res.status(200).json(results)
})

const Destroy = catchError(async(req,res)=>{
    const id = req.params
    const results = await User.destroy({where:{id}})
    res.status(200).json({"message":"User deleted successfully"})
})
const update = catchError(async(req, res)=>{
     
    const {id} = req.user
    const results = await User.update(req.body,{where:{id}})
    return res.status(204).json(results)
})

const Login = catchError(async(req,res)=>{
    const {password, email } = req.body
    const user = await User.findOne({where:{email}})
    if(!user) return res.sendStatus(404).json({"message":"invalid credentials"})

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) return res.sendStatus(404).json({"message":"invalid credentials"})
        const token= jwt.sign(
            {user},
            process.env.TOKEN_SECRET,
            {expiresIn:'1d'}
    
        )
         return res.status(200).json({user, token})

})
module.exports = {
    getAll,
    Create,
    getOne,
    Destroy,
    update,
    Login
}