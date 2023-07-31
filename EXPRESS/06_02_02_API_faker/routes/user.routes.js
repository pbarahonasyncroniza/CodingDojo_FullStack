
//  importar controladores 
const UserController = require ('../controller/user.controller');

// exportar rutas 
module.exports = (app) => {

    app.post ('/api/users',UserController.CreateUser)
};