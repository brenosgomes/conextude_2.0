const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    const student = await knex("student")
      .innerJoin("clas", "clas.clas_id", "student.clas_id")
      .select("*");
    return res.json(student);
  };

  const getById = async (req, res) => {
    try {
      existsOrError(req.params.id, "student does not exist!");

      const getIdStudent = await knex("student")
        .where({ student_id: req.params.id })
        .first();
      existsOrError(getIdStudent, "student not found");

      res.status(200).json(getIdStudent);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "student does not exist!");

      const removeStudent = await knex("student")
        .del()
        .where({ student_id: req.params.id });
      existsOrError(removeStudent, "student not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const student = req.body;
    try {
      const newStudent = await knex("student").insert(student);
      res.json(newStudent);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const student = req.body;
    const student_id = req.params.id;
    try {
      existsOrError(student_id, "student does not exist!");

      const attStudent = await knex("student")
        .update(student)
        .where({ student_id: student_id });
      existsOrError(attStudent, "student not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, getById, post, put, remove };
};
