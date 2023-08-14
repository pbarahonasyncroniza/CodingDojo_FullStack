const mongoose = require ("mongoose");
const {ObjectId} = mongoose.Types;
const TaskModel = require("../models/task.models");


module.exports ={

    getAllTasks : (req, res) => {
        TaskModel.find({})
            .then((data)=>{
            res.json({data:data})
            })
            .catch((error)=>{
                res.status(500).json({error:error})
            })            
    
    },

    getOneTask : (req, res) => {
        let id = req.params.id
        if (!ObjectId.isValid(id))
            return res.status(400).json({message: "id doesn't match the expected format"});
        TaskModel.findOne({_id: id})
            .then((data) => {
                res.json({data:data})
            })
            .catch((error) => {
                res.status(500).json({error: error})
            })
    },

    createTask : (req,res) =>{
        let data =req.body;
        console.log(data);
        TaskModel.create(data)
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



    deleteTask: (req, res) =>{
        let id = req.params.id
        if(!ObjectId.isValid(id))
            return res.status(400).json({message: "Id  do not match"})
            TaskModel.deleteOne({_id:id})
            .then(()=>{
                res.json({success: true})
            })
            .catch((error)=>{
                res.status(500).json({error:error})
            })
    },


    editTask: (req, res) =>{
        console.log("Received update request for task ID:", req.params.id);  // log the task ID
        console.log("Request body:", req.body)
        
        let id = req.params.id;
        let data = req.body;
        
        const updateOptions = {
            new: true, // Return the updated document (para hacer correr las validaciones al actualizar)
            runValidators: true, // Enforce validation during update (para hacer correr las validaciones al actualizar)
        };

        if(!ObjectId.isValid(id))
        return res.status(400).json({message: "Id  do not match"})
        TaskModel.findByIdAndUpdate({_id:id}, data, updateOptions)
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




















