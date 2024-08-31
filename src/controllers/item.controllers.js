const catchError = require('../utils/catchError');
const Item = require('../models/Item');

const getAll = catchError(async(req, res) => {
    const results = await Item.findAll({where:{userId:req.user.id}});
    if(!results) return res.status(404).json({"mesagge":"User not found"})
       results.map((item)=>{
            delete item.dataValues.createdAt 
            delete item.dataValues.updatedAt
          return item
      })
    return res.json(results);
});

const create = catchError(async(req, res) => {
    for(let i in req.body){
        delete req.body.userId
    }
    const result = await Item.create({...req.body, userId: req.user.id});
    for(let valor in result){
        delete result.dataValues.updatedAt
        delete result.dataValues.createdAt
    }
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Item.findByPk(id);
    if(!result) return res.sendStatus(404);

   if(result.userId === req.user.id){
       for(let valor in result){
           delete result.dataValues.updatedAt
           delete result.dataValues.createdAt
       }
          return res.json(result);
   }
   return res.status(404).json({"message":"user does not belong to that items"});
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const DeleteItems = await Item.findByPk(id)
    if(!DeleteItems) return res.status(404).json({"message":"Items not found"})

    if(DeleteItems.userId === req.user.id){
        const result = await Item.destroy({ where: {id} });
        return res.sendStatus(204).json({"message":"Items successfully eliminated"});
    }

    return res.status(404).json({"message":"unauthorized"})
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const UpdateItems = await Item.findByPk(id)
    if(!UpdateItems) return res.status(404).json({"message":"Items not found"})
    if(UpdateItems.userId === req.user.id){
        const result = await Item.update(
            req.body,
            { where: {id}, returning: true }
        );
       
        return res.json(result[1][0]);
    }
    return res.status(404).json({"message":"unauthorized"})
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}