const router = require('express').Router();
const Admin = require('../models/Admin');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

//Update
router.put("/:id", async (req, res) => {
    if (req.body.userId == req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id,
                { $set: req.body },
                { new: true });
            res.status(200).json(updatedAdmin);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json('Its not your ID');
    }

})

//Delete
router.delete("/:id", async (req, res) => {
    if (req.body.userId == req.params.id) {
        try {
            const admin = await Admin.findById(req.params.id);

            try {
                await Post.deleteMany({ username: admin.username });
                await Admin.findByIdAndDelete(req.params.id)
                res.status(200).json("Deleted");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("Not Found");
        }
    } else {
        res.status(401).json('Its not your ID');
    }

})

//Get Admins
router.get('/:id', async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        const { password, ...others } = admin._doc
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router