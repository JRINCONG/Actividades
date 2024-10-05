const Actividad = require('./Actividad')
const item = require('./Item')
const user = require('./User')
const Activity_items = require('./Activity_item')


Actividad.belongsTo(user)
user.hasMany(Actividad)

item.belongsTo(user)
user.hasMany(item)

Activity_items.belongsTo(Actividad)
Actividad.hasMany(Activity_items)

Activity_items.belongsTo(item)
item.hasMany(Activity_items)



//Actividad.belongsToMany(item, {through: 'activity_items'});
//items.belongsToMany(Actividad, {through: 'activity_items'});