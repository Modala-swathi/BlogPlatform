const express = require('express');
const User=require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_SECRET = 'swathiisagoodgi$rl'
const fetchuser=require('../middleware/fetchUser')

//To create a new user using : "api/auth/createuser"





router.post('/createuser',[
    body('name','Enter a valid name ').isLength({min:3}),
    body('email','Enter a Email ').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min:5})
],async (req,res)=>{
    let success = false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors : errors.array()});
    }
    try{
        let user=await User.findOne({email : req.body.email});
        if(user){
            return res.status(400).json({success,error : "Sorry a user alredy exists...!!!!"})
        }
        const salt=await bcrypt.genSalt(10);
        const secPass= await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name : req.body.name,
            password:secPass,
            email : req.body.email
        });
        const data={
            user : {
                id : user.id
            }
        }
        success=true;
        const authtoken=jwt.sign(data,JWT_SECRET);
        res.json({success,authtoken});
    } 
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//To login using : "api/auth/login"

router.post('/login',[
    body('email','Enter a valid Email ').isEmail(),
    body('password','password cannot be empty').exists(),
],async (req,res)=>{
    let success = false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors : errors.array()});
    }

    const {email,password}=req.body;

    try{
        let user =await User.findOne({email});
        if(!user){
            return res.status(400).json({success,error : "Please try with correct credentials"})
        }
        const passwordCompare=await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            return res.status(400).json({success,error : "Please try with correct credentials"})
        }
        const data={
            user : {
                id : user.id
            }
        }
        success = true;
        const authtoken=jwt.sign(data,JWT_SECRET);
        res.json({success,authtoken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


//Get logged in user details using : "api/auth/getuser"

router.post('/getuser', fetchuser,async (req,res)=>{
    try{
        const userId=req.user.id;
        const user=await User.findById(userId).select("-password")
        res.send(user)
    }
    catch(error){
            console.error(error.message);
            res.status(500).send("Internal server error");
    }
})
module.exports=router