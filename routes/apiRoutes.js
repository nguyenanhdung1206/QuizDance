const express = require("express");
const ClassRegistration = require("../models/classRegistration");
const LecturerClass = require("../models/lecturerClass");
const router = express.Router();
const nnid = require('nanoid');

const StudentController = require('../controllers/studentController');
const LecturerController = require('../controllers/lecturerController');
const SessionController = require('../controllers/sessionController');
const QuestionController = require('../controllers/questionController');
const RecordController = require('../controllers/recordController');
const RegistrationController = require('../controllers/registrationController');
const SessQuesController = require('../controllers/sessquesController');
const ClassController = require('../controllers/classController');

const Student = require("../models/student");
const SessionQuestion = require("../models/sessionQuestion");
const Question = require("../models/question");
const AttendanceRecord = require("../models/attendanceRecord");
const Session = require("../models/session");

//________STUDENT_________
// Get all students
router.get("/all-student", StudentController.getAllStudents);
// Get student by ID
router.get("/search-student/:id", StudentController.getStudentById);
// Create new students
router.post("/new-student", StudentController.addStudent);
// Delete a student by id
router.delete('/delete-student/:id', StudentController.deleteStudentById)
// Edit a student's info
router.put('/edit-student/:id', StudentController.editStudentById)

//________LECTURER_________
// Get all lecturers
router.get("/all-lecturer", LecturerController.getAllLecturers);
// Get lecturer by ID
router.get("/search-lecturer/:id", LecturerController.getLecturerById);
// Create new lecturer
router.post("/new-lecturer", LecturerController.addLecturer);
// Delete a lecturer by id
router.delete('/delete-lecturer/:id', LecturerController.deleteLecturerById);
// Edit a lecturer's info
router.put('/edit-lecturer/:id', LecturerController.editLecturerById);

//________SESSION_________
// Get all sessions
router.get("/all-session", SessionController.getAllSessions);
// Get session by ID
router.get("/search-session/:id", SessionController.getSessionById);
// Create new session
router.post("/new-session", SessionController.addSession);
// Delete a session by id
router.delete('/delete-session/:id', SessionController.deleteSessionById);
// Edit a session's info
router.put('/edit-session/:id', SessionController.editSessionById);

//________QUESTION_________
// Get all questions
router.get("/all-question", QuestionController.getAllQuestions);
// Get question by ID
router.get("/search-question/:id", QuestionController.getQuestionById);
// Create new question
router.post("/new-question", QuestionController.addQuestion);
// Delete a question by id
router.delete('/delete-question/:id', QuestionController.deleteQuestionById);
// Edit a question's info
router.put('/edit-question/:id', QuestionController.editQuestionById);

//________RECORD_________
// Get all records
router.get("/all-record", RecordController.getAllRecords);
// Get record by ID
router.get("/search-record/:id", RecordController.getRecordById);
// Create new record
router.post("/new-record", RecordController.addRecord);
// Delete a record by id
router.delete('/delete-record/:id', RecordController.deleteRecordById);
// Edit a record's info
router.put('/edit-record/:id', RecordController.editRecordById);

//________CLASS_________
// Get all classes
router.get("/all-class", ClassController.getAllClasses);
// Get class by ID
router.get("/search-class/:id", ClassController.getClassById);
// Create new class
router.post("/new-class", ClassController.addClass);
// Delete a class by id
router.delete('/delete-class/:id', ClassController.deleteClassById);
// Edit a class's info
router.put('/edit-class/:id', ClassController.editClassById);

//________REGISTRATION_________
// Get all records
router.get("/all-registration", RegistrationController.getAllRegistraions);
// Get record by ID
router.get("/search-registration/:id", RegistrationController.getRegistrationById);
// Create new record
router.post("/new-registration", RegistrationController.addRegistration);
// Delete a record by id
router.delete('/delete-registration/:id', RegistrationController.deleteRegistrationById);
// Edit a record's info
router.put('/edit-registration/:id', RegistrationController.editRegistrationById);

//________SESSION-QUESTION_________
// Get all session-question
router.get("/all-sq", SessQuesController.getAllSesQueses);
// Get session-question by ID
router.get("/search-sq/:id", SessQuesController.getSesQuesById);
// Create new session-question
router.post("/new-sq", SessQuesController.addSesQues);
// Delete a session-question by id
router.delete('/delete-sq/:id', SessQuesController.deleteSesQuesById);
// Edit a session-question's info
router.put('/edit-sq/:id', SessQuesController.editSesQuesById);

