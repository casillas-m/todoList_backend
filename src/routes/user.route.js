const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Creates a new user
 *     requestBody:
 *         description: User object
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                      type: object
 *                      required:
 *                        - name
 *                        - mail
 *                        - password
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Elon
 *                          mail:
 *                              type: string
 *                              example: musk@tesla.com
 *                          password:
 *                              type: string
 *                              example: YourM0veJ3ff
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Missing required info
 *       409:
 *         description: Email already in use
 *       500:
 *         description: Error. Returns an object with the error message
 */
router.post("/", userController.createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Returns current user's name
 *     security: [Authorization: []]
 *     responses:
 *       200:
 *         description: Returns an object with the user's name.
 *         content:
 *             aplication/json:
 *                 schema: 
 *                     type: object
 *                     properties:
 *                         name:
 *                             type: string
 *                             example: Elon
 *                             description: The user's name
 *       400:
 *         description: Missing required info
 *       500:
 *         description: Error. Returns an object with the error message
 */
router.get("/", authMiddleware, userController.getUser);

/**
 * @swagger
 * /api/users:
 *   put:
 *     tags:
 *       - Users
 *     summary: Updates current user's name or password
 *     security: [Authorization: []]
 *     requestBody:
 *         description: User object
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         name:
 *                             type: string
 *                             example: Elon
 *                         password:
 *                             type: string
 *                             example: YourM0veJ3ff
 *     responses:
 *       200:
 *         description: User edited
 *       400:
 *         description: Missing required info
 *       500:
 *         description: Error. Returns an object with the error message
 */
router.put("/", authMiddleware, userController.editUser);

/**
 * @swagger
 * /api/users:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Deletes current user
 *     security: [Authorization: []]
 *     responses:
 *       200:
 *         description: User deletd
 *       400:
 *         description: Missing required info
 *       500:
 *         description: Error. Returns an object with the error message
 */
router.delete("/", authMiddleware, userController.deleteUser);


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Users login
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *         description: User object
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     required:
 *                       - mail
 *                       - password
 *                     properties:
 *                         mail:
 *                             type: string
 *                             example: musk@tesla.com
 *                         password:
 *                             type: string
 *                             example: YourM0veJ3ff
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *             aplication/json:
 *                 schema: 
 *                     type: object
 *                     properties:
 *                         authorization:
 *                             type: string
 *                             example: xxxxxxxx
 *                             description: The user's session token
 *       400:
 *         description: Missing required info
 *       500:
 *         description: Error. Returns an object with the error message
 */
router.post("/login", userController.login);

module.exports = router;