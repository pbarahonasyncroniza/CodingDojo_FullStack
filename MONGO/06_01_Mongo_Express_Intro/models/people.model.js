// 1 Importing mongoose

const mongoose = require ('mongoose');

// 2 Creating Schame (Blueprint)
const PersonSchema = new mongoose.Schema({
first_name:{ 
type: String,
require: [true, "First name is required"],
minlength: [2, "must be at least 3 character long"],
maxLength :[10, "name must have at least 1 character long"]
},
last_name: String,
age:{
type :Number,
min: [0, 'No nace aun'],
max : [ 100, 'too much'],           

},

male:{
type:Boolean,
require : [true, " se requiere indicar genero "]

}
},{

    timestamps:true
});

// 3 Creating Model Using Schema

const PersonModel= mongoose.model("people", PersonSchema);

module.exports =PersonModel