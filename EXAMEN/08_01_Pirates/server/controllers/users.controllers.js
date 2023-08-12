const mongoose = require ("mongoose");
const {ObjectId} = mongoose.Types;
const UserModel = require("../models/user.models");


module.exports ={

    getAllUser : (req, res) => {
        UserModel.find({},{first_name:true,last_name:true, email:true})
            .then((data)=>{
            res.json({data:data})
            })
            .catch((error)=>{
                res.status(500).json({error:eroor})
            })            
    
    },

    getOneUser : (req, res) => {
        let id = req.params.id
        if (!ObjectId.isValid(id))
            return res.status(400).json({message: "id doesn't match the expected format"});
        UserModel.find({_id: id})
            .then((data) => {
                res.json({data:data})
            })
            .catch((error) => {
                res.status(500).json({error: error})
            })
    },

    createUser : (req,res) =>{
        let data =req.body;
        console.log(data);
        UserModel.create(data)
        .then((data)=>{
            res.json({data:data})
            })
            .catch((error) => {
                // error de validacion de mongoose
                if (error instanceof mongoose.Error.ValidatorError){
                    let keys = Object.keys(error.errors);
                    let error_dict = {};
                    keys.map((key) => {
                        error_dict[key] = error.errors[key].message
                    });
                    res.status(500).json({error: error_dict})
                } else {
                    res.status(500).json({error: error})
                }
            })

    },


    editUser: (req, res) =>{
        let id = req.params.id;
        let data = req.body;
        
        const updateOptions = {
            new: true, // Return the updated document (para hacer correr las validaciones al actualizar)
            runValidators: true, // Enforce validation during update (para hacer correr las validaciones al actualizar)
        };

        if(!ObjectId.isValid(id))
        return res.status(400).json({message: "Id  do not match"})
    UserModel.findByIdAndUpdate({_id:id}, data, updateOptions)
        .then(()=>{
            res.json({success: true})
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidatorError){
                let keys = Object.keys(error.errors);
                let error_dict = {};
                keys.map((key) => {
                    error_dict[key] = error.errors[key].message
                });
                res.status(500).json({error: error_dict})
            } else {
                res.status(500).json({error: error})
            }
        })      
    }

}




















