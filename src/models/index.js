const Actividad = require('./Actividad')
const item = require('./Item')
const user = require('./User')





Actividad.belongsTo(item)
item.hasMany(Actividad)

item.belongsTo(user)
user.hasMany(item)

Actividad.belongsTo(user)
user.hasMany(Actividad)