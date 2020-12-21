const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    try {
      existsOrError(req.params.id, "multimedia does not exist!");

      const getIdMultimedia = await knex("multimedia")
        .where({ subject_id: req.params.id })
        .select("*");

      res.json(getIdMultimedia);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const getByClass = async (req, res) => {
    try {
      existsOrError(req.params.id, "class does not exist!");

      const getIdMultimedia = await knex("multimedia")
        .innerJoin("subject", "subject.subject_id", "multimedia.subject_id")
        .where({ "subject.clas_id": req.params.id })
        .select("*");

      res.json(getIdMultimedia);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, getByClass };
};
