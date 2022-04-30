const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getUser);
router.put("/", userController.editUser);
router.delete("/", userController.deleteUser);

router.post("/login", userController.login);

module.exports = router;