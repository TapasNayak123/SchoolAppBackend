const MarksModel = require('../model/marks.model');
const eventHandler  = require('../util/WriteFileToCSV');


exports.addMarks = async (req, res) => {
    try {
        const isMarksAdded = await MarksModel.findOne({ studentId: req.studentId });
        if (!isMarksAdded) {
            const addMarks = new MarksModel({
                "studentId": req.studentId,
                "subjects": req.body.subjects
            })
            const marksAdded = await addMarks.save();
            if (!marksAdded) {
                return res.status(401).json({
                    "msg": "There is some error while adding marks !!"
                })
            } else {
                eventHandler.emit('onWriteData',isMarksAdded)
                return res.status(201).json({
                    "msg": "Marks Added successfully",
                    "data": marksAdded
                })
            }
        } else {
            const updateMarks = await MarksModel.updateOne({ studentId: req.studentId }, { subjects: req.body.subjects })
            eventHandler.emit('onWriteData', isMarksAdded)
            return res.status(201).json({
                "msg": "User Added successfully !!!",
                "data": isMarksAdded
            })
        }

    } catch (error) {
        return res.status(401).json({
            "error": error
        })
    }
}