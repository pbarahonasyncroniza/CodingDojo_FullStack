//1 importing external Libraries
const mongoose = require ("mongoose");

//2 Importing Model 
const petModel = require ("../models/pet.model")
const userModel = require("../models/user.model");

//3 Exporting Controller functions
module.exports ={
    //3.1 READ METHODS
    findAllPets: (req, res) => {
        petModel.find({})
        .populate("owner")
        .then((allpets)=> res.status(200).json(allpets))
        .catch((err)=>
            res.status(500).json({message:"Something went wrong",error:err})
        );
    },
    finfOnePetById : (req,res) => {
        if(!ObjectId.isValid(req.params.id))
            return res.status(400).json({message:"UUID doesn´t mach with the specifit format"})
        petModel.findOne ({_id:req.params.id})
        .populate("owner")
        .then((oneSinglePet) =>{
            if (oneSinglePet) {
                res.status(200).json(oneSinglePet);
            }else{
                res.status(404).json({message: "Pet not found"})
            }
        }).catch((err)=> 
        res.status(500).json({message:"Something went wromg", error:err})
        );

        //3.2 CREATE METHODS
        createNewPet: (req, res) => {
            let newPetCreated;
            petModel.create(req.body)
            .then((newPet) => {
                newPetCreated = newPet; // saving a new pet in a variable 
                return userModel.findOneandUpdate(
                    {_id: req.body.owner},
                    {$push:{pets:newPet._id}},
                    {new:true}
                );
            })
            .then((updatedUser) => petModel.findOne({_id:newPetCreated._id}).populate("owner"))
            .then((newPet) =>res.status(201).json(newPet))
            .catch((err)=>
                res.status(500).json({message:"Something went wrong", error:err})
            )
        };

        //3.3 UPDATE METHODS
        updateOnePetById: (req, res) => {
            if(!ObjectId.isValid(req,params,id))
            return res.status(400).json({message:"UUID doesn´t mach with the specifit format"})
            const updateOptions ={
                new:true, //retutn the updated socument
                runValidators:true // Enforce validation during update
            };
        petModel.findOneandUpdate ({_id:req.params.id}, req.body,updateOptions)
        .populate("owner")
        .then((updatedPet) => {
            if(updatedPet) {
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
         deleteAllPets: (req, res)=> {
            petModel.deleteMany({})
            .then((result)=> res.status(200).json({ result:result} ))
            .catch((err)=> res.status(500).json({message: "Something went wrong", error:err}));
         },


         deleteOnePetById : (req, res) => {
            if(!ObjectId.isValid(req,params,id))
            return res.status(400).json({message:"UUID doesn´t mach with the specifit format"})
            petModel.deleOne ({_id: req.params.id})
            .then ((result)=>{
                if(result.deletedCount === 0){
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









