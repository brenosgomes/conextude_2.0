const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    const subject = await knex("subject").select("*");
    return res.json(subject);
  };

  const getById = async (req, res) => {
    try {
      existsOrError(req.params.id, "subject does not exist!");

      const getIdSubject = await knex("subject")
        .where({ clas_id: req.params.id })
        .select("*");
      existsOrError(getIdSubject, "subject not found");

      res.json(getIdSubject);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "subject does not exist!");

      const removeSubject = await knex("subject")
        .del()
        .where({ subject_id: req.params.id });
      existsOrError(removeSubject, "subject not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const subject = req.body;
    try {
      const newSubject = await knex("subject").insert(subject);
      res.json(newSubject);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const subject = req.body;
    const subject_id = req.params.id;
    try {
      existsOrError(subject_id, "subject does not exist!");

      const attSubject = await knex("subject")
        .update(subject)
        .where({ subject_id: subject_id });
      existsOrError(attSubject, "subject not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, getById, post, put, remove };
};
