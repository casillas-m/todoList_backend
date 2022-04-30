const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/", userController.createUser);
router.get("/", authMiddleware, userController.getUser);
router.put("/", authMiddleware, userController.editUser);
router.delete("/", authMiddleware, userController.deleteUser);

router.post("/login", userController.login);

module.exports = router;