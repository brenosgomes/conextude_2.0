const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    const genericSubject = await knex("genericSubject").select("*");
    return res.json(genericSubject);
  };

  const getById = async (req, res) => {
    try {
      existsOrError(req.params.id, "genericSubject does not exist!");

      const getIdGenericSubject = await knex("genericSubject")
        .where({ genericSubject_id: req.params.id })
        .first();
      existsOrError(getIdGenericSubject, "genericSubject not found");

      res.json(getIdGenericSubject);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "genericSubject does not exist!");

      const removeGenericSubject = await knex("genericSubject")
        .del()
        .where({ genericSubject_id: req.params.id });
      existsOrError(removeGenericSubject, "genericSubject not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const genericSubject = req.body;
    try {
      const newGenericSubject = await knex("genericSubject").insert(
        genericSubject
      );
      res.json(newGenericSubject);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const genericSubject = req.body;
    const genericSubject_id = req.params.id;
    try {
      existsOrError(genericSubject_id, "genericSubject does not exist!");

      const attGenericSubject = await knex("genericSubject")
        .update(genericSubject)
        .where({ genericSubject_id: genericSubject_id });
      existsOrError(attGenericSubject, "genericSubject not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, getById, post, put, remove };
};
