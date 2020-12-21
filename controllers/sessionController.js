const Session = require('../models/session');
const nnid = require('nanoid');

exports.getAllSessions = (req,res) => {
    Session.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then(sess => res.send(sess)).catch((err) => res.send(err));
}

exports.addSession = (req, res) => {
    Session.create({
      id: nnid.nanoid(6),
      weekNo: req.body.weekNo,
      entryTimer: req.body.entryTimer,
      useQuiz: req.body.useQuiz,
      classId: req.body.classId,
    }).then(submitedSess => res.send(submitedSess)).catch((err) => res.send(err));
}

exports.deleteSessionById = (req,res) => {
    Session.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send('Delete successfully')).catch((err) => res.send(err));
}

exports.editSessionById = (req,res) => {
    Session.update(
    {
        weekNo: req.body.weekNo,
        entryTimer: req.body.entryTimer,
        useQuiz: req.body.useQuiz,
        classId: req.body.classId,
    }, 
    {
        where: {
            id: req.params.id
        }
    }).then(() => res.send('Update successfully')).catch((err) => res.send(err));
}

exports.getSessionById = (req,res) => {
    Session.findAll({
        where: {
            id: req.params.id
        },
        order: [
            ['id', 'ASC']
        ]
    }).then((sess) => res.send(sess)).catch((err) => res.send(err));
}

