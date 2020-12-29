const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    try {
      existsOrError(req.params.id, "subject does not exist!");

      const getIdSubject = await knex("subject")
        .where({ teacher_id: req.params.id })
        .join("clas", "clas.clas_id", "subject.clas_id")
        .join(
          "genericSubject",
          "genericSubject.genericSubject_id",
          "subject.genericSubject_id"
        )
        .join("series", "series.series_id", "clas.series_id")
        .select("*");
      existsOrError(getIdSubject, "subjects not found");

      res.status(200).json(getIdSubject);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const getById = async (req, res) => {
    try {
      existsOrError(req.params.id, "subject does not exist!");

      const getIdSubject = await knex("subject")
        .where({ subject_id: req.params.id })
        .first();
      existsOrError(getIdSubject, "subject not found");

      res.status(200).json(getIdSubject);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, getById };
};
