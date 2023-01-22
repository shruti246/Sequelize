//const { Sequelize } = require('sequelize');
const { Sequelize, DataTypes ,Model} = require('sequelize');

const sequelize = new Sequelize('crudnodejs', 'root', 'Shruti@123', {
    host: 'localhost',
   // logging:false,  /**use for not showing query on terminal */
    dialect: 'mysql'
  });

/**connection database */
try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
  const db = {};
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  //db.sequelize.sync({alter:true})
  // db.sequelize.sync({force:true})
  db.sequelize.sync().then(()=>{
    console.log('all set up')
  }) 
  db.users = require('./user')(sequelize, DataTypes ,Model)
  db.contact = require('./contact')(sequelize, DataTypes ,Model)
  db.education = require('./eduction')(sequelize,DataTypes)
  db.cities = require('./city')(sequelize,DataTypes )
  db.customer = require('./customer')(sequelize,DataTypes)
  db.profile = require('./profile')(sequelize,DataTypes)
  /**relation */
  db.users.hasOne(db.contact,{foreignKey: 'user_id' }); // A HasOne B
  db.users.hasOne(db.education,{foreignKey: 'user_id' }); // A HasOne B
  db.contact.hasOne(db.cities,{foreignKey: 'contact_id' }); // A HasOne B
  /**one to many */
  db.users.hasMany(db.contact, { foreignKey: 'user_id' });
  /**many to many */  
 // db.users.belongsToMany(db.contact, { through: 'user_contact' });
  //Actor.belongsToMany(Movie, { through: 'ActorMovies' });
  /**alise */
  //db.users.hasOne(db.contact,{foreignKey: 'user_id' ,as:'contactDetail' }); // A HasOne B
  db.contact.belongsTo(db.users,{foreignKey: 'user_id' }); // A BelongsTo B  
  db.education.belongsTo(db.users,{foreignKey: 'user_id' });   // A BelongsTo B  
   

  /** Advanced M:N Associations*/
  const customer_profile = sequelize.define('customer_profile', {
    selfGranted: DataTypes.BOOLEAN,
    id:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
    },
  }, { timestamps: false });
  db.customer.belongsToMany(db.profile, { through: customer_profile ,uniqueKey:'my_coustomer_id'});
  
  module.exports = db;  
