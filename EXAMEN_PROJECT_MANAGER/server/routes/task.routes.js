const {getAllTasks, getOneTask, createTask, deleteTask, editTask} = require("../controllers/task.controller");

module.exports = (app) => {
    app.get("/tasks/", getAllTasks);
    app.get("/tasks/:id/", getOneTask);
    app.post("/tasks/", createTask);
    app.delete("/tasks/:id/", deleteTask);
    app.patch("/tasks/:id/", editTask);
}
