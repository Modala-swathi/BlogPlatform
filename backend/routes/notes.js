const express = require('express');
const Notes=require('../models/Notes');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser=require('../middleware/fetchUser');

//Get all the notes usin Get : "/api/notes/fetchallnotes"

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try{
        const notes=await Notes.find({user : req.user.id})
        res.json(notes)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
});

//Add a new note using Post : "/api/notes/addnote"
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title ').isLength({min:3}),
    body('description','descriptiion must be atleast 5 characters').isLength({min:5})
],async (req,res)=>{
    try{
        const{title,description,tag}=req.body;
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }
        const note=new Notes({
            title,
            description,
            tag,
            user:req.user.id
        })
        const savedNote=await note.save();
        res.json(savedNote)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");

    }
});


//Updating an existing Note using  Put : "/api/notes/updatenote"
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    try{
        const{title,description,tag}=req.body;

        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag}
        
        let note= await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }

        if(note.user.toString()  !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note= await Notes.findByIdAndUpdate(req.params.id,{$set : newNote},{new : true});
        res.json(note);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");

    }
});


//Deleting a Note  using Delete : "/api/notes/deletenote"

router.delete('/deletenote/:id',fetchuser,async (req,res)=>{

    try{
        let note= await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }

        if(note.user.toString()  !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note= await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success" : "Note has been deleted", note : note});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");

    }
});


module.exports=router