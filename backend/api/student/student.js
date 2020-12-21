const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

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

  return { getById };
};
