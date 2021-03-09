const mongoose = require ("mongoose")

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    phoneno:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    
})

User = mongoose.model('user', UserSchema)
module.exports =User 