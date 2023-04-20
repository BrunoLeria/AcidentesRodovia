const { occurrences } = require("../database/connection.js");

// Create and Save a new Occurrence
async function create(req, res) {
  // Validate request
  const { registered_at, local, occurrence_tipe, km, user_id } = req.body;
  if (!registered_at || !local || !occurrence_tipe || !km || !user_id) {
    return res.status(400).json({
      message:
        "As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente.",
    });
  }

  try {
    const id = (await occurrences.countDocuments()) + 1;

    const newOcurrence = {
      id: id,
      registered_at: registered_at,
      local: local,
      occurrence_tipe: occurrence_tipe,
      km: km,
      user_id: user_id,
    };

    await occurrences.insertOne(newOcurrence).then(() => {
      return res.status(201).send(newOcurrence);
    });

    console.log("Ocorrência cadastrada com sucesso!");
  } catch (err) {
    return res.status(500).send({
      message:
        "Erro ao tentar cadastrar a ocorrência no servidor. " + err.message,
    });
  }
}

async function findAll(res) {
  try {
    // query for movies that have a runtime less than 15 minutes
    const query = { id: 1 };
    const options = {
      sort: { registered_at: 1 },
    };
    const cursor = occurrences.find(query, options);
    const list = [];
    await cursor.forEach((doc) => {
      list.push(doc);
    });
    // print a message if no documents were found
    if ((await occurrences.countDocuments(query)) === 0) {
      return res.status(404).send({
        message: "Ocorrências do usuário informado não foram encontradas.",
      });
    }
    return res.status(200).send(list);
  } catch (err) {
    return res.status(500).send({
      message:
        "Erro ao tentar encontrar as ocorrências no servidor. " + err.message,
    });
  }
}

async function update(req, res) {
  // Validate request
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      message:
        "As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente.",
    });
  }

  try {
    // create a filter for a occurrence to update
    const filter = { id: parseInt(id) };

    const oldOccurrence = await occurrences.findOne(filter);

    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        local: local || oldOccurrence.local,
        occurrence_tipe: occurrence_tipe || oldOccurrence.occurrence_tipe,
        km: km || oldOccurrence.km,
      },
    };
    const result = await occurrences.updateOne(filter, updateDoc);
    if (result.modifiedCount === 1) {
      return res.status(200).send({
        message: "Atualização da ocorrência realizada com sucesso",
      });
    } else {
      return res.status(403).send({
        message: "Essas credenciais não correspondem aos nossos registros.",
      });
    }
  } catch (err) {
    return res.status(500).send({
      message:
        "Erro ao tentar atualizar a ocorrência no servidor. " + err.message,
    });
  }
}

async function remove(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      message:
        "As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente.",
    });
  }

  try {
    // Query for a movie that has title "Annie Hall"
    const query = { id: parseInt(id) };
    const result = await occurrences.deleteOne(query);
    if (result.deletedCount === 1) {
      return res.status(200).send({
        message: "Usuário excluido com sucesso",
      });
    } else {
      return res.status(403).send({
        message: "Essas credenciais não correspondem aos nossos registros.",
      });
    }
  } catch (err) {
    return res.status(500).send({
      message:
        "Erro ao tentar excluir a ocorrência no servidor. " + err.message,
    });
  }
}

module.exports = { create, findAll, update, remove };
