var express = require('express')
const app = express()
require('./model/index')
var UserController = require('./controller/userController')
// const User = require('./model/user')
// const Contact = require('./model/contact')
/**ager database mae table( usi name) ki hongi jo hum add  krre hai to wo usko drop krke jo hum dalre hai wo ayaengi  */
//User.sync({force:true})
//User.drop()
//User.sync({alter:true})
//User.sync()
app.use(express.json())

app.post('/add',UserController.addUser)
app.post('/insertBulk',UserController.insertBulk)
app.get('/getUser',UserController.getUser)
app.get('/getSingleData/:id',UserController.getSingleData)
app.post('/updateData/:id',UserController.updateData)
app.delete('/deleteData/:id',UserController.deleteData)
app.get('/query',UserController.queryUser)
/**getter and setter and virtual */
app.post('/get-set-vertual',UserController.get_set_vertual)
/**row queries */
app.get('/rowqueries',UserController.rowQueries)
app.get('/one-To-One-User',UserController.oneToOneUser)
app.get('/oneToMany',UserController.oneToMany)

app.get('/many-to-many',UserController.manyTomany)
app.get('/lazy-eager-loading',UserController.lazyEagerLoading)
app.get('/egerLoading',UserController.egerLoading)
app.get('/egerLoadingPart2',UserController.egerLoadingPart2)
app.get('/nestedEgerLoading',UserController.nestedEgerLoading)
app.get('/nestedEgerLoadingPart2',UserController.nestedEgerLoadingPart2)
/**Advanced M:N Associations */
app.get('/m-n-association',UserController.association)
/**scopes */
app.get('/scops',UserController.scopes)

/**Transactions */
app.get('/transactions',UserController.transactions)
app.get('/MangeTransaction',UserController.transactions)
app.listen(3000,()=>{
    console.log('server is up on port 3000')
})