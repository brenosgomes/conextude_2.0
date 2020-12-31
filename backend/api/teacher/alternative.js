const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    try {
      existsOrError(req.params.id, "Alternative does not exist!");

      const getIdAlternative = await knex("alternative")
        .where({ subject_id: req.params.id })
        .first();
      existsOrError(getIdAlternative, "Alternative not found");

      res.json(getIdAlternative);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "Alternative does not exist!");

      const rowsDeleted = await app
        .db("alternative")
        .del()
        .where({ alternative_id: req.params.id });
      existsOrError(rowsDeleted, "Alternative not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const alternative = req.body;
    try {
      const newAlternative = await knex("alternative").insert(alternative);
      res.json(newAlternative);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const alternative = req.body;
    const alternative_id = req.params.id;
    try {
      existsOrError(alternative_id, "Alternative does not exist!");

      const attAlternative = await knex("alternative")
        .update(alternative)
        .where({ alternative_id: alternative_id });
      existsOrError(attAlternative, "Alternative not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, post, put, remove };
};
