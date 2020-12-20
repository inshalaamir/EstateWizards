const express = require("express");
const Post = require('../models/posts.js');
const User = require('../models/user.js');
const mongoose = require ("mongoose")

exports.createPost = async (req , res) => {
    
    try{
        console.log( req.body.propertytype + req.body.location + req.body.portions + req.body.area + req.body.bathrooms + req.body.title)
        var { type,propertytype,portions,title, description, location,area, rooms, bathrooms, price,pictures } = req.body;

        const user = await User.findById(req.user.id).select("-password")
    
        var post = new Post({type,propertytype,portions,title, description, location,area, rooms, bathrooms, price,pictures, phoneno: user.phoneno, email: user.email, user: req.user.id });
        await post.save();
        res.status(200).json({success:true});

    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error.message)
    }
}


exports.viewAllPosts = async (req, res) => {
    try{
        const posts = await Post.find();       
        res.status(200).json(posts);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}
 

exports.findByLocation = async (req, res) => {
    try {
        const Lposts = await Post.find({ location: 'Rawalpindi'});       
        res.status(200).json(Lposts);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

exports.findByType = async (req, res) => {
    try {
        const Lposts = await Post.find({ type: 'Flat'});
        console.log("Tatta");        
        res.status(200).json(Lposts);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

exports.findByBoth = async(req,res) => {
    try {
        console.log(req.params)
        const posts = await Post.find({type: req.params.type, location: req.params.location, propertytype: req.params.propertytype})
        console.log(Object.keys(posts).length)
        res.status(200).json({posts:Object.values(posts)})
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

exports.getPostById = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id) 
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