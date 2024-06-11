/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operations related to authentication
 * /api/auth/login:
 *   post:
 *     summary: Authenticate User
 *     description: Authenticate a user for login.
 *     tags: [Auth]
 *     parameters:
 *       - in: header
 *         name: x-forwarded-for
 *         schema:
 *           type: string
 *         required: false
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user1@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       '200':
 *         description: User authenticated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 666406bc542d0019a35f80e2
 *                         name:
 *                           type: string
 *                           example: user one
 *                         email:
 *                           type: string
 *                           example: user1@gmail.com
 *                         phone:
 *                           type: string
 *                           example: 0987878789
 *                         address:
 *                           type: string
 *                           example: Ygn , Hledan
 *                         gender:
 *                           type: string
 *                           example: male
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: 2024-06-08T07:22:36.327Z
 *                     token:
 *                       type: string
 *                       description: Authentication token.
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjY0MDZiYzU0MmQwMDE5YTM1ZjgwZTIiLCJpYXQiOjE3MTc4NTU3NDMsImV4cCI6MTcxNzk0MjE0M30.9OAEIUtGqNvhf7dSBwKlOh6gpKF6sLSWDFUNZDuXc6g
 *       '400':
 *         description: Invalid request body or missing fields.
 *       '401':
 *         description: Unauthorized - Invalid credentials.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 *
 * /api/auth/register:
 *   post:
 *     summary: Register User
 *     description: Register a new user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: User 11
 *               email:
 *                 type: string
 *                 example: user11@gmail.com
 *               phone:
 *                 type: string
 *                 example: 09679882449
 *               password:
 *                 type: string
 *                 example: 1234
 *               gender:
 *                 type: string
 *                 example: male
 *               address:
 *                 type: string
 *                 example: Ygn, Ahlone
 *     responses:
 *       '200':
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                   example: true
 *                 errCode:
 *                   type: integer
 *                   description: Error code (if any).
 *                   example: 200
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: User registered successfully
 *       '400':
 *         description: Invalid request body or missing fields.
 *       '500':
 *         description: Internal server error.
 */
