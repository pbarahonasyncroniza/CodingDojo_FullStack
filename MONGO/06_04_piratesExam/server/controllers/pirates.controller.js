const mongoose = require("mongoose");
const {ObjectId} = mongoose.Types;
const PirateModel = require("../models/pirates.models");

module.exports = {
    getAllPirates : (req, res) => {
        PirateModel.find({}, {_id: true, name: true, photo: true}) // projection solo cuando se hace una consulta
            .then((pirates) => {
                res.json({data: pirates})
            })
            .catch((error) => {
                res.status(500).json({error: error})
            })
    },
    getOnePirate : (req, res) => {
        let id = req.params.id
        if (!ObjectId.isValid(id))
            return res.status(400).json({message: "id doesn't match the expected format"});
        PirateModel.find({_id: id})
            .then((pirates) => {
                res.json({data: pirates})
            })
            .catch((error) => {
                res.status(500).json({error: error})
            })
    },
    createPirate : (req, res) => {
        let data = req.body;
        console.log(data);
        PirateModel.create(data)
            .then((pirate) => {
                res.json({data: pirate})
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
    deletePirate : (req, res) => {
        let id = req.params.id
        if (!ObjectId.isValid(id))
            return res.status(400).json({message: "id doesn't match the expected format"});
        PirateModel.deleteOne({_id: id})
            .then(() => {
                res.json({success: true})
            })
            .catch((error) => {
                res.status(500).json({error: error})
            })
    },
    editPirate : (req, res) => {
        let id = req.params.id;
        let data = req.body;
        const updateOptions = {
            new: true, // Return the updated document (para hacer correr las validaciones al actualizar)
            runValidators: true, // Enforce validation during update (para hacer correr las validaciones al actualizar)
        };
        if (!ObjectId.isValid(id))
            return res.status(400).json({message: "id doesn't match the expected format"});
        PirateModel.findByIdAndUpdate({_id: id}, data, updateOptions) 
            .then(() => {
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
    },
}