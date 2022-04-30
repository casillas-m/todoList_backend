const express = require("express");
const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/", authMiddleware, taskController.createTask);
router.get("/", authMiddleware, taskController.getTasks);
router.put("/", authMiddleware, taskController.editTask);
router.delete("/", authMiddleware, taskController.deleteTask);

module.exports = router;