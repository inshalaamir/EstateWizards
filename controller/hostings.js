const express = require("express");
const Hosting = require('../models/hostings.js');
const User = require('../models/user.js');
const mongoose = require ("mongoose")

exports.createHosting = async (req , res) => {
    
    try{
        var { portions,title, description,location,rooms, bathrooms,price, pictures} = req.body;
        var available = true
        var dates = []

        const user = await User.findById(req.user.id).select("-password")
    
        var hosting = new Hosting({portions,title, description,location,rooms, bathrooms,price, pictures,phoneno: user.phoneno, email: user.email, user: req.user.id, available, dates});
        await hosting.save();
        res.status(200).json({success:true});

    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error.message)
    }
}


exports.viewAllHostings = async (req, res) => {
    try{
        const hostings = await Hosting.find();       
        res.status(200).json(posts);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

exports.findByBoth = async(req,res) => {
    try {
        
        const dates=req.params.dates.split(',')
        const hostings = await Hosting.find({dates: {$nin : dates }})
        res.status(200).json({posts:Object.values(hostings)})
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

exports.myPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id });
        console.log("Tatta");        
        res.status(200).json(posts);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
} 

exports.getHostingById = async (req,res) => {
    try {
        const post = await Hosting.findById(req.params.id) 
        if (!post){
            res.status(404).json({msg:'Post not found'})
        }
        
        console.log("postfound")
        //console.log(post)
        res.status(200).json(post)
    } catch (error) {
        console.log(error.message)
        res.status(404).json({ message: error.message});
    }
}