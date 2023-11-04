const bcrypt = require("bcrypt");
const db = require("../database/database.js");
const { encode } = require("next-auth/jwt");
const dotenv = require('dotenv');
const { generateAccessToken } = require("../middlewares/authentication.js");
dotenv.config()

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       '200':
 *         description: Successful response with a list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error.
 */
const getAllUsers = (req, res) => {
    try {
        const getAllUsersQuery = "SELECT * FROM users";
        db.query(getAllUsersQuery, (err, data) => {
            return res.status(200).json(data);
        });
    } catch (error) {
        return res.status(500).send("Internal server error.");
    }
};

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login user
 *     description: Log in a user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       '200':
 *         description: Successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       '403':
 *         description: User with provided credentials does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: string 
 *       '400':
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
const loginUser = (req, res) => {
    if (!req.body.email && !req.body.password) return res.status(400).send("Bad request.");
    try {
        const checkIfUserExistQuery = "SELECT * FROM users WHERE email = ?";
        db.query(checkIfUserExistQuery, [req.body.email], (err, data) => {
            if (data.length === 0) {
                return res.status(404).json("User with that credentials does not exist, try again.");
            }
            else {
                bcrypt.compare(req.body.password, data[0].password, async function (err, isMatch) {
                    if (err) throw err;
                    else if (!isMatch) return res.status(404).json('User with that credentials does not exist, try again.');
                    else {
                        const token = generateAccessToken(req.body.email);

                        return res.cookie('jwt-token',
                            token, {
                            maxAge: 900000,
                            httpOnly: true
                        })
                            .status(200)
                            .json("Successfully logged in.");
                    }
                })
            }
        });
    } catch (error) {
        return res.status(500).send("Internal server error.");
    }
}

module.exports = { getAllUsers, loginUser };