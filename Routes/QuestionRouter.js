const ensureAuthenticated = require('../Middlewares/Auth');
const Question = require('../Models/Question');

const router = require('express').Router();


// Get questions of selected module
router.get('/:moduleId', ensureAuthenticated, async (req, res) => {

    try {

        const moduleId = req.params.moduleId;

        const questions = await Question.find({
            moduleId: moduleId
        })
        .limit(20)
        .select('-correctAnswer');


        res.status(200).json(questions);


    } catch (err) {

        res.status(500).json({
            message: "Error fetching questions",
            error: err.message
        });

    }

});


module.exports = router;