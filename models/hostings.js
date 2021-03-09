const mongoose = require ("mongoose")

const HostingSchema = new mongoose.Schema({

    portions:{
        type: String,
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    rooms:{
        type: String,

    },
    bathrooms:{
        type: String,

    },
    price:{
        type: String,
        required: true
    },

    pictures:{
        type:[String],
        required:true
    },
    
    phoneno: {
        type: String,
    },

    email:{
        type: String,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    available:{
        type: Boolean
    },

    dates:{
        type:[Date],
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },

})

Post = mongoose.model('Hosting', HostingSchema)
module.exports = Post