const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    try {
      existsOrError(req.params.id, "answer does not exist!");

      const getIdAnswer = await knex("answer")
        .where({ forumTopic_id: req.params.id })
        .first();
      existsOrError(getIdAnswer, "answer not found");

      res.json(getIdAnswer);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "answer does not exist!");

      const removeAnswer = await knex("answer")
        .del()
        .where({ answer_id: req.params.id });
      existsOrError(removeAnswer, "answer not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    try {
      const { answers, exercise_id, student_id } = req.body;
      const newAnswers = [];

      const alreadyHasAnswers = await knex("answer")
        .where("exercise_id", exercise_id)
        .where("student_id", student_id)
        .first();

      if (alreadyHasAnswers) {
        return res.status(403).json({ message: "You can't do that again." });
      }

      for (let answer of answers) {
        const newAnswer = await knex("answer").insert(answer);

        newAnswers.push(newAnswer);
      }

      res.json(newAnswers);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const answer = req.body;
    const answer_id = req.params.id;
    try {
      existsOrError(answer_id, "answer does not exist!");

      const attAnswer = await knex("answer")
        .update(answer)
        .where({ answer_id: answer_id });
      existsOrError(attAnswer, "answer not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, post, put, remove };
};
