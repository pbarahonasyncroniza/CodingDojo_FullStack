const mongoose = require ("mongoose");
const {ObjectId} = mongoose.Types;
const AuthorModel = require ("../models/authors.models");


module.exports ={

    getAllAuthors : (req, res) => {
        AuthorModel.find({},{first_name:true,last_name:true})
            .then((data)=>{
            res.json({data:data})
            })
            .catch((error)=>{
                res.status(500).json({error:eroor})
            })            
    
    },

    getOneAuthor : (req, res) => {
        let id = req.params.id
        if (!ObjectId.isValid(id))
            return res.status(400).json({message: "id doesn't match the expected format"});
        AuthorModel.find({_id: id})
            .then((data) => {
                res.json({data:data})
            })
            .catch((error) => {
                res.status(500).json({error: error})
            })
    },

    createAuthor : (req,res) =>{
        let data =req.body;
        console.log(data);
        AuthorModel.create(data)
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



    deleteAuthor: (req, res) =>{
        let id = req.params.id
        if(!ObjectId.isValid(id))
            return res.status(400).json({message: "Id  do not match"})
        AuthorModel.deleteOne({_id:id})
            .then(()=>{
                res.json({success: true})
            })
            .catch((error)=>{
                res.status(500).json({error:error})
            })
    },


    editAuthor: (req, res) =>{
        let id = req.params.id;
        let data = req.body;
        
        const updateOptions = {
            new: true, // Return the updated document (para hacer correr las validaciones al actualizar)
            runValidators: true, // Enforce validation during update (para hacer correr las validaciones al actualizar)
        };

        if(!ObjectId.isValid(id))
        return res.status(400).json({message: "Id  do not match"})
    AuthorModel.findByIdAndUpdate({_id:id}, data, updateOptions)
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




















