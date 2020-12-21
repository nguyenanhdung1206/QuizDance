const Lecturer = require('../models/lecturer');

exports.getAllLecturers = (req,res) => {
    Lecturer.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then(lects => res.send(lects)).catch((err) => res.send(err));
}

exports.addLecturer = (req, res) => {
    Lecturer.create({
      id: req.body.id,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
    }).then(submitedLecturer => res.send(submitedLecturer)).catch((err) => res.send(err));
}

exports.deleteLecturerById = (req,res) => {
    Lecturer.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send('Delete successfully')).catch((err) => res.send(err));
}

exports.editLecturerById = (req,res) => {
    Lecturer.update(
    {
        id: req.body.id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
    }, 
    {
        where: {
            id: req.params.id
        }
    }).then(() => res.send('Update successfully')).catch((err) => res.send(err));
}

exports.getLecturerById = (req,res) => {
    Lecturer.findAll({
        where: {
            id: req.params.id
        },
        order: [
            ['id', 'ASC']
        ]
    }).then((lect) => res.send(lect)).catch((err) => res.send(err));
}

