const ensureAuthenticated = require('../Middlewares/Auth');
const User = require('../Models/User'); // <-- add this

const router = require('express').Router();

router.get('/', ensureAuthenticated, async (req, res) => {
    console.log("working ffjggjj")
    try {
        const users = await User.find({ name: { $ne: "Admin" } })
    .select('-password');

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching users",
            error: err.message
        });
    }
});

module.exports = router;