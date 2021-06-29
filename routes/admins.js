const router = require('express').Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

//Update
router.put("/:id", async (req, res) => {
    if (req.body.userId == req.params.id) {
        try {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }
            res.status(200).json(admin);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json('Its not your ID');
    }

})

//Delete

module.exports = router