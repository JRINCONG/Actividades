const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const item = require('../models/Item')
const actividad = require('../models/Actividad')
const { sendEmail }=require('../utils/sendEmail')
const Respuesta =require('../utils/Respuesta')



const getAll = catchError(async(req, res) => {

 const results = await User.findAll({where:{id:req.user.id},
    include:[item, actividad]})
   
    results.map((item)=>{
        delete item.dataValues.email
        delete item.dataValues.password
        delete item.dataValues.createdAt
        delete item.dataValues.updatedAt

        return item
    })
    return res.status(200).json(results)
});

const Create = catchError(async(req, res)=>{
  const { password } = req.body
  const hashedPassword= await bcrypt.hash(password, 10)
   const results = await User.create({...req.body, password:hashedPassword})
   
   for(let valor in results){
    delete results.dataValues.password
    delete results.dataValues. updatedAt
    delete results.dataValues.email
    delete results.dataValues.createdAt
    delete results.dataValues.token
    delete results.dataValues.phone
   }
   return res.status(201).json(results)

}) 

const getOne = catchError(async(req, res)=>{
    const {id}= req.params
    const results = await User.findByPk(req.user.id)
    if(!results) return res.status(404).json({"message":"User not Found"})
   
        return res.status(200).json(results)
    })

const Destroy = catchError(async(req,res)=>{
    const {id} = req.params
    
    const UserDelete = await User.findByPk(id)
    
    if(!UserDelete) return res.status(404).json({"message":"User not Found"})
    if(UserDelete.id === req.user.id){
        const results = await User.destroy({where:{id}})
        res.status(204).json({"message":"User deleted successfully"})

    }
   return res.status(404).json({"message":"you can't delete another user"})
})

const update = catchError(async(req, res)=>{     
    const {id} = req.params
    const UpdateUser= await User.findByPk(id)
    if(!UpdateUser) return res.status(404).json({"message":"unauthorized"})
    if(UpdateUser.id === req.user.id){
        const results = await User.update(req.body,{where:{id},returning:true})

        return res.status(200).json(results)
    }
    return res.status(404).json({"message":"unauthorized"})
})

const Login = catchError(async(req,res)=>{
    const {password, email } = req.body
    console.log(req.body)
    const user = await User.findOne({where:{email}})
    if(!user) return res.sendStatus(404).json({"message":"invalid credentials"})

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) return res.sendStatus(404).json({"message":"invalid credentials"})
        const token= jwt.sign(
            {user},
            process.env.TOKEN_SECRET,
            {expiresIn:'6h'}
    
        )
         return res.status(200).json({user, token})

})
const logged = catchError(async(req,res)=>{
    console.log(req.user)
    const usuario= req.user
    return res.status(200).json({usuario})
})

const envioMail=catchError(async(req, res)=>{
    const {email} = req.body
    const results = await User.findOne({where:{email}})
    if(!results) return res.status(404).json({"message":"unauthorized"})
     const TOKEN_PASS = jwt.sign(
    {email},
    process.env.TOKEN_RECOVER,
    {expiresIn:'3m'}
     )  
     await sendEmail({
    to:email,
    subject:"Password Change",
    html: Respuesta(results,TOKEN_PASS) 

 })
   

     return res.status(200).json({"message":"email sent successfully",TOKEN_PASS})
})

const recoverPassword = catchError(async(req, res)=>{
    console.log("este es el res",req.params.token)
return res.status(200).json('ok')

})


module.exports = {
    getAll,
    Create,
    getOne,
    Destroy,
    update,
    Login,
    envioMail,
    recoverPassword,
    logged
}