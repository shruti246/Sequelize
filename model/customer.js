module.exports = (sequelize,DataTypes)=>{
    const customer = sequelize.define('customers',{
        customer_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
      
    })
    return customer
} 