const express = require("express");
const taskController = require("../controllers/task.controller");
const router = express.Router();

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.put("/", taskController.editTask);
router.delete("/", taskController.deleteTask);

module.exports = router;