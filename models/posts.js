const mongoose = require ("mongoose")

const PostSchema = new mongoose.Schema({

    type:{
        type: String,
        required: true
    },
    propertytype:{
        type: String,
        required: true
    },
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
    area:{
        //per square feet
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
    latlong:{
        type:[Number]
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
    bids:{
        type:[{
            user:{type:mongoose.Schema.Types.ObjectId, ref: "user"},
            bid:{type:String}
        }]
    },

    date: {
        type: Date,
        default: Date.now
    }
})

Post = mongoose.model('post', PostSchema)
module.exports = Post