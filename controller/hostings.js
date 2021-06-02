const express = require("express");
const Hosting = require('../models/hostings.js');
const User = require('../models/user.js');
const mongoose = require ("mongoose")

exports.createHosting = async (req , res) => {
    
    try{
        var { portions,title, description,location,rooms, bathrooms,price, pictures} = req.body;
        var available = true
        var reservations = []

        const user = await User.findById(req.user.id).select("-password")
    
        var hosting = new Hosting({portions,title, description,location,rooms, bathrooms,price, pictures,phoneno: user.phoneno, email: user.email, user: req.user.id, available, reservations});
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
        const location = req.params.location
        const hostings = await Hosting.find({location: location})

        
        const values = Object.values(hostings)
       

        const filtered = values.map((hosting)=> {
            
            var contain = true
            if (hosting.reservations.length<1){
            }
            else{
                var i;
                for( i=0; i< hosting.reservations.length; i++){
                    var s = hosting.reservations[i].dates.map(date => date.toISOString().substring(0,10) )

                    for (var j=0; j<dates.length; j++){
                        
                        if (s.includes(dates[j])) {
                            contain= false
                        }
                    }             
                }
            }
            if (contain){return hosting}
        })

      

        res.status(200).json({posts:Object.values(filtered)})
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

exports.myPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id });
               
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
        
        //console.log(post)
        res.status(200).json(post)
    } catch (error) {
        console.log(error.message)
        res.status(404).json({ message: error.message});
    }
}

exports.removeRequest = async (req,res) => {
    try {
        
        const hosting = await Hosting.findById(req.params.hosting)
        const user = await User.findById(req.params.user)
        const poster = await User.findById(req.params.poster)

        if (!user || !hosting || !poster ){
            res.status(404).json({msg: "User or Post does not exist anymore"})
        }
        

         
        
        var reservations = poster.reservations   
        var updated = []
          
         
        updated = reservations.filter( reservation => {
             

            return (reservation.user.toString().trim() !== user._id.toString().trim() || 
           
                     reservation.hosting.toString().trim() !== hosting._id.toString().trim() 
            )
            
        })

        await User.updateOne({_id: poster.id}, {$set: {reservations: updated}})
        await User.updateOne({_id: user.id}, {$pull: {requests: {$in: [hosting]}}})

        console.log("Removed") 

        res.status(200).json(user)

    } catch (error) {
        console.log(error.message)
        res.status(404).json({ message: error.message});
    }
}
 
// exports.addRequest = async (req,res) => {
//     try{
        
//         const hosting = await Hosting.findById(req.params.hosting)
//         const user = await User.findById(req.params.user)

//         if (!user || !hosting ){
//             res.status(404).json({msg: "User or Post does not exist anymore"})
//         }

//         var requests = user.requests
//         requests.push(hosting)
//         console.log(requests)
//         await User.updateOne({_id: user.id}, {$set: {requests: requests}})
        
//         res.status(200).json(user)

//     }
//     catch (error) {
//         console.log(error.message)
//         res.status(404).json({ message: error.message});
//     }
// }

exports.addRequest = async (req,res) => {
    try {
        const hosting = await Hosting.findById(req.params.hosting)
        
        const sender = await User.findById(req.params.sender)
        
        const user = await User.findById(req.params.user)
        

        if (!user || !hosting || !sender ){
            res.status(404).json({msg: "User or Post does not exist anymore"})
        }
        
        
        const dates=req.params.dates.split(',')
        
        const obj = {
            hosting: hosting,
            user: sender,
            dates: dates,
            name: sender.name,
            title: hosting.title,
            location: hosting.location

        }

        var reservations = user.reservations
        reservations.push(obj)

        var requests = sender.requests
        requests.push(hosting)

        await User.updateOne({_id: sender.id}, {$set: {requests: requests}})

        await User.updateOne({_id: user.id}, {$set: {reservations: reservations}})
        console.log("added")

        res.status(200).json(reservations)

    } catch (error) {
        console.log(error.message)
        res.status(404).json({ message: error.message});
    }
}

exports.reserve = async (req,res) => {
try {

    console.log("Reserve working")

    const hosting = await Hosting.findById(req.params.hosting)
    const user = await User.findById(req.params.user)
    const dates = req.params.dates.split(',')

    
    var reservations = hosting.reservations

    var obj = {
        dates: dates,
        user: user
    }

    reservations.push(obj)

    await Hosting.updateOne({_id: hosting.id}, {$set: {reservations: reservations}})

    res.status(200).json(hosting)



} catch (error) {
    console.log(error.message)
        res.status(404).json({ message: error.message});
}
}

exports.sendNotification = async (req,res) => {
    try {
        const user = await User.findById(req.params.user)
        const text = req.params.text

        const notifications = user.notifications

        notifications.unshift(text)
        await User.updateOne({_id: user.id}, {$set: {notifications}})
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        res.status(404).json({ message: error.message});
    }
}
