const Question = require('../models/question');

exports.getAllQuestions = (req,res) => {
    Question.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then(ques => res.send(ques)).catch((err) => res.send(err));
}

exports.addQuestion = (req, res) => {
    Question.create({
      question: req.body.question,
      answers: req.body.answers,
      countdown: req.body.countdown,
    }).then(submitedQues => res.send(submitedQues)).catch((err) => res.send(err));
}

exports.deleteQuestionById = (req,res) => {
    Question.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send('Delete successfully')).catch((err) => res.send(err));
}

exports.editQuestionById = (req,res) => {
    Question.update(
    {
        question: req.body.question,
        answers: req.body.answers,
        countdown: req.body.countdown,
    }, 
    {
        where: {
            id: req.params.id
        }
    }).then(() => res.send('Update successfully')).catch((err) => res.send(err));
}

exports.getQuestionById = (req,res) => {
    Question.findAll({
        where: {
            id: req.params.id
        },
        order: [
            ['id', 'ASC']
        ]
    }).then((ques) => res.send(ques)).catch((err) => res.send(err));
}