//________OTHER APIs_________
//Get student by class id
router.get("/search-student-class/:classid", (req,res) => {
    ClassRegistration.findAll({
        where: {
            classId: req.params.classid
        },
        include: [
          {model: Student, as: 'studentInfo', attributes: { exclude: ['id'] }},
          {model: LecturerClass, as: 'classInfo', attributes: { exclude: ['id'] }}
        ],
        order: [
          ['studentId', 'ASC']
        ],
    })
    .then(students => res.send(students))
    .catch((err) => console.log(err));
});

//Get student's list by class ID
router.get("/list-student/:classid", (req,res) => {
  Student.findAll({
      attributes:{ exclude: ['creatorId'] },
      include: [
        { model: ClassRegistration, 
          as: 'classRegistrations', 
          attributes: [],
          required: true,
          where: {
            classId: req.params.classid
          },
        },
      ],
      order: [
        ['id', 'ASC']
      ],
  })
  .then(students => res.send(students))
  .catch((err) => console.log(err));
});

// Get all questions from session's ID
router.get("/list-question/:sessionId", (req,res) => {
  Question.findAll({
      include: [
        { model: SessionQuestion, 
          as: 'sessionQuestions', 
          attributes: [],
          where: {
            sessionId: req.params.sessionId
          },
          required: true,
        },
      ],
      order: [
        ['id', 'ASC']
      ],
  })
  .then(questions => res.send(questions))
  .catch((err) => console.log(err));
});

