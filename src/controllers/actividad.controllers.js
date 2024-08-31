const catchError = require('../utils/catchError');
const Actividad = require('../models/Actividad');
const Item = require('../models/Item')

const getAll = catchError(async(req, res) => {
    const {id} = req.user
    const results = await Actividad.findAll({where :{userId:id},
        include:[{
            model:Item,
            attributes:{exclude:['createdAt','updatedAt','id']}
    }]
    });
    results.map((acti)=>{
        delete acti.dataValues.createdAt
        delete acti.dataValues.updatedAt
        delete acti.dataValues.itemId
        delete acti.dataValues.userId
        return acti
    })
    return res.json(results);
});


const create = catchError(async(req, res) => {
    if(!req.body.status) req.body.status="start";
     if(!req.body.userId) req.body.userId=req.user.id;
    const result = await Actividad.create(req.body);
    for(let valor in result){
        delete result.dataValues.updatedAt
        delete result.dataValues.createdAt
    }
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Actividad.findByPk(id);
    if(!result) return res.sendStatus(404);

    if(result.userId === req.user.id){
        for(let valor in result){
            delete result.dataValues.updatedAt
            delete result.dataValues.createdAt
        }
        return res.json(result);
    }
   return res.status(404).json({"message":"Activity not Found"})
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const Activiresult = await Actividad.findByPk(id)
    if(!Activiresult) return res.status(404).json({"message":"Activity not Found"})
    if(Activiresult.userId === req.user.id){
        const result = await Actividad.destroy({ where: {id} });
        return res.sendStatus(204);

    }
    return res.sendStatus(404).json({"message":"Activity does not belong"});
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Actividad.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}