const multer = require("multer");
const multerConfig = require("../config/multer");
const multerConfigImg = require("../config/multerQuestion");

module.exports = (app) => {
  //login
  app.route("/login").get(app.api.login.get).post(app.api.login.post);

  app
    .route("/login/:id")
    .get(app.api.login.getById)
    .put(app.api.login.put)
    .delete(app.api.login.remove);

  app.route("/auth").post(app.api.loginAuth.signIn);
  app.route("/token").post(app.api.loginAuth.validateToken);

  //Coordination
  app.route("/coordination/series").get(app.api.coordination.series.get);

  app
    .route("/coordination/class")
    .get(app.api.coordination.clas.get)
    .post(app.api.coordination.clas.post);

  app
    .route("/coordination/class/:id")
    .get(app.api.coordination.clas.getById)
    .put(app.api.coordination.clas.put)
    .delete(app.api.coordination.clas.remove);

  app
    .route("/coordination/genericSubject")
    .get(app.api.coordination.genericSubject.get)
    .post(app.api.coordination.genericSubject.post);

  app
    .route("/coordination/genericSubject/:id")
    .get(app.api.coordination.genericSubject.getById)
    .put(app.api.coordination.genericSubject.put)
    .delete(app.api.coordination.genericSubject.remove);

  app
    .route("/coordination/student")
    .get(app.api.coordination.student.get)
    .post(app.api.coordination.student.post);

  app
    .route("/coordination/student/:id")
    .get(app.api.coordination.student.getById)
    .put(app.api.coordination.student.put)
    .delete(app.api.coordination.student.remove);

  app
    .route("/coordination/subject")
    .get(app.api.coordination.subject.get)
    .post(app.api.coordination.subject.post);

  app
    .route("/coordination/subject/:id")
    .get(app.api.coordination.subject.getById)
    .put(app.api.coordination.subject.put)
    .delete(app.api.coordination.subject.remove);

  app
    .route("/coordination/teacher")
    .get(app.api.coordination.teacher.get)
    .post(app.api.coordination.teacher.post);

  app
    .route("/coordination/teacher/:id")
    .get(app.api.coordination.teacher.getById)
    .put(app.api.coordination.teacher.put)
    .delete(app.api.coordination.teacher.remove);

  //Student
  app.route("/student/answer").post(app.api.student.answer.post);

  app
    .route("/student/answer/:id")
    .get(app.api.student.answer.get)
    .put(app.api.student.answer.put)
    .delete(app.api.student.answer.remove);

  app
    .route("/student/exercise/:id")
    .get(app.api.student.exercise.getExercise)
    .get(app.api.student.exercise.getQuestion);

  app.route("/student/forumAnswer").post(app.api.student.forumAnswer.post);

  app
    .route("/student/forumAnswer/:id")
    .get(app.api.student.forumAnswer.get)
    .put(app.api.student.forumAnswer.put)
    .delete(app.api.student.forumAnswer.remove);

  app.route("/student/forumTopic").post(app.api.student.forumTopic.post);

  app
    .route("/student/forumTopic/:id")
    .get(app.api.student.forumTopic.get)
    .put(app.api.student.forumTopic.put)
    .delete(app.api.student.forumTopic.remove);

  app.route("/student/multimedia/:id").get(app.api.student.multimedia.get);
  app
    .route("/student/all-multimedia/:id")
    .get(app.api.student.multimedia.getByClass);

  app.route("/student/student/:id").get(app.api.student.student.getById);

  app.route("/student/subject/:id").get(app.api.student.subject.get);

  app
    .route("/student/supportMaterial/:id")
    .get(app.api.student.supportMaterial.get);
  app
    .route("/student/all-supportMaterial/:id")
    .get(app.api.student.supportMaterial.getByClass);

  //Teacher
  app.route("/teacher/attendance").post(app.api.teacher.attendance.post);

  app
    .route("/teacher/attendance/:id")
    .get(app.api.teacher.attendance.get)
    .put(app.api.teacher.attendance.put)
    .delete(app.api.teacher.attendance.remove);

  app.route("/teacher/bulletin").post(app.api.teacher.bulletin.post);

  app
    .route("/teacher/bulletin/:id")
    .get(app.api.teacher.bulletin.get)
    .put(app.api.teacher.bulletin.put)
    .delete(app.api.teacher.bulletin.remove);

  app.route("/teacher/exercise").post(app.api.teacher.exercise.post);

  app
    .route("/teacher/exercise/:id")
    .get(app.api.teacher.exercise.get)
    .put(app.api.teacher.exercise.put)
    .delete(app.api.teacher.exercise.remove);

  app
    .route("/teacher/exerciseQuestion")
    .post(app.api.teacher.exerciseQuestion.post);

  app
    .route("/teacher/exerciseQuestion/:id")
    .get(app.api.teacher.exerciseQuestion.get)
    .put(app.api.teacher.exerciseQuestion.put)
    .delete(app.api.teacher.exerciseQuestion.remove);

  app.route("/teacher/forumAnswer").post(app.api.teacher.forumAnswer.post);

  app
    .route("/teacher/forumAnswer/:id")
    .get(app.api.teacher.forumAnswer.get)
    .put(app.api.teacher.forumAnswer.put)
    .delete(app.api.teacher.forumAnswer.remove);

  app.route("/teacher/forumTopic").post(app.api.teacher.forumTopic.post);

  app
    .route("/teacher/forumTopic/:id")
    .get(app.api.teacher.forumTopic.get)
    .put(app.api.teacher.forumTopic.put)
    .delete(app.api.teacher.forumTopic.remove);

  app.route("/teacher/all-multimedia/:id").get(app.api.teacher.multimedia.get);
  app.route("/teacher/multimedia").post(app.api.teacher.multimedia.post);

  app
    .route("/teacher/multimedia/:id")
    .get(app.api.teacher.multimedia.get)
    .put(app.api.teacher.multimedia.put)
    .delete(app.api.teacher.multimedia.remove);

  app
    .route("/teacher/question")
    .post(
      multer(multerConfigImg).single("file"),
      app.api.teacher.question.post
    );

  app
    .route("/teacher/question/:id")
    .get(app.api.teacher.question.get)
    .put(app.api.teacher.question.put)
    .delete(app.api.teacher.question.remove);

  app.route("/teacher/scrap").post(app.api.teacher.scrap.post);

  app
    .route("/teacher/scrap/:id")
    .get(app.api.teacher.scrap.get)
    .put(app.api.teacher.scrap.put)
    .delete(app.api.teacher.scrap.remove);

  app.route("/teacher/subject/:id").get(app.api.teacher.subject.get);

  app.route("/teacher/getSubject/:id").get(app.api.teacher.subject.getById);

  app
    .route("/teacher/allSupportMaterials/:id")
    .get(app.api.teacher.supportMaterial.get);
  app
    .route("/teacher/supportMaterial")
    .post(
      multer(multerConfig).single("file"),
      app.api.teacher.supportMaterial.post
    );

  app
    .route("/teacher/supportMaterial/:id")
    .get(app.api.teacher.supportMaterial.get)
    .delete(app.api.teacher.supportMaterial.remove);
};
