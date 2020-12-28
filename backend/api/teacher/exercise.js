const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    try {
      existsOrError(req.params.id, "exercise does not exist!");

      const getIdExercise = await knex("exercise")
        .where({ subject_id: req.params.id })
        .first();
      existsOrError(getIdExercise, "exercise not found");

      res.json(getIdExercise);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "exercise does not exist!");

      const removeExercise = await app
        .db("exercise")
        .del()
        .where({ exercise_id: req.params.id });
      existsOrError(removeExercise, "exercise not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const exercise = req.body;
    try {
      const newExercise = await knex("exercise").insert(exercise);
      res.json(newExercise);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const exercise = req.body;
    const exercise_id = req.params.id;
    try {
      existsOrError(exercise_id, "exercise does not exist!");

      const attExercise = await knex("exercise")
        .update(exercise)
        .where({ exercise_id: exercise_id });
      existsOrError(attExercise, "exercise not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, post, put, remove };
};
