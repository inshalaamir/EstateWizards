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
    requests : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "hosting"
    },
    reservations : {

       type: [{
        hosting: {type: mongoose.Schema.Types.ObjectId, ref: "hosting"},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
        dates: {type: [Date]},
        name: {type: String},
        title: {type: String},
        location : {type: String}

        }]       
    },

    notifications : {
        type: [String]
    },
    bids:{
        type:[{
            post:{type:mongoose.Schema.Types.ObjectId, ref: "post"},
            bid:{type:String}

        }]
    }
    
})

User = mongoose.model('user', UserSchema)
module.exports =User 