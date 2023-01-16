// const { Sequelize, DataTypes ,Model} = require('sequelize');
// const sequelize = require('./index')
// module.exports = (sequelize, DataTypes ,Model)=>{

// class User extends Model {}

// User.init({
//   // Model attributes are defined here
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING
//     // allowNull defaults to true
//   },
//   isActive:{
//     type:DataTypes.INTEGER,
//     defaultValue:0
//   }
// }, {
//   // Other model options go here
//   sequelize, // We need to pass the connection instance
//   modelName: 'User', // We need to choose the model name
//   //tableName: 'users'
// });
// }
// the defined model is the class itself
//console.log(User === sequelize.models.User); // true


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,   
        },

        /**using getter  getDataValue is default method in getter */
        get() {
            const rawValue = this.getDataValue('firstName');
            return rawValue ? rawValue.toUpperCase() : null;
          }
    },
    lastName: {
        type: DataTypes.STRING,
        /**using setter  setDataValue is default method in getter */
        set(value){
            this.setDataValue('lastName', value + ' Indian');
        }
        // allowNull defaults to true
    },
     /**fullname is virtual method */
    fullName:{
       type:DataTypes.VIRTUAL,
       get() {
         return `${this.firstName} ${this.lastName}`
       } ,
       set(value){
        throw new Error('do not try to set fullname value')
       }
    },
    isActive:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
    }, {
    // Other model options go here'
    // tableName: 'users',
    /**if you don't want created at and update at */
    // timestamps:false

    /**paranoid this option use for softdelete */
      paranoid: true,
      deletedAt: 'destroyTime'
    });
    return User;
}
// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true


//module.exports = User


/**data database se nikalte vkt muje kuch modification krna hai to getter ka use krte hai  */
/**data database mae save hone ke pahile ex password hum database db mae save krne ke pahile hash or bcrypt format mae jaye to hum setter ka use kr skte hai */