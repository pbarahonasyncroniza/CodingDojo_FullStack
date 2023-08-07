//1 importing external Libraries
const mongoose = require ("mongoose");
const {ObjectId} = mongoose.types; // Destructuring assigment to gwet ObjectId

//2 Importing Model 

const userModel = require("../models/user.model");

//3 Exporting Controller functions
module.exports ={
    //3.1 READ METHODS
    getAllUser: (req, res) => {
        userModel.find({})
        .populate("pets")
        .then((allUsers)=> res.status(200).json(allpets))
        .catch((err)=>
            res.status(500).json({message:"Something went wrong",error:err})
        );
    },
    getOneUserById : (req,res) => {
        if(!ObjectId.isValid(req,params,id))
            return res.status(400).json({message:"UUID doesn´t mach with the specifit format"})
        userModel.findOne ({_id:req.params.id})
        .populate("owner")
        .then((oneSingleUser) =>{
            if (oneSingleUser) {
                res.status(200).json(oneSinglePet);
            }else{
                res.status(404).json({message: "Pet not found"})
            }
        }).catch((err)=> 
        res.status(500).json({message:"Something went wromg", error:err})
        );

        findUserByEmail : (req, res) =>{
            userModel.findOne({email:req.query.email})
            .populate("pets")
            .then ((oneSingleUser) =>{
                if(oneSingleUser){
                    res.status(200).json(oneSingleUser);
                }else{
                    res.status(404).json({message:"User not found"});
                }
            })
            .catch((err)=>{
                res.status(500).json({message:"Something went wrong",error:err})
            });
        },

        //3.2 CREATE METHODS
        createNewUser:(req, res) => {
            userModel.create(req.body)
            .then((newUser)=>res.status(201).json(newUser))
            .catch((err)=>
            res.status(500).json({message: "Somenthing went wrong",error: err})
            );
        };

        //3.3 UPDATE METHODS
        updateOnePetById: (req, res) => {
            if(!ObjectId.isValid(req,params,id))
            return res
            .status(400)
            .json({message:"UUID doesn´t mach with the specifit format"})
            const updateOptions ={
                new:true, //retutn the updated socument
                runValidators:true // Enforce validation during update
            };
        userModel.findOneAndUpdate ({_id:req.params.id}, req.body,updateOptions)
        .populate("pets")
        .then((updatedUser) => {
            if(updatedUser) {
                res.status(200).json(updatedPet);
            }else{
                res.status(404).json({message: "Pet not found"})
            }
            })
            .catch((err) => 
            res.status(500).json({message: " Something went wrong", error:err})
            );
        }
        
    },
         // 3.4 DELETE METHOD

         deleteAllUsers:(req, resp)=> {
            userModel.deleteMany({})
            .then((result)=> res.status(200).json(result))
            .catch((err)=> {
                res.status(500).json({message: "Something went wrong", error:err})
            });
         },

         deleteOneUserById : (req, res) => {
            if(!ObjectId.isValid(req.params.id))
            return res
            .status(400)
            .json({message:"UUID doesn´t mach with the specifit format"})
            userModel.deleOne ({_id: req.params.id})
                .then ((result)=>{
                if(result.deletedCount > 0){
                    res.status(404).json({message: "Pet not found"});
                }else{
                    res.status(200).json({result:result})
                }
            })
            .catch((err)=>
                res.status(500).json ({message: "Something went wrong", error:err})
            );
         },
         
    


    }









