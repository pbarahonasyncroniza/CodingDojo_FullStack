// importar models

const CompanyModel =require ("../models/company.model");

//2 exportar controller functions

module.exports = {
    createCompany: (req, resp) => {
        let newCompany = new CompanyModel ()
        resp.json({company:newCompany})

    },
}