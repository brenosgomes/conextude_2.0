const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    try {
      existsOrError(req.params.id, "subject does not exist!");

      const student = await knex("student")
        .where({ student_id: req.params.id })
        .first();
      existsOrError(student, "student does not exist!");

      const getIdSubject = await knex("subject")
        .where({ clas_id: student.clas_id })
        .innerJoin(
          "genericSubject",
          "genericSubject.genericSubject_id",
          "subject.genericSubject_id"
        )
        .select("*");

      res.json(getIdSubject);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get };
};
