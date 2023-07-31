// importar models
const CompanyModel =require ("../models/user.model");

//2 exportar controller functions

module.exports = {
    createUser: (req, resp) => {
        let newUser = new userModel ()
        resp.json({user:newUser})

    },
}
