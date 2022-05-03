const express = require("express");
const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Create a new task
 *     security: [Authorization: []]
 *     requestBody:
 *         description: Task object
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                      type: object
 *                      required:
 *                        - title
 *                      properties:
 *                          title:
 *                              type: string
 *                              example: Buy Twitter
 *                          text:
 *                              type: string
 *                              example: Place an offer an leave
 *                          timeEstimate:
 *                              type: string
 *                              example: 1
 *                          starTime:
 *                              type: string
 *                              example: 1651469617
 *                          endTime:
 *                              type: string
 *                              example: 1651469618
 *                          imageURL:
 *                              type: string
 *                              example: https://image.com/photo.jpg
 *     responses:
 *       201:
 *         description: Task created
 *       400:
 *         description: Missing required info
 *       500:
 *         description: Error. Returns an object with the error message
 */
router.post("/", authMiddleware, taskController.createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Return all current user's tasks
 *     security: [Authorization: []]
 *     responses:
 *       200:
 *         description: Returns an object with an array of the user's tasks.
 *         content:
 *             aplication/json:
 *                 schema: 
 *                     type: object
 *                     properties:
 *                         tasks:
 *                             type: array
 *                             items:
 *                                 type: object
 *                                 properties:
 *                                     _id:
 *                                         type: string
 *                                         example: 626ccc5dca69e8e538dce690
 *                                     idUser:
 *                                         type: string
 *                                         example: musk@tesla.com
 *                                     priority:
 *                                         type: number
 *                                         example: 1
 *                                     title:
 *                                         type: string
 *                                         example: Buy Twitter
 *                                     text:
 *                                         type: string
 *                                         example: This is a key task
 *                                     createdAt:
 *                                         type: number
 *                                         example: 1651297373221
 *                                     timeEstimate:
 *                                         type: number
 *                                         example: 100
 *                                     starTime:
 *                                         type: number
 *                                         example: 1651297373221
 *                                     endTime:
 *                                         type: number
 *                                         example: 1651297373321
 *                                     imageURL:
 *                                         type: string
 *                                         example: https://image.com/photo.jpg
 *                                     completed:
 *                                         type: boolean
 *                                         example: false
 *                             description: The user's tasks
 *       400:
 *         description: Missing required info
 *       500:
 *         description: Error. Returns an object with the error message
 */
router.get("/", authMiddleware, taskController.getTasks);

/**
 * @swagger
 * /api/tasks:
 *   put:
 *     tags:
 *       - Tasks
 *     summary: Updates the task selected by the query parameter "idTask"
 *     security: [Authorization: []]
 *     parameters:
 *       - name: idTask
 *         in: query
 *         description: The ID of the task to update
 *         required: true
 *         type: string
 *         example: 626ccc5dca69e8e538dce690
 *     requestBody:
 *         description: Task object
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         title:
 *                             type: string
 *                             example: Buy Twitter
 *                         text:
 *                             type: string
 *                             example: This is a key task
 *                         timeEstimate:
 *                             type: number
 *                             example: 100
 *                         starTime:
 *                             type: number
 *                             example: 1651297373221
 *                         endTime:
 *                             type: number
 *                             example: 1651297373321
 *                         imageURL:
 *                             type: string
 *                             example: https://image.com/photo.jpg
 *                         completed:
 *                             type: boolean
 *                             example: false
 *     responses:
 *       200:
 *         description: Task edited
 *       400:
 *         description: Missing required info
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error. Returns an object with the error message
 */
router.put("/", authMiddleware, taskController.editTask);

/**
 * @swagger
 * /api/tasks:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Deletes the selected task
 *     security: [Authorization: []]
 *     parameters:
 *       - name: idTask
 *         in: query
 *         description: The ID of the task to update
 *         required: true
 *         type: string
 *         example: 626ccc5dca69e8e538dce690
 *     responses:
 *       200:
 *         description: Task deletd
 *       400:
 *         description: Missing required info
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error. Returns an object with the error message
 */
router.delete("/", authMiddleware, taskController.deleteTask);


/**
 * @swagger
 * /api/tasks/priority:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Changes the selected task's priority
 *     security: [Authorization: []]
 *     requestBody:
 *         description: Priority change request object. The property "type" only accepts the values "up" or "down"
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                      type: object
 *                      required:
 *                        - idTask
 *                        - type
 *                      properties:
 *                          idTask:
 *                              type: string
 *                              example: 626ccc5dca69e8e538dce690
 *                          type:
 *                              type: string
 *                              enum: [up, down]
 *                              example: up
 *     responses:
 *       201:
 *         description: Task priority changed
 *       400:
 *         description: Missing required info
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error. Returns an object with the error message
 */
router.post("/priority", authMiddleware, taskController.changePriority);

module.exports = router;