var express = require ("express");
var app= express();

const userRouter = require ('./routers/user.router');
userRouter(app) 

app.listen (8080, ()=>{

    console.log("nuestro primer servidor funcionando ")
})