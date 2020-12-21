const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const PORT = process.env.PORT || 5000;

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//DB
const db = require('./config/database');

//CORS
app.use(cors())

const Student = require('./models/student');
const LecturerClass = require('./models/lecturerClass');
const Lecturer = require('./models/lecturer');
const Session = require('./models/session');
const AttendanceRecord = require('./models/attendanceRecord');
const ClassRegistration = require('./models/classRegistration');
const Question = require('./models/question');
const SessionQuestion = require('./models/sessionQuestion');
const { type } = require("os");

// Lecturer creates students
Lecturer.hasMany(Student, { foreignKey: 'creatorId' });
Student.belongsTo(Lecturer, { foreignKey: 'creatorId' });
// Lecturer creates classes
Lecturer.hasMany(LecturerClass, { foreignKey: 'lecturerId' })
LecturerClass.belongsTo(Lecturer, { foreignKey: 'lecturerId' })
// Class has many students and vice versa
LecturerClass.belongsToMany(Student, { through: ClassRegistration, foreignKey: 'classId' })
Student.belongsToMany(LecturerClass, { through: ClassRegistration, foreignKey: 'studentId' })
ClassRegistration.belongsTo(LecturerClass, { as: 'classInfo', foreignKey: 'classId' });
LecturerClass.hasMany(ClassRegistration, { foreignKey: 'classId' });
ClassRegistration.belongsTo(Student, { as:'studentInfo', foreignKey: 'studentId' });
Student.hasMany(ClassRegistration, { foreignKey: 'studentId' });
// Class has many sessions
LecturerClass.hasMany(Session, { foreignKey: 'classId' })
Session.belongsTo(LecturerClass, { foreignKey: 'classId' })
// Session has many questions
Session.belongsToMany(Question, { through: SessionQuestion, foreignKey: 'sessionId', })
Question.belongsToMany(Session, { through: SessionQuestion, foreignKey: 'questionId' })
SessionQuestion.belongsTo(Session, { as: 'session', foreignKey: 'sessionId' });
Session.hasMany(SessionQuestion, { foreignKey: 'sessionId' });
SessionQuestion.belongsTo(Question, { as:'content', foreignKey: 'questionId' });
Question.hasMany(SessionQuestion, { foreignKey: 'questionId' });
// Check attendance/points of each session
Session.belongsToMany(Student, { through: AttendanceRecord, foreignKey: 'sessionId'  });
Student.belongsToMany(Session, { through: AttendanceRecord, foreignKey: 'studentId'  });
AttendanceRecord.belongsTo(Session, { as: 'session', foreignKey: 'sessionId' });
Session.hasMany(AttendanceRecord, { foreignKey: 'sessionId' });
AttendanceRecord.belongsTo(Student, { as:'student', foreignKey: 'studentId' });
Question.hasMany(AttendanceRecord, { foreignKey: 'studentId' });

app.use('/api', require('./routes/apiRoutes'));

app.get('/', (req,res) => res.send('INDEX'));

//Socket io connection and handling
// const server = require('http').createServer(app);
// const socket = require('socket.io');

db.sync().then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Listening on: http://localhost:${PORT}`);
    });

    const socket = require('socket.io');
    const io = socket(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    io.on("connection", socket => {
      console.log("A user has connected");

      //Query and show leaderboard by session's ID
      const showLeaderboard = (id) => {
        AttendanceRecord.findAll({
          where: {
            sessionId: id
          },
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        .then(sessionLeaderboard => {
          socket.emit("Return leaderboard",sessionLeaderboard);
        })
        .catch(err => socket.emit("Error leaderboard",err));
      }

      //Show leaderboard on demand
      socket.on("Show leaderboard", sessionId => showLeaderboard(sessionId));

      //Done quiz, save data and show leaderboard
      socket.on("Done quiz", record => {
        AttendanceRecord.create({
          attendance: record.attendance,
          quizPts: record.quizPts,
          sessionId: record.sessionId,
          studentId: record.studentId,
        })
        .then(rec => showLeaderboard(rec.sessionId))
        .catch(err => socket.emit("Error submit quiz",err));
      })
    })

});



  

