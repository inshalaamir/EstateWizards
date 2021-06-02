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

    reservations:{
        type: [{
            dates:[Date],
            user:{type: mongoose.Schema.Types.ObjectId, ref: "user"}
        }]
    },
    date: {
        type: Date,
        default: Date.now
    },

})

Hosting = mongoose.model('hosting', HostingSchema)
module.exports = Hosting