const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    try {
      existsOrError(req.params.id, "subject does not exist!");

      let lessons = await knex("lesson")
        .where({ subject_id: req.params.id })
        .select("*");

      for (let lesson of lessons) {
        lesson.attendances = await knex("attendance")
          .innerJoin("student", "student.student_id", "attendance.student_id")
          .where("lesson_id", lesson.lesson_id)
          .select(
            "attendance.attendance_id",
            "attendance.attendance_attendance",
            "student.student_name"
          );

        if (lesson.attendances.length === 0) {
          const { clas_id } = await knex("subject")
            .where("subject_id", req.params.id)
            .first();

          if (clas_id) {
            const students = await knex("student")
              .where("clas_id", clas_id)
              .select("student_id");

            for (let student of students) {
              await knex("attendance").insert({
                student_id: student.student_id,
                lesson_id: lesson.lesson_id,
                attendance_attendance: false,
              });
            }

            lesson.attendances = await knex("attendance")
              .innerJoin(
                "student",
                "student.student_id",
                "attendance.student_id"
              )
              .where("lesson_id", lesson.lesson_id)
              .select(
                "attendance.attendance_id",
                "attendance.attendance_attendance",
                "student.student_name"
              );
          }
        }
      }

      res.json(lessons);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "attendance does not exist!");

      const removeAttendance = await knex("attendance")
        .del()
        .where({ attendance_id: req.params.id });
      existsOrError(removeAttendance, "attendance not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const attendance = req.body;
    try {
      const newAttendance = await knex("attendance").insert(attendance);
      res.json(newAttendance);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const attendance = req.body;
    const attendance_id = req.params.id;
    try {
      existsOrError(attendance_id, "attendance does not exist!");

      const attAttendance = await knex("attendance")
        .update(attendance)
        .where({ attendance_id: attendance_id });
      existsOrError(attAttendance, "attendance not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, post, put, remove };
};
