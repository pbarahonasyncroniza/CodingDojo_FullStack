const {getAllProducts,createProduct,deleteProduct,editProduct} = require ("../controllers/product.controller");

module.exports = (app)=>{

    app.get("/product/",getAllProducts);
    app.get("/product/:id/",getAllProducts);
    app.post("/product/", createProduct);
    app.delete("/product/:id", deleteProduct);
    app.patch("/product/:id", editProduct);



}
