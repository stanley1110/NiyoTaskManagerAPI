const express = require("express");
const router = express.Router();
userservice = require("../service/userService");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *           - name
 *           - email
 *           - password
 *       properties:
 *           name:
 *             type: string
 *             description: name of user
 *           email:
 *              type: string
 *              description: email of user
 *           password:
 *               type: string
 *               description: password of user
 *       example:
 *         name: stanley moore
 *         email: edohemeka2@gmail.com
 *         password: 123steve
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: user management API
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json :
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *            properties:
 *               name:
 *                  type: string
 *                  description: name of user
 *               email:
 *                  type: string
 *                  description: email of user
 *               password:
 *                  type: string
 *                  description: password of user
 *     responses:
 *      201:
 *        description: User Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */
router.post("/register", userservice.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: login
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json :
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *               email:
 *                  type: string
 *                  description: email of user
 *               password:
 *                  type: string
 *                  description: password of user
 *     responses:
 *      200:
 *        description: User Logged in
 *      409:
 *        description: Conflict
 *      404:
 *        description: User Not Found
 */
router.post("/login", userservice.login);

module.exports = router;
