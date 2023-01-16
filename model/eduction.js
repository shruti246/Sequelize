module.exports =(sequelize, DataTypes)=>{
const eduction = sequelize.define('educations',{
    class_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    grade:{
        type:DataTypes.STRING,
        allowNull:false
    },
    user_id:{
        type:DataTypes.INTEGER
    }
})
    return eduction
}