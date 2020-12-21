const LecturerClass = require('../models/lecturerClass');

exports.getAllClasses = (req,res) => {
    LecturerClass.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then(classes => res.send(classes)).catch((err) => res.send(err));
}

exports.addClass = (req, res) => {
    LecturerClass.create({
      id: req.body.id,
      classType: req.body.classType,
      room: req.body.room,
      weekDay: req.body.weekDay,
      periodStart: req.body.periodStart,
      periodEnd: req.body.periodEnd,
      lecturerId: req.body.lecturerId,
    }).then(submitedClass => res.send(submitedClass)).catch((err) => res.send(err));
}

exports.deleteClassById = (req,res) => {
    LecturerClass.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send('Delete successfully')).catch((err) => res.send(err));
}

exports.editClassById = (req,res) => {
    LecturerClass.update(
    {
        id: req.body.id,
        classType: req.body.classType,
        room: req.body.room,
        weekDay: req.body.weekDay,
        periodStart: req.body.periodStart,
        periodEnd: req.body.periodEnd,
        lecturerId: req.body.lecturerId,
    }, 
    {
        where: {
            id: req.params.id
        }
    }).then(() => res.send('Update successfully')).catch((err) => res.send(err));
}

exports.getClassById = (req,res) => {
    LecturerClass.findAll({
        where: {
            id: req.params.id
        },
        order: [
            ['id', 'ASC']
        ],
    }).then((classes) => res.send(classes)).catch((err) => res.send(err));
}

