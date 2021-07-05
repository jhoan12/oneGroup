const mongoose=require('mongoose')


// const URI = ('mongodb://localhost/productos_onegroup')
const URI='mongodb+srv://onegroup:onegroup@cluster0.jby5q.mongodb.net/serveronegroup';
mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
})
    .then(db=>console.log('db conectada',db.connection.name))
    .catch(error=>console.log(error))

module.exports=mongoose;