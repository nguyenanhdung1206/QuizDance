const AttendanceRecord = require('../models/attendanceRecord');

exports.getAllRecords = (req,res) => {
    AttendanceRecord.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then(records => res.send(records)).catch((err) => res.send(err));
}

exports.addRecord = (req, res) => {
    AttendanceRecord.create({
      attendance: req.body.attendance,
      quizPts: req.body.quizPts,
      sessionId: req.body.sessionId,
      studentId: req.body.studentId,
    }).then(submitedRecord => res.send(submitedRecord)).catch((err) => res.send(err));
}

exports.deleteRecordById = (req,res) => {
    AttendanceRecord.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send('Delete successfully')).catch((err) => res.send(err));
}

exports.editRecordById = (req,res) => {
    AttendanceRecord.update(
    {
        attendance: req.body.attendance,
        quizPts: req.body.quizPts,
        sessionId: req.body.sessionId,
        studentId: req.body.studentId,
    }, 
    {
        where: {
            id: req.params.id
        }
    }).then(() => res.send('Update successfully')).catch((err) => res.send(err));
}

exports.getRecordById = (req,res) => {
    AttendanceRecord.findAll({
        where: {
            id: req.params.id
        },
        order: [
            ['id', 'ASC']
        ]
    }).then((records) => res.send(records)).catch((err) => res.send(err));
}

