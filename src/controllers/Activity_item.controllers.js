const catchError = require('../utils/catchError');
const Activity_item = require('../models/Activity_item');

const create = catchError(async(req, res) => {
    const results = await Activity_item.create(req.body)
    
    return res.status(201).json({"message":"Items add sussefuel"})
});

module.exports = {
    create
}