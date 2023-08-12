const {getAllUser,getOneUser,createUser,editUser} = require ("../controllers/users.controllers");

module.exports = (app)=>{

    app.get("/users/",getAllUser);
    app.get("/users/:id/",getOneUser);
    app.post("/users/", createUser);
    app.patch("/users/:id", editUser);

}
