module.exports =(sequelize, DataTypes) =>{
    const city = sequelize.define('cities',{
        city_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        contact_id:{
            type:DataTypes.INTEGER
        }
    })
    return city
}