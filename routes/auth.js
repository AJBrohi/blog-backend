const router = require('express').Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

//Register
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newAdmin = new Admin({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const admin = await newAdmin.save();
        res.status(200).json(admin);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Login
router.post("/login", async (req, res) => {
    try {
        const admin = await Admin.findOne({ username: req.body.username });
        !admin && res.status(400).json("Wrong Username");

        const validate = await bcrypt.compare(req.body.password, admin.password);
        !validate && res.status(400).json("Wrong Password");

        const { password, ...others } = admin._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router