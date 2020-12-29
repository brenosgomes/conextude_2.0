const knex = require("../../config/db");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    try {
      existsOrError(req.params.id, "teacher does not exist!");
      let materialsArray = [];

      const subjects = await knex("subject")
        .where("teacher_id", req.params.id)
        .select("*");

      for (let subject of subjects) {
        const materialsQuery = await knex("supportMaterial")
          .where("subject_id", subject.subject_id)
          .select("*");

        materialsArray = materialsArray.concat(materialsQuery);
      }

      return res.json(materialsArray);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const getById = async (req, res) => {
    try {
      existsOrError(req.params.id, "supportMaterial does not exist!");

      const getIdsupportMaterial = await knex("supportMaterial").where({
        subject_id: req.params.id,
      });
      existsOrError(getIdsupportMaterial, "supportMaterial not found");

      res.json(getIdsupportMaterial);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "supportMaterial does not exist!");

      const rows = await knex("supportMaterial")
        .where({ supportMaterial_id: req.params.id })
        .first();

      const rowsDeleted = await knex("supportMaterial")
        .del()
        .where({ supportMaterial_id: rows.supportMaterial_id });

      existsOrError(rowsDeleted, "supportMaterial not found");

      fs.unlink(`tmp/uploads/${rows.supportMaterial_key}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("removed");
        }
      });

      console.log(rows.supportMaterial_key);

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    console.log(req.file);
    if (!req.body.url)
      req.body.url = `http://localhost:5000/files/${req.file.filename}`;
    try {
      const newSupportMaterial = await knex("supportMaterial").insert({
        subject_id: req.body.subject_id,
        supportMaterial_name: req.file.originalname,
        supportMaterial_size: req.file.size,
        supportMaterial_key: req.file.filename,
        supportMaterial_url: req.body.url,
        supportMaterial_description: req.body.supportMaterial_description,
      });
      return res.json(newSupportMaterial);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  return { get, getById, post, remove };
};
