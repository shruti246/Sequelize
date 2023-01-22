var db = require('../model')
const { Sequelize, Op, QueryTypes, where} = require('sequelize');
var User = db.users;
var Contact = db.contact;
var Eduction = db.education;
var cities = db.cities;
var Customer = db.customer;
var Profile = db.profile

var addUser =async (req,res)=>{
    try{
        const data = await User.create({firstName:req.body.firstName,lastName:req.body.lastName,isActive:req.body.isActive})
        res.status(200).send(data)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
}

var getUser = async(req,res)=>{
    try{
      const data = await User.findAll({})
      res.status(200).send(data)
    }catch(e){
        console.log(e)
      res.status(200).send(e)  
    }
}

var getSingleData = async(req,res)=>{
    try{
        const data = await User.findOne({
            where:{
                id:req.params.id
            }
        })
       res.status(400).send(data)
    }catch(e){
        res.status(400).send(e)
    }
}

var updateData = async(req,res) =>{
    try{
       const user = await User.update(req.body,{
            where:{
                id:req.params.id
            }
        })
        res.status(200).send({success:'updated successfully'})
    }catch(e){
        res.status(400).send(e)
    }
}

const insertBulk = async(req,res)=>{
    try{
       let data =  await User.bulkCreate(req.body)
       res.status(200).send(data)
    }catch(e){
        res.status(400).send(e)
    }
}

const deleteData = async(req,res) =>{
    try{
        const data = User.destroy({
            where:{
                id:req.params.id,
            }
        })
        res.status(200).send(data)
    }catch(e){
        res.status(400).send(e)
    }
}

var queryUser = async(req,res)=>{
    // const data = await User.findAll({
    //     where:{
    //         isActive:0
    //     },
    //     attributes:[
    //             [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
    //         ]
    // })
    // const data = await User.findAll({
    //     attributes: { exclude: ['createdAt','updatedAt'] }
    // })
    const data = await User.findAll({
        where:{
            id:{
                [Op.eq] : 2
            }
        }
    })
    res.status(200).send(data)
}

var get_set_vertual = async(req,res)=>{
   // const data = await User.findAll({})
    const data = await User.create(req.body)
    res.status(200).send(data)
}

var rowQueries = async(req,res)=>{
   const record = await db.sequelize.query('SELECT * FROM users',{
        type:QueryTypes.SELECT
    })
    res.status(200).send(record)
}   

var oneToOneUser = async(req,res)=>{
    /**for showing all recordes */
    // const record = await User.findAll({
    //     include:Contact
    // })

    // const record = await User.findAll({
    //     attributes:['firstName','lastName'],
    //     include:[{
    //         model:Contact,
    //         attributes:['permenant_address','pincode'],
    //        // where:{id:1}
    //     }],
    //     where:{id:2}
    // })
     /**alise  */
    // const record = await User.findAll({
    //     attributes:['firstName','lastName'],
    //     include:[{
    //         model:Contact,
    //         as:'contactDetail',
    //         attributes:['permenant_address','pincode'],
    //        // where:{id:1}
    //     }],
    //     where:{id:2}
    // })

    //res.status(200).send(record)
    /**using belongs to */
    const Contactrecord = await Contact.findAll({
        include:[{
            model:User
        }]
    })
    res.status(200).send(Contactrecord)
}

var oneToMany = async(req,res)=>{
     const record = await User.findAll({
        attributes:['firstName','lastName'],
        include:[{
            model:Contact,
            attributes:['permenant_address','pincode']
        }],
        where:{
            id:2
        }
    })
    res.status(200).json({data:record})
}

var manyTomany = async(req,res)=>{
    const record = await User.findAll({
        attributes:['firstName','lastName'],
        include:[{
            model:Contact,
            attributes:['permenant_address','pincode']
        }],
        where:{
            id:2
        }
    })
    res.status(200).json({data:record})
}

var lazyEagerLoading = async(req,res)=>{
    const result = await User.findOne({
        where:{
            id:2
        }
    })
    const hisShip = await result.getContacts()
    res.send({result,hisShip}).status(200)
}


/**eger join conecept islye use krte hai mnlo hume do table mae right join or innner join perform krna ho
 * by default LEFT JOIN rahta hai
 * ager hume INNER JOIN krna hai to required : true use krna padenga
 * ager hume RIGHT JOIN krna hai to required : false and right:true use krna padenga
 * multiple table
 */
var egerLoading = async(req,res)=>{
    let result = await User.findAll({
        where:{
            id:2
        },
        include:[{
            model:Contact,
            required:false,
            right:true
        },{
            model:Eduction
        }]
    })
    res.send(result)
}
/**or  -->ager koi relation khud se add nhi krna just use include:{all:true}  */
var egerLoadingPart2 = async(req,res)=>{
    let result = await User.findAll({
        include:{all:true}
    })
    res.send(result)
}

/**relation
 * User -> Contact  -> cities
 *      -> Education
 * 
 * delaling above nested  scenario check out below function
 */

var nestedEgerLoading = async(req,res)=>{
    var result = await User.findAll({
                    include:{
                        model:Contact,
                        include:{
                            model:cities,
                           // where:{id:1} /**this where condition is use for Cities */
                        },
                       // where:{id:2} /**this where condition for  Contact*/
                    },
                   // where:{id:1} /**this where condition for User */
                 })
     res.status(200).send(result)            
}
/**if you dont want to add nested relation just use below code */
var nestedEgerLoadingPart2 = async(req,res)=>{
    var result = await User.findAll({
        include:{
            all:true,
            nested:true
        }
    })
    res.send(result)
}

var  association = async(req,res) =>{
    // const amidala = await Customer.create({ customer_name: 'p4dm3' });
    // const queen = await Profile.create({ profile: 'AVTAAR' });
    // await amidala.addProfile(queen, { through: { selfGranted: false } });
    // const result = await Customer.findOne({
    // where: { customer_name: 'p4dm3' },
    // include: Profile
    // });
    
   // res.send(result);

    /**or */
    const amidala = await Customer.create({
        customer_name: 'new123456',
        profile: [{
        profile: 'p4dm3',
          User_Profile: {
            selfGranted: true
          }
        }]
      }, {
        include: Profile
      });
      
      const result = await Customer.findOne({
        where: { customer_name: 'p4dm3' },
        include: Profile
      });
      
      res.send(result)
}

/**
 * Scopes are used to help you reuse code. You can define commonly used queries, 
 * specifying options such as where, include, limit, etc.
 */
var scopes = async(req,res)=>{
    User.addScope('checkActive',{
        where:{
            isActive:0
        }
    })

    User.addScope('lastName',{
        where:{
            lastName:'stwy'
        }
    })

    User.addScope('Contact',{
        include:{
            model:Contact
        }
    })

    User.addScope('attribute',{
       attributes:['firstName','lastName']
    })

    User.addScope('limitApply',{
       limit:2
     })

    var data = await User.scope('checkActive').findAll({})
    var workingAsAND = await User.scope('checkActive','lastName').findAll({})
    var joinConcept = await User.scope(['Contact','attribute','limitApply']).findAll({})
    res.send(joinConcept)
}
var transactions = async(req,res)=>{
    const t = await db.sequelize.transaction();
    try{
       const data = await User.create({firstName:'Manveer',lastName:'singh',isActive:1},{ transaction: t })
       await Contact.create({permenant_address:null,pincode:'440012',user_id:data.id}, { transaction: t }) 
       await t.commit();
       res.send(data)
    }catch(error){
        await t.rollback();
        res.send(error)
    }
} 
/**
 * Managed transactions handle committing or rolling back the transaction automatically. You start a managed transaction 
 * by passing a callback to sequelize.transaction. This callback can be async (and usually is).
 */
const MangeTransaction = async(req,res)=>{
    try{
        const result = await db.sequelize.transaction(async (t) =>{
            const data = await User.create({firstName:null,lastName:'singh',isActive:1},{ transaction: t })
            await Contact.create({permenant_address:null,pincode:'440012',user_id:data.id}, { transaction: t }) 
            await t.commit();
            return data
        })
        
    }catch(e){

    }
}

/**https://sequelize.org/docs/v6/core-concepts/model-querying-basics/ */
module.exports = {addUser,getUser,getSingleData,updateData,insertBulk,deleteData,queryUser,get_set_vertual,rowQueries,oneToOneUser,oneToMany,manyTomany,lazyEagerLoading,egerLoading,egerLoadingPart2,nestedEgerLoading,nestedEgerLoadingPart2,association,scopes,transactions,MangeTransaction}

