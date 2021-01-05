const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    try {
      existsOrError(req.params.id, "user does not exist!");

      const student = await knex("student")
        .where("student_id", req.params.id)
        .first();

      if (student) {
        const filteredExercises = [];

        const exercises = await knex("exercise")
          .innerJoin("subject", "subject.subject_id", "exercise.subject_id")
          .innerJoin(
            "genericSubject",
            "genericSubject.genericSubject_id",
            "subject.genericSubject_id"
          )
          .where("subject.clas_id", student.clas_id)
          .select(
            "exercise_id",
            "exercise_name",
            "genericSubject_name",
            "exercise_date"
          );

        await Promise.all(
          exercises.map(async (exercise, index) => {
            const hasResponse = await knex("answer")
              .where("exercise_id", exercise.exercise_id)
              .where("student_id", student.student_id)
              .first();

            if (!hasResponse) {
              filteredExercises.push(exercise);
            }
          })
        );

        return res.json(filteredExercises);
      }

      return res.status(400).send("student not found");
    } catch (error) {
      console.log(error);
      return res.status(400).json("exercises not found");
    }
  };

  const getBySubject = async (req, res) => {
    try {
      existsOrError(req.params.id, "subject does not exist!");

      const exercises = await knex("exercise")
        .innerJoin("subject", "subject.subject_id", "exercise.subject_id")
        .innerJoin(
          "genericSubject",
          "genericSubject.genericSubject_id",
          "subject.genericSubject_id"
        )
        .where("subject.subject_id", req.params.id)
        .select(
          "exercise_id",
          "exercise_name",
          "genericSubject_name",
          "exercise_date"
        );

      return res.json(exercises);
    } catch (error) {
      return res.status(400).json("exercises not found");
    }
  };

  const getExercise = async (req, res) => {
    try {
      existsOrError(req.params.id, "exercise does not exist!");

      let { exercise_name: exerciseName } = await knex("exercise")
        .where("exercise_id", req.params.id)
        .select("exercise_name")
        .first();

      let questions = await knex("question")
        .innerJoin(
          "exerciseQuestion",
          "exerciseQuestion.question_id",
          "question.question_id"
        )
        .where("exerciseQuestion.exercise_id", req.params.id)
        .select(
          "question.question_id AS id",
          "question.question_question AS question",
          "question.question_url AS url"
        );

      for (let question of questions) {
        question.options = await knex("alternative")
          .where("question_id", question.id)
          .select("alternative_id AS id", "alternative_description AS option");
        question.selected = question.options[0].id;
      }

      res.status(200).json({ exerciseName, questions });
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const getQuestion = async (req, res) => {
    try {
      existsOrError(req.params.id, "exercise does not exist!");

      const getIdExercise = await knex("exercise")
        .where({ exercise_id: req.params.id })
        .first();
      existsOrError(getIdExercise, "exercise not found");

      res.json(getIdExercise);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, getBySubject, getExercise, getQuestion };
};
