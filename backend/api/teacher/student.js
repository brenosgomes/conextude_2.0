const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    try {
      const getStudents = await knex("student")
        .where("student_name", "like", `%${req.query.name}%`)
        .innerJoin("clas", "clas.clas_id", "student.clas_id")
        .innerJoin("series", "series.series_id", "clas.series_id")
        .select("*");

      res.status(200).json(getStudents);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get };
};