// Attendance record by studentID
router.get("/attendance-record-student/:studentId", (req,res) => {
  AttendanceRecord.findAll({
      where: {
        studentId: req.params.studentId,
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [
        ['sessionId', 'ASC']
      ],
  })
  .then(recs => res.send(recs))
  .catch((err) => console.log(err));
});

// Attendance record by sessionID
router.get("/attendance-record-session/:sessionId", (req,res) => {
  AttendanceRecord.findAll({
      where: {
        sessionId: req.params.sessionId,
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [
        ['studentId', 'ASC']
      ],
  })
  .then(recs => res.send(recs))
  .catch((err) => console.log(err));
});

// Session by classID
router.get("/search-session-class/:classId", (req,res) => {
  Session.findAll({
      where: {
        classId: req.params.classId,
      },
      order: [
        ['id', 'ASC']
      ],
  })
  .then(sess => res.send(sess))
  .catch((err) => console.log(err));
});

// Create new class and add students at the same time
router.post("/new-class-student", async (req,res) => {
  const response = [];

  //Create class
  await LecturerClass.create({
    id: req.body.id,
    classType: req.body.classType,
    room: req.body.room,
    weekDay: req.body.weekDay,
    periodStart: req.body.periodStart,
    periodEnd: req.body.periodEnd,
    lecturerId: req.body.lecturerId,
  }).then(submitedClass => response.push(submitedClass)).catch((err) => response.push(err));

  //Add students to class
  const list = req.body.students;
  await Promise.all(list.map( async student => {
    await ClassRegistration.create({
      studentId: student,
      classId: req.body.id,
    }).then(submitedReg => response.push(submitedReg)).catch((err) => response.push(err))
  }))
  .then(() => {
    //Send response
    res.send(response);
  })
  .catch(err => res.send(err));
});

// Edit class and its student list
router.put("/edit-class-student/:classId", async (req,res) => {
  const response = [];

  // Edit class
  await LecturerClass.update({
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
        id: req.params.classId
    }
  }).then(() => console.log('Update successfully')).catch((err) => response.push(err));

  // Delete old list
  await ClassRegistration.destroy({
    where: {
      classId: req.params.classId,
    }
  }).then(() => console.log('Delete all successfully')).catch((err) => response.push(err))

  // Update student list
  const list = req.body.students;
  await Promise.all(list.map( async student => {
    await ClassRegistration.create({
      studentId: student,
      classId: req.body.id,
    }).then(submitedReg => response.push(submitedReg)).catch((err) => response.push(err))
  }))
  .then(() => {
    //Send response
    res.send(response);
  })
  .catch(err => res.send(err));
});

// Get class details + student list
router.get("/class-with-student/:classId", (req,res) => {
  LecturerClass.findAll({
    where:{
      id: req.params.classId,
    },
    include: [
      { model: Student, 
        as: 'students', 
        through: {
          attributes: [],
        }
      },
    ],
    order: [
      [{ model: Student, as: 'students'},'id', 'ASC']
    ]
  })
  .then(returnedClass => {
    res.send(returnedClass);
  })
  .catch(err => {
    res.send(err);
  })
});

// Create a session and adding questions
router.post("/create-session-question", async (req,res) => {
  const response = [];
  const sessId = nnid.nanoid(6);

  await Session.create({
    id: sessId,
    weekNo: req.body.weekNo,
    entryTimer: req.body.entryTimer,
    useQuiz: req.body.useQuiz,
    classId: req.body.classId,
  }).then(submitedSess => response.push(submitedSess)).catch((err) => response.push(err));

  const quizEnable = req.body.useQuiz;
  const list = req.body.questions;

  // Only create questions when quizEnable is true and the list of question is not empty
  if(quizEnable === true && list !== undefined){
    var currQuestionId;

    await Promise.all(list.map( async ques => {
      await Question.create({
        question: ques.question,
        answers: ques.answers,
        countdown: ques.countdown,
      }).then(submitedQues => {
        response.push(submitedQues)
        currQuestionId = submitedQues.id
      }).catch((err) => response.push(err));
      
      await SessionQuestion.create({
        sessionId: sessId,
        questionId: currQuestionId,
      }).then(submitedSQ => response.push(submitedSQ)).catch((err) => response.push(err));
    }))
    .then(() => {
      //Send response
      res.send(response);
    })
    .catch(err => res.send(err));
  }
  else
    res.send(response);
});

// Edit a session and adding questions
router.put("/edit-session-question/:sessionId", async (req,res) => {
  const response = [];

  await Session.update({
    weekNo: req.body.weekNo,
    entryTimer: req.body.entryTimer,
    useQuiz: req.body.useQuiz,
    classId: req.body.classId,
  },
  {
    where: {
        id: req.params.sessionId
    }
  }).then(() => console.log('Update successfully')).catch((err) => response.push(err));

  // Delete all current questions and relations with the session
  await SessionQuestion.findAll({
    where: {
      sessionId: req.params.sessionId
    }
  }).then(async returnedSQ => {
    await Promise.all(returnedSQ.map( async sq => {
      await Question.destroy({
        where: {
          id: sq.questionId,
        }
      }).then(() => {
        console.log('Delete successfully');
      }).catch((err) => response.push(err));
    }))
    .then(() => {
      console.log('Delete all successfully');
    })
    .catch(err => response.push(err));
  }).catch((err) => response.push(err));

  await SessionQuestion.destroy({
    where: {
      sessionId: req.params.sessionId
    }
  })
  .then(() => {
    console.log('Delete all successfully');
  })
  .catch(err => response.push(err));

  // If change to using quiz and adding questions
  const quizEnable = req.body.useQuiz;
  const list = req.body.questions;

  if(quizEnable === true && list !== undefined){
    var currQuestionId;

    await Promise.all(list.map( async ques => {
      await Question.create({
        question: ques.question,
        answers: ques.answers,
        countdown: ques.countdown,
      }).then(submitedQues => {
        response.push(submitedQues)
        currQuestionId = submitedQues.id
      }).catch((err) => response.push(err));
      
      await SessionQuestion.create({
        sessionId: req.params.sessionId,
        questionId: currQuestionId,
      }).then(submitedSQ => response.push(submitedSQ)).catch((err) => response.push(err));
    }))
    .then(() => {
      //Send response
      response.push("Update successfully");
      res.send(response);
    })
    .catch(err => {
      response.push(err);
      res.send(response);
    });
  }
  else
    res.send(response);
});

// Get session details + all of its questions
router.get("/session-with-questions/:sessionId", (req,res) => {
  Session.findAll({
    where:{
      id: req.params.sessionId,
    },
    include: [
      { model: Question, 
        as: 'questions', 
        through: {
          attributes: [],
        }
      },
    ],
  })
  .then(returnedSess => {
    res.send(returnedSess);
  })
  .catch(err => {
    res.send(err);
  })
});

module.exports = router;