const express = require("express");
const Project = require('../models/project.js');
const User = require('../models/user.js');
const mongoose = require ("mongoose")

exports.createProject = async (req , res) => {
    
    try{
        var { title, description, location,features, pictures,latlong, phoneno, developer, starting, email  } = req.body;
    
        var project = new Project({ title, description, location,features, pictures,latlong, phoneno, developer, starting, email });
        await project.save();
        res.status(200).json({success:true});

    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error.message)
    }
}

exports.findByLoc = async(req,res) => {
    try {
        const projects = await Project.find({location: req.params.location})
        res.status(200).json({projects:Object.values(projects)})
    } catch (error) { 
        res.status(404).json({msg: error.message})
    }
}