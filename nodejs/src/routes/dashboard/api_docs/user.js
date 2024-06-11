/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operations related to user
 * /api/dashboard/user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               address:
 *                 type: string
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
 *         description: Internal server error
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: entriesPerPage
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of entries per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search by (name)
 *     responses:
 *       '200':
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_results:
 *                       type: integer
 *                       description: Total number of results.
 *                       example: 3
 *                     found_results:
 *                       type: integer
 *                       description: Number of results found.
 *                       example: 3
 *                     page:
 *                       type: integer
 *                       description: Current page number.
 *                       example: 1
 *                     entries_per_page:
 *                       type: integer
 *                       description: Number of entries per page.
 *                       example: 5
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 *                           phone:
 *                             type: string
 *                           address:
 *                             type: string
 *                           gender:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *       '400':
 *         description: Invalid query parameters.
 *       '500':
 *         description: Internal server error
 * /api/dashboard/user/password:
 *   patch:
 *     summary: Update an user password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
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
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '201':
 *         description: The user password was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 errCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '409':
 *         description: Data already exists
 *       '500':
 *         description: Internal server error
 *
 * /api/dashboard/user/{id}:
 *   get:
 *     summary: Get user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       '200':
 *         description: Successfully retrieved user details.
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
 *                   example: Retrieving user detail
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         phone:
 *                           type: string
 *                         address:
 *                           type: string
 *                         gender:
 *                           type: string
 *       '400':
 *         description: Invalid user ID.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 *   patch:
 *     summary: Update a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               address:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 errCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '409':
 *         description: Data already exists
 *       '500':
 *         description: Internal server error
 *   delete:
 *     summary: Delete user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       201:
 *         description: The user was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 errCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
