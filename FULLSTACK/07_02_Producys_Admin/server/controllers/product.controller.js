const mongoose = require ("mongoose");
const {ObjectId} = mongoose.Types;
const ProductModel = require ("../models/products.model");


module.exports ={

    getAllProducts : (req, res) => {
        ProductModel.find({},{title:true,price:true,description:true})
            .then((products)=>{
            res.json({data:products})
            })
            .catch((error)=>{
                res.status(500).json({error:eroor})
            })            
    
    },

    getOneProduct : (req, res) => {
        let id = req.params.id
        if (!ObjectId.isValid(id))
            return res.status(400).json({message: "id doesn't match the expected format"});
        ProductModel.find({_id: id})
            .then((pirates) => {
                res.json({data: pirates})
            })
            .catch((error) => {
                res.status(500).json({error: error})
            })
    },

    createProduct : (req,res) =>{
        let data =req.body;
        console.log(data);
        ProductModel.create(data)
        .then((products)=>{
            res.json({data:products})
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



    deleteProduct: (req, res) =>{
        let id = req.params.id
        if(!ObjectId.isValid(id))
            return res.status(400).json({message: "Id  do not match"})
        ProductModel.deleteOne({_id:id})
            .then(()=>{
                res.json({success: true})
            })
            .catch((error)=>{
                res.status(500).json({error:error})
            })
    },


    editProduct: (req, res) =>{
        let id = req.params.id;
        let data = req.body;
        
        const updateOptions = {
            new: true, // Return the updated document (para hacer correr las validaciones al actualizar)
            runValidators: true, // Enforce validation during update (para hacer correr las validaciones al actualizar)
        };

        if(!ObjectId.isValid(id))
        return res.status(400).json({message: "Id  do not match"})
    ProductModel.findByIdAndUpdate({_id:id}, data, updateOptions)
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




















