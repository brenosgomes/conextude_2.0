const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    try {
      existsOrError(req.params.id, "forumTopic does not exist!");

      const forumTopics = await knex("forumTopic")
        .where({ subject_id: req.params.id })
        .select(
          "forumTopic.subject_id",
          "forumTopic.student_id",
          "forumTopic.forumTopic_id",
          "forumTopic.forumTopic_title",
          "forumTopic.forumTopic_description"
        );

      for (let topic of forumTopics) {
        if (topic.student_id) {
          topic.person = await knex("student")
            .where("student_id", topic.student_id)
            .select({ student_id: "student_id", person_name: "student_name" })
            .first();
        } else {
          topic.person = await knex("subject")
            .where("subject_id", topic.subject_id)
            .innerJoin("teacher", "teacher.teacher_id", "subject.teacher_id")
            .select({
              teacher_id: "teacher.teacher_id",
              person_name: "teacher.teacher_name",
            })
            .first();
        }
      }

      res.json(forumTopics);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "forumTopic does not exist!");

            const removeForumTopic = await knex('forumTopic').del()
                .where({ forumTopic_id: req.params.id })
            existsOrError(removeForumTopic, 'forumTopic not found')

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const forumTopic = req.body;
    try {
      const newForumTopic = await knex("forumTopic").insert(forumTopic);
      res.json(newForumTopic);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const forumTopic = req.body;
    const forumTopic_id = req.params.id;
    try {
      existsOrError(forumTopic_id, "forumTopic does not exist!");

      const attForumTopic = await knex("forumTopic")
        .update(forumTopic)
        .where({ forumTopic_id: forumTopic_id });
      existsOrError(attForumTopic, "forumTopic not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, post, put, remove };
};
