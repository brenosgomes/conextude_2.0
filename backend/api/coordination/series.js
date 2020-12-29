const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    const series = await knex("series").select("*");
    return res.json(series);
  };

  return { get };
};
