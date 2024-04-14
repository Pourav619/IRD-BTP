const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
const connectDB= async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database Connected: ${conn.connection.host}`)
        // const mongoURI = 'mongodb://localhost:27017/irdBtp'
        // const conn =mongoose.createConnection(mongoURI)
        // mongoose.connect(mongoURI)
        var db = mongoose.connection
        db.on('error',()=> console.log("Error in connecting to Database"))
        db.once('open',()=>console.log("Connected to Database"))
    }
    catch(error){
        console.log(error)
    }
}
module.exports = connectDB