const express = require("express");
const router = express.Router();
taskService = require("../service/taskService");
const authenticateToken = require("../helper/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *           - task
 *           - description
 *           - completed
 *       properties:
 *           name:
 *               task:
 *                  type: string
 *                  description: name of task
 *               description:
 *                  type: string
 *                  description: description of task
 *               completed:
 *                  type: boolean
 *                  description: task status
 *       example:
 *         task: Shopping task
 *         description: Shopping for groceries
 *         completed: false
 */

/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: Task management API
 */

/**
 * @swagger
 * /tasks/createTask:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags: [Tasks]
 *     summary: Create a task
 *     requestBody:
 *      required: true
 *      content:
 *        application/json :
 *          schema:
 *            type: object
 *            required:
 *              - task
 *              - description
 *              - completed
 *            properties:
 *               task:
 *                  type: string
 *                  description: name of task
 *               description:
 *                  type: string
 *                  description: description of task
 *     responses:
 *      201:
 *        description: Task was created successfully
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */
router.post("/createTask", authenticateToken, taskService.createTask);

/**
 * @swagger
 * /tasks/getAllTasks:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags: [Tasks]
 *     summary: get all tasks
 *     responses:
 *      200:
 *        description: The list of the books
 *        content:
 *          application/json :
 *           schema:
 *            type: array
 *            items:
 *               $ref: '#/components/schemas/Task'
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */
router.get("/getAllTasks", authenticateToken, taskService.getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags: [Tasks]
 *     summary: get task by id
 *     parameters:
 *      - in: path
 *        name: id   # Note the name is the same as in the path
 *        schema:
 *          type: string
 *          required: true
 *          description: task id
 *     responses:
 *      200:
 *        description: fetched task by id
 *        content:
 *          application/json :
 *           schema:
 *            type: object
 *            items:
 *               $ref: '#/components/schemas/Task'
 *      409:
 *        description: Conflict
 *      404:
 *        description:  the requested task was Not Found
 */
router.get("/:id", authenticateToken, taskService.getTasksbyId);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags: [Tasks]
 *     summary: update task by id
 *     parameters:
 *      - in: path
 *        name: id   # Note the name is the same as in the path
 *        schema:
 *          type: string
 *          required: true
 *          description: the task id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json :
 *            schema:
 *              type: object
 *              required:
 *                - task
 *                - description
 *                - completed
 *              properties:
 *                 task:
 *                   type: string
 *                   description: name of task
 *                 description:
 *                   type: string
 *                   description: description of task
 *                 completed:
 *                   type: boolean
 *                   description: task status
 *     responses:
 *      200:
 *        description: THe task was updated
 *      409:
 *        description: Conflict
 *      404:
 *        description: the requested task was Not Found
 */
router.put("/:id", authenticateToken, taskService.updateTaskbyId);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags: [Tasks]
 *     summary: delete task by id
 *     parameters:
 *      - in: path
 *        name: id   # Note the name is the same as in the path
 *        schema:
 *          type: string
 *          required: true
 *          description: task id
 *     responses:
 *      200:
 *        description: deleted task by id
 *      409:
 *        description: Conflict
 *      404:
 *        description:  the requested task was Not Found
 */
router.delete("/:id", authenticateToken, taskService.deleteTaskbyId);

module.exports = router;
