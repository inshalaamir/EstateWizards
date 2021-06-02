const mongoose = require ("mongoose")

const ProjectSchema = new mongoose.Schema({


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
    features:{
        type: [String],
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
    developer
    : {
        type: String
    },

    starting:{
        type: String
    },

    email:{
        type: String,
    },

    date: {
        type: Date,
        default: Date.now
    }
})

Project = mongoose.model('project', ProjectSchema)
module.exports = Project