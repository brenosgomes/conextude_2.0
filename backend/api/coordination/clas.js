const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    const clas = await knex("clas")
      .innerJoin("series", "series.series_id", "clas.series_id")
      .select("*");
    return res.json(clas);
  };

  const getById = async (req, res) => {
    try {
      existsOrError(req.params.id, "clas does not exist!");

      const getIdClas = await knex("clas")
        .where({ clas_id: req.params.id })
        .first();
      existsOrError(getIdClas, "clas not found");

      res.status(200).json(getIdClas);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "clas does not exist!");

      const removeClas = await knex("clas")
        .del()
        .where({ clas_id: req.params.id });
      existsOrError(removeClas, "clas not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const clas = req.body;
    try {
      const newClas = await knex("clas").insert(clas);
      res.json(newClas);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const clas = req.body;
    const clas_id = req.params.id;
    try {
      existsOrError(clas_id, "clas does not exist!");

      const attClas = await knex("clas")
        .update(clas)
        .where({ clas_id: clas_id });
      existsOrError(attClas, "clas not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, getById, post, put, remove };
};
