// importar controladores 
const CompanyController  = require ("../controller/company.controller")

// exportar las rutas 
module.export = (app) =>{
    app.post ("/api/companies", CompanyController.createCompany);
}