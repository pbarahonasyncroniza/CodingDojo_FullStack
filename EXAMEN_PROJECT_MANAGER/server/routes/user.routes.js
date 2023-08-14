const {getAllUser,getOneUser,createUser,editUser} = require ("../controllers/user.controller")
module.exports = (app)=>{

    app.get("/users/",getAllUser);
    app.get("/users/:id/",getOneUser);
    app.post("/users/", createUser);
    app.patch("/users/:id", editUser);

}
