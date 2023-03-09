const db = require("../models/db.model");
const User = db.users;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");

// Create and Save a new User
async function create(req, res)  {
    // Validate request
    if (!req.body) {
        return res.status(400).json({
            message: err || "Conteúdo não pode estar vazio!",
        });
    }

    // Create a User
    await User.create({
        usr_name: req.body.usr_name,
        usr_email: req.body.usr_email,
        usr_password: req.body.usr_password,
        usr_type: req.body.usr_type,
        usr_token: req.body.usr_token
    })
        .then(() => {
            return res.status(201);
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Erro encontrado ao criar usuário novo. " + err.message,
            });
        });
};

async function read(req, res) {
    if (!req.query.email) {
        return res.status(400).send({ message: "E-mail do usuário não fornecido." });
    }
    User.findOne({ where: { usr_email: req.query.email } })
        .then((data) => {
            if (!data) {
                return res.status(406).send({
                    message: "Usuário não encontrado com e-mail = " + req.query.email,
                });
            }
            return res.status(200).send(data);
        })
        .catch((err) => {
            return res.status(500).send({
                message:
                    "Erro ao buscar usuário com e-mail = " +
                    req.query.email +
                    ". " +
                    err.message,
            });
        });
};

async function update(req, res) {
    if (!req.body) {
        return res.status(400).send({
          message: "Dados não fornecidos.",
        });
      }
      if (!req.query.email) {
        return res.status(400).send({
          message: "E-mail do usuário não fornecido.",
        });
      }
      const email = req.query.email;
    
      User.update(req.body, {
        where: { usr_email: email },
      })
        .then((num) => {
          if (num === 1) {
            return res.status(200).send({
              message: "Usuário foi atualizado com sucesso!",
            });
          } else {
            return res.status(406).send({
              message: `Não foi possível atualizar o usuário com o e-mail = ${email}. Talvez o usuário não exista ou o body veio vazio.`,
            });
          }
        })
        .catch((err) => {
          return res.status(500).send({
            message:
              "Erro ao atualizar o usuário com o e-mail = " + email + ". " + err.message,
          });
        });
};

async function remove(req, res) {
    if (!req.query.email) {
        return res.status(400).send({
          message: "Email do usuário não fornecido.",
        });
      }
      const email = req.query.email;
    
      User.destroy({
        where: { usr_email: email },
      })
        .then((num) => {
          if (num === 1) {
            return res.status(204);
          } else {
            return res.status(406).send({
              message: `Não foi possível deletar o usuário com e-mail = ${email}. Talvez o usuário não exista.`,
            });
          }
        })
        .catch((err) => {
          return res.status(500).send({
            message:
              "Erro ao deletar o usuário com o e-mail = " + email + ". " + err.message,
          });
        });
}

module.exports = { create, read, update, remove };