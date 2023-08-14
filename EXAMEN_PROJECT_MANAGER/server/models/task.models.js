const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({

  task: {
    type: String,
    required: [true, "Require Task"],
    minlength: [3, "At least 3 characters"],
  },

  due_date: {
    type: Date,
    required: [true, "Requiere date"],
   
  },

  status:{

    type: String,
    enum : ["backlog", "inprogress" , "completed"],
    default: "backlog"
  }



 
}, {
  timestamps: true,
});

const TaskModel = mongoose.model("Tasks", TaskSchema);

module.exports = TaskModel;
