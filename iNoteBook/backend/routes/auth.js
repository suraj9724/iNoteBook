const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const jwt_screat = "SurajisABadBoy";
const fetchuser = require('../middleware/fetchuser');

//Route 1: Create a User using :post "/api/auth", don't require auth
router.post('/createuser',
    // express-validator middleware to validate the request body
    [body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password').isLength({ min: 5 }),
    ],
    // Callback function for the endpoint
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        // Create a new User using Post "/api/auth/createuser"instance.No login required
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json("User already exists");
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, jwt_screat);
            res.json({ authtoken });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error")
        }
    })
//Route 2: Authenticate a new User using Post "/api/auth/login".No login required
router.post('/login',
    // express-validator middleware to validate the request body
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cant be blank').exists(),
    // Callback function for the endpoint
    async (req, res) => {
        let success = false;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Invalid Email or Password" });
            }
            const passwordComp = await bcrypt.compare(password, user.password);

            if (!passwordComp) {
                success = false
                return res.status(400).json({ success, error: 'Password is incorrect' });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, jwt_screat);
            success = true;
            res.json({ success, authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error")
        }
    })
//Route 3: get lohggedin user details using "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})
module.exports = router;