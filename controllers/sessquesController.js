const SessionQuestion = require('../models/sessionQuestion');

exports.getAllSesQueses = (req,res) => {
    SessionQuestion.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then(sesqueses => res.send(sesqueses)).catch((err) => res.send(err));
}

exports.addSesQues = (req, res) => {
    SessionQuestion.create({
      sessionId: req.body.sessionId,
      questionId: req.body.questionId,
    }).then(submitedSQ => res.send(submitedSQ)).catch((err) => res.send(err));
}

exports.deleteSesQuesById = (req,res) => {
    SessionQuestion.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send('Delete successfully')).catch((err) => res.send(err));
}

exports.editSesQuesById = (req,res) => {
    SessionQuestion.update(
    {
        questionId: req.body.questionId,
        sessionId: req.body.sessionId
    }, 
    {
        where: {
            id: req.params.id
        }
    }).then(() => res.send('Update successfully')).catch((err) => res.send(err));
}

exports.getSesQuesById = (req,res) => {
    SessionQuestion.findAll({
        where: {
            id: req.params.id
        },
        order: [
            ['id', 'ASC']
        ]
    }).then((sesques) => res.send(sesques)).catch((err) => res.send(err));
}

