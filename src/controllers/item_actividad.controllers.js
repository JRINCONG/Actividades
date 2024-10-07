const catchError = require('../utils/catchError');
const item_actividad = require('../models/Item_actividad');
const res = require('express/lib/response');

const getAll = catchError(async(req, res) => {

    return res.json(/* valor a retornar */)
});


const Create = catchError(async(req,res)=>{

    const id = parseInt(req.params.id);

    const results= await item_actividad.findOne({where: {
        actividadeId:id,
        itemId:req.body
    
    }})
    console.log(results)
    if(results) return res.status(404).json({"messaje":"Items existente en esta actividad"})
      
        const addItems =  item_actividad.create({
            actividadeId:id,
            itemId:req.body
        })
        return res.status(201).json({"message":"Items Add correctamente"})
})

module.exports = {
    getAll,
    Create
}