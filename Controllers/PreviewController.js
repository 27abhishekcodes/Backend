const Preview = require('../Models/Preview');
const { Document, Packer, Paragraph, TextRun } = require("docx");


// Add question to preview panel
const addQuestionToPreview = async (req, res) => {

    try {

        console.log("Logged user:", req.user);

        const { questionId } = req.body;


        if (!questionId) {
            return res.status(400).json({
                success: false,
                message: "Question ID is required"
            });
        }


        let preview = await Preview.findOne({
            userId: req.user._id
        });


        if (!preview) {

            preview = new Preview({
                userId: req.user._id,
                questions: [questionId]
            });

        } else {

            const alreadyAdded = preview.questions.some(
                id => id.toString() === questionId
            );


            if (alreadyAdded) {
                return res.status(409).json({
                    success: false,
                    message: "Question already added to preview"
                });
            }


            preview.questions.push(questionId);

        }


        await preview.save();


        res.status(200).json({
            success: true,
            message: "Question added to preview"
        });


    } catch (err) {

        console.log("PREVIEW ADD ERROR:", err);

        res.status(500).json({
            success: false,
            message: "Error adding question",
            error: err.message
        });

    }
};



// Get user's preview questions
const getPreview = async (req, res) => {

    try {

        const preview = await Preview.findOne({
            userId: req.user._id
        })
        .populate('questions');


        if (!preview) {

            return res.status(200).json({
                questions: []
            });

        }


        res.status(200).json({
            questions: preview.questions
        });


    } catch (err) {

        console.log("PREVIEW FETCH ERROR:", err);

        res.status(500).json({
            success: false,
            message: "Error fetching preview",
            error: err.message
        });

    }
};



// Remove question from preview
const removeFromPreview = async (req, res) => {

    try {

        const { questionId } = req.params;


        const preview = await Preview.findOne({
            userId: req.user._id
        });


        if (!preview) {

            return res.status(404).json({
                success:false,
                message:"Preview not found"
            });

        }


        preview.questions = preview.questions.filter(
            id => id.toString() !== questionId
        );


        await preview.save();


        res.status(200).json({
            success:true,
            message:"Question removed from preview"
        });


    } catch(err) {

        console.log("PREVIEW DELETE ERROR:", err);

        res.status(500).json({
            success:false,
            message:"Error removing question",
            error:err.message
        });

    }
};

const downloadPreviewDocx = async (req, res) => {
    try {

        const preview = await Preview.findOne({
            userId: req.user._id
        }).populate("questions");

        if (!preview || preview.questions.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No preview questions found."
            });
        }

        const children = [];

        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Preview Questions",
                        bold: true,
                        size: 32
                    })
                ]
            })
        );

        children.push(new Paragraph(""));

        preview.questions.forEach((question, index) => {

            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${index + 1}. ${question.questionText}`,
                            bold: true
                        })
                    ]
                })
            );

            question.options.forEach(option => {
                children.push(
                    new Paragraph({
                        text: `○ ${option}`,
                        bullet: {
                            level: 0
                        }
                    })
                );
            });

            children.push(new Paragraph(""));
        });

        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children
                }
            ]
        });

        const buffer = await Packer.toBuffer(doc);

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=PreviewQuestions.docx"
        );

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );

        res.send(buffer);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Error downloading DOCX",
            error: err.message
        });

    }
};

module.exports = {
    addQuestionToPreview,
    getPreview,
    removeFromPreview,
    downloadPreviewDocx
};


