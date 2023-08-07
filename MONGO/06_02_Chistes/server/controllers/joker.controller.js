const jokerModel = require ("./joker.controller");

module.exports = {

    getJoker: (req, res) => {
        jokerModel.find({})
            .then((joker) => {
                return res.json({
                    data: joker
                });
            })
            .catch((error) => {
                return res.json({
                    error: error.toString()
                });
            });
    },


    createJoker: async (req, resp) => {
        jokerModel.createJoker(req.body)
        .then (() => {
            return res.json({
                ok:true
            })
        }).catch ((error) =>{
            let keys = object.keys (error.errors)
            let error_dict={}
            keys.map ((keys)=>{
                    error_dict[key] = error.errors[key].message
            })
            returnres.json ({
                error:error_dict
            })
        })
    },

    deleteJoker:async (req,res) =>{
        jokerModel.deleteOne ({_id:req.params.id})
        .then (() =>{
            return res.json({ok:true})
        }). catch ((error)=>{
            return res.json({
                error:error.toString
            })
        })

    }

}

