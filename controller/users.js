const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {jwtSecret} = require("../config/default.json")
const User = require('../models/user.js');
const router = express.Router();


exports.myprofile=async(req,res)=>{
    try{
        const id=req.body.id
        const user= await User.findById(id)        
        if(user){
            res.status(200).json({user});
        }
        else{
            res.status(404).json({ message: "No user info found"});
        }

    }
    catch(error){
        res.status(404).json({ message: error.message});

    }


}


exports.signin=async(req,res)=>{
    const {email, password} = req.body
    console.log(req.body)
    try {
        let user = await User.findOne({email});


        if (!user) {
            return res.json({errors: [{message: "Invalid email or password",success:false}] })
        }

        const isMatch =  await bcrypt.compare(password, user.password)

        if (!isMatch){
            return res.json({errors: [{message: "Invalid email or password",success:false}] })
        }

        const payload = {
            user: {
                id: user.id,
            }
        }

        jwt.sign(payload, jwtSecret,{expiresIn: 360000},
            (err,token) => {
                if (err){
                    throw err
                }
                console.log("ok")
                res.json({userid:user.id,name:user.name,location:user.location,token,success:true})
            }
            )

    } catch (err ) {
        console.log(err.message)
        res.status(500).send('Server error')
        
    }



}



exports.createuser = async (req, res) => {
    const { name, phoneno, location, email, password } = req.body;

    try {

        let user = await User.findOne({email});
        if (user) {
            return res.json({message: "User already exists",exists:true,success:false})
            console.log("user exists already")
        }
        console.log(req.body)

        user = new User({ name, phoneno, location, email, password})

        const salt = await bcrypt.genSalt(10)
        user.password =  await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, jwtSecret,{expiresIn: 360000},
            (err,token) => {
                if (err){
                    throw err
                }
                console.log("sending data")
                res.json({userid:user.id,name:user.name,location:user.location,token,success:true})
            }
            )

        
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

exports.getallusers=async(req,res,)=>{
    try {
        const users = await User.find();        
        res.status(200).json(users);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

exports.getUserById = async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(404).json({msg: "User not found"})
        }
        res.status(200).json(user)
    }
    catch(error){
        console.log(error.message)
        res.status(404).json({ message: error.message});
    }
}

