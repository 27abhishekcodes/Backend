const ensureAuthenticated = require('../Middlewares/Auth');
const User = require('../Models/User');
const Module = require('../Models/Module');

const router = require('express').Router();


router.get('/', ensureAuthenticated, async (req, res) => {

    try {

        // get logged in user
        const user = await User.findById(req.user._id);


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        // find modules according to user category
        const modules = await Module.find({
            category: user.category
        });


        res.status(200).json(modules);


    } catch(err) {

        res.status(500).json({
            message:"Error fetching modules",
            error:err.message
        });

    }

});


module.exports = router;