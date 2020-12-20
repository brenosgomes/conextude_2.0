const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    try {
      existsOrError(req.params.id, "forumAnswer does not exist!");

      const forumAnswers = await knex("forumAnswer")
        .where({ forumTopic_id: req.params.id })
        .select("*");

      for (let answer of forumAnswers) {
        if (answer.student_id) {
          answer.person = await knex("student")
            .where("student_id", answer.student_id)
            .select({ student_id: "student_id", person_name: "student_name" })
            .first();
        } else {
          answer.person = await knex("teacher")
            .where("teacher_id", answer.teacher_id)
            .select({
              teacher_id: "teacher_id",
              person_name: "teacher_name",
            })
            .first();
        }
      }

      res.json(forumAnswers);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "forumAnswer does not exist!");

      const removeForumAnswer = await app
        .db("forumAnswer")
        .del()
        .where({ forumAnswer_id: req.params.id });
      existsOrError(removeForumAnswer, "forumAnswer not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const forumAnswer = req.body;
    try {
      const newForumAnswer = await knex("forumAnswer").insert(forumAnswer);
      res.json(newForumAnswer);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const forumAnswer = req.body;
    const forumAnswer_id = req.params.id;
    try {
      existsOrError(forumAnswer_id, "forumAnswer does not exist!");

      const attForumAnswer = await knex("forumAnswer")
        .update(forumAnswer)
        .where({ forumAnswer_id: forumAnswer_id });
      existsOrError(attForumAnswer, "forumAnswer not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, post, put, remove };
};
