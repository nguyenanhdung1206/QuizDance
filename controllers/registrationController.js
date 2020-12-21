const ClassRegistration = require('../models/classRegistration');

exports.getAllRegistraions = (req,res) => {
    ClassRegistration.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then(regs => res.send(regs)).catch((err) => res.send(err));
}

exports.addRegistration = (req, res) => {
    ClassRegistration.create({
      studentId: req.body.studentId,
      classId: req.body.classId,
    }).then(submitedReg => res.send(submitedReg)).catch((err) => res.send(err));
}

exports.deleteRegistrationById = (req,res) => {
    ClassRegistration.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send('Delete successfully')).catch((err) => res.send(err));
}

exports.editRegistrationById = (req,res) => {
    ClassRegistration.update(
    {
        studentId: req.body.studentId,
        classId: req.body.classId,
    }, 
    {
        where: {
            id: req.params.id
        }
    }).then(() => res.send('Update successfully')).catch((err) => res.send(err));
}

exports.getRegistrationById = (req,res) => {
    ClassRegistration.findAll({
        where: {
            id: req.params.id
        },
        order: [
            ['id', 'ASC']
        ]
    }).then((reg) => res.send(reg)).catch((err) => res.send(err));
}

