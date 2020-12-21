const Student = require('../models/student');

exports.getAllStudents = (req,res) => {
    Student.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then(students => res.send(students)).catch((err) => res.send(err));
}

exports.addStudent = (req, res) => {
    Student.create({
      id: req.body.id,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      creatorId: req.body.creatorId,
    }).then(submitedStudent => res.send(submitedStudent)).catch((err) => res.send(err));
}

exports.deleteStudentById = (req,res) => {
    Student.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send('Delete successfully')).catch((err) => res.send(err));
}

exports.editStudentById = (req,res) => {
    Student.update(
    {
        id: req.body.id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        creatorId: req.body.creatorId,
    }, 
    {
        where: {
            id: req.params.id
        }
    }).then(() => res.send('Update successfully')).catch((err) => res.send(err));
}

exports.getStudentById = (req,res) => {
    Student.findAll({
        where: {
            id: req.params.id
        },
        order: [
            ['id', 'ASC']
        ]
    }).then((student) => res.send(student)).catch((err) => res.send(err));
}

