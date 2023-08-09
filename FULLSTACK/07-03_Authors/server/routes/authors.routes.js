const {getAllAuthors,getOneAuthor,createAuthor,deleteAuthor,editAuthor} = require ("../controllers/authors.controllers");

module.exports = (app)=>{

    app.get("/authors/",getAllAuthors);
    app.get("/authors/:id/",getOneAuthor);
    app.post("/authors/", createAuthor);
    app.delete("/authors/:id", deleteAuthor);
    app.patch("/authors/:id", editAuthor);



}
