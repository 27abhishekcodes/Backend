const router = require('express').Router();
const ensureAuthenticated = require('../Middlewares/Auth');

const {
    addQuestionToPreview,
    getPreview,
    removeFromPreview,
    downloadPreviewDocx
} = require('../Controllers/PreviewController');


router.post('/', ensureAuthenticated, addQuestionToPreview);

router.get('/', ensureAuthenticated, getPreview);

router.delete('/:questionId', ensureAuthenticated, removeFromPreview);

router.get(
    "/download-docx",
    ensureAuthenticated,
    downloadPreviewDocx
);


module.exports = router;