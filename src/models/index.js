const Actividad = require('./Actividad')
const item = require('./Item')
const user = require('./User')
const item_actividad = require('./Item_actividad')




Actividad.belongsTo(user)
user.hasMany(Actividad)

item.belongsTo(user)
user.hasMany(item)

item_actividad.belongsTo(item);
item.hasMany(item_actividad)


item_actividad.belongsTo(Actividad)
Actividad.hasMany(item_actividad)


