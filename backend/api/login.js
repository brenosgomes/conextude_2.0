const knex = require("../config/db");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validator;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const get = async (req, res) => {
    const login = await knex("login").select("*");
    return res.json(login);
  };

  const getById = async (req, res) => {
    try {
      existsOrError(req.params.id, "login não existe!");

      const getIdlogin = await knex("login")
        .where({ login_id: req.params.id })
        .first();
      existsOrError(getIdlogin, "login não encontrado");

      res.json(getIdlogin);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "login não existe!");

      const rowsDeleted = await knex("login")
        .del()
        .where({ login_id: req.params.id });
      existsOrError(rowsDeleted, "login não encontrado");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    let {
      login_email,
      login_password,
      login_school,
      login_role,
      login_confirm_password,
    } = req.body;
    try {
      existsOrError(login_email, "Login não informado");
      existsOrError(login_password, "Senha não informada");
      existsOrError(login_confirm_password, "Confirmação de senha invalida");
      equalsOrError(
        login_password,
        login_confirm_password,
        "Senhas não conferem"
      );

      const loginFromDB = await knex("login")
        .where({ login_email: login_email })
        .first();
      if (!login_email) {
        notExistsOrError(loginFromDB, "login já cadastrado");
        res.status(400);
      }
      res.json(loginFromDB);
    } catch (msg) {
      console.log(msg);
      return res.status(400).send(msg);
    }

    login_password = encryptPassword(login_password);
    delete login_confirm_password;

    await knex("login").insert({
      login_role,
      login_email,
      login_password,
      login_school
    });
  };

  const put = async (req, res) => {
    const login = req.body;
    const login_id = req.params.id;
    try {
      existsOrError(login_id, "login does not exist!");

      const attlogin = await knex("login")
        .update(login)
        .where({ login_id: login_id });
      existsOrError(attlogin, "login not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, getById, post, put, remove };
};