const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    try {
      existsOrError(req.params.id, "subject does not exist!");

      const students = await knex("student")
        .innerJoin("clas", "clas.clas_id", "student.clas_id")
        .innerJoin("subject", "subject.clas_id", "clas.clas_id")
        .where({ subject_id: req.params.id })
        .select("student_id", "student_name");

      for (let student of students) {
        student.unitOne = await knex("bulletin")
          .where("student_id", student.student_id)
          .where("bulletin_unit", "1")
          .select("bulletin_grade")
          .first();
        student.unitTwo = await knex("bulletin")
          .where("student_id", student.student_id)
          .where("bulletin_unit", "2")
          .select("bulletin_grade")
          .first();
        student.unitThree = await knex("bulletin")
          .where("student_id", student.student_id)
          .where("bulletin_unit", "3")
          .select("bulletin_grade")
          .first();
        student.unitFour = await knex("bulletin")
          .where("student_id", student.student_id)
          .where("bulletin_unit", "4")
          .select("bulletin_grade")
          .first();
      }
      res.json(students);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "bulletin does not exist!");

      const removeBulletin = await knex("bulletin")
        .del()
        .where({ bulletin_id: req.params.id });
      existsOrError(removeBulletin, "bulletin not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const { subject_id, students } = req.body;
    try {
      await students.map(async (student) => {
        await student.units.map(async (unit, index) => {
          let hasUnit = await knex("bulletin")
            .update({ bulletin_grade: unit })
            .where("subject_id", subject_id)
            .where("student_id", student.student_id)
            .where("bulletin_unit", String(index + 1));

          if (!hasUnit) {
            await knex("bulletin").insert({
              subject_id,
              student_id: student.student_id,
              bulletin_unit: String(index + 1),
              bulletin_grade: unit,
            });
          }

          return res.json({ message: "success" });
        });
      });
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const bulletin = req.body;
    const bulletin_id = req.params.id;
    try {
      existsOrError(bulletin_id, "bulletin does not exist!");

      const attBulletin = await knex("bulletin")
        .update(bulletin)
        .where({ bulletin_id: bulletin_id });
      existsOrError(attBulletin, "bulletin not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, post, put, remove };
};
