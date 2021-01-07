const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const getBySeries = async (req, res) => {
    try {
      existsOrError(req.params.query, "bulletin does not exist!");

      const getIdBulletin = await knex("student")
        .select("student.student_name", "subject.subject_name", "bulletin.bulletin_unit", 
                "bulletin.bulletin_grade", "clas.clas_id", "subject.subject_year", "series.series_name")
        .innerJoin("bulletin", "bulletin.student_id", "student.student_id")
        .innerJoin("subject", "bulletin.subject_id", "subject.subject_id")
        .innerJoin("clas", "subject.clas_id", "clas.clas_id")
        .innerJoin("series", "series.series_id", "clas.series_id")
        .where({ series_name: req.params.query })
        

      existsOrError(getIdBulletin, "bulletin not found");

      res.json(getIdBulletin);
    } catch (msg) {
        return res.status(400).send(msg);
    }
  };

  return { getBySeries };
};