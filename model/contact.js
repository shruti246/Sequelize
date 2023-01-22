module.exports = (sequelize, DataTypes)=>{
  const Contact = sequelize.define('Contact', {
    // Model attributes are defined here
    permenant_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pincode: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    user_id:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
    }, {
    // Other model options go here'
    // tableName: 'users',
    /**if you don't want created at and update at */
    // timestamps:false
    });
    return Contact;
}
