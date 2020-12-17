const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    try {
      existsOrError(req.params.id, "scrap does not exist!");

      const getIdScraps = await knex("scrap")
        .where({ subject_id: req.params.id })
        .first();
      existsOrError(getIdScraps, "scrap not found");

      res.json(getIdScraps);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "scrap does not exist!");

      const rowsDeleted = await app
        .db("scrap")
        .del()
        .where({ scraps_id: req.params.id });
      existsOrError(rowsDeleted, "scrap not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const scraps = req.body;
    try {
      const newscraps = await knex("scrap").insert(scraps);
      res.json(newscraps);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const scraps = req.body;
    const scraps_id = req.params.id;
    try {
      existsOrError(scraps_id, "scrap does not exist!");

      const attScraps = await knex("scrap")
        .update(scraps)
        .where({ scraps_id: scraps_id });
      existsOrError(attScraps, "scrap not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, post, put, remove };
};
