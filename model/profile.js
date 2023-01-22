module.exports = (sequelize,DataTypes)=>{
    const profile = sequelize.define('profiles',{
        profile:{
            type:DataTypes.STRING
        },
    })
    return profile
}