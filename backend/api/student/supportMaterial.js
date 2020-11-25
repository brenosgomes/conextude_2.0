const knex = require("../../config/db");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    try {
      existsOrError(req.params.id, "supportMaterial does not exist!");

      const getIdsupportMaterial = await knex("supportMaterial")
        .where({ subject_id: req.params.id });
      existsOrError(getIdsupportMaterial, "supportMaterial not found");

      res.json(getIdsupportMaterial);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };
  
  return { get };
};
