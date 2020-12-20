const mongoose = require("mongoose")

const {mongoURI} = require("./default.json")

const connectDB = async () => {
    try{
        await mongoose.connect(mongoURI, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false} );
        console.log("DB connected") 
    }   
    catch(err){
        console.log(err.message)
        process.exit(1)
    }

} 

module.exports = connectDB