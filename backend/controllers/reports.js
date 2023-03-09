const db = require("../models/db.model");
const Report = db.reports;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");

// Create and Save a new Report
async function create(req, res) {
    // Validate request
    if (!req.body) {
        return res.status(400).json({
            message: err || "Conteúdo não pode estar vazio!",
        });
    }

    // Create a Report
    await Report.create({
        rpt_email: req.body.email,
        rpt_route: req.body.route,
        rpt_kilometer: req.body.kilometer,
        rpt_type: req.body.type,
        rpt_description: req.body.description,
    })
        .then(() => {
            return res.status(201);
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Erro encontrado ao criar relatório novo. " + err.message,
            });
        });
};

async function read(req, res) {
    if (!req.query.id) {
        return res.status(400).send({ message: "Id do relatório não fornecido." });
    }

    const id = req.query.id;
    
    Report.findOne({ where: { rpt_identification: id } })
        .then((data) => {
            if (!data) {
                return res.status(406).send({
                    message: "Relatório não encontrado com Id = " + id,
                });
            }
            return res.status(200).send(data);
        })
        .catch((err) => {
            return res.status(500).send({
                message:
                    "Erro ao buscar relatório com Id = " +
                    id +
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
    if (!req.query.id) {
        return res.status(400).send({
            message: "Id do relatório não fornecido.",
        });
    }
    const id = req.query.id;

    Report.update(req.body, {
        where: { rpt_identification: id },
    })
        .then((num) => {
            if (num === 1) {
                return res.status(200).send({
                    message: "Relatório foi atualizado com sucesso!",
                });
            } else {
                return res.status(406).send({
                    message: `Não foi possível atualizar o relatório com o Id = ${id}. Talvez o relatório não exista ou o body veio vazio.`,
                });
            }
        })
        .catch((err) => {
            return res.status(500).send({
                message:
                    "Erro ao atualizar o relatório com o Id = " + id + ". " + err.message,
            });
        });
};

async function remove(req, res) {
    if (!req.query.id) {
        return res.status(400).send({
            message: "Id do relatório não fornecido.",
        });
    }
    const id = req.query.id;

    Report.destroy({
        where: { rpt_identification: id },
    })
        .then((num) => {
            if (num === 1) {
                return res.status(204);
            } else {
                return res.status(406).send({
                    message: `Não foi possível deletar o relatório com Id = ${id}. Talvez o relatório não exista.`,
                });
            }
        })
        .catch((err) => {
            return res.status(500).send({
                message:
                    "Erro ao deletar o relatório com o Id = " + id + ". " + err.message,
            });
        });
}

module.exports = { create, read, update, remove };