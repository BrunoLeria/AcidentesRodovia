const { client, users } = require("../database/connection.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create and Save a new User
async function create(req, res) {
  // Validate request
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message:
        "As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente.",
    });
  }

  try {
    const id = (await users.countDocuments()) + 1;

    const newUser = {
      id: id,
      name: name,
      email: email,
      password: "",
    };

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await users.insertOne(newUser).then(() => {
      return res.status(201).send({
        id: id,
        name: name,
        email: email,
      });
    });

    console.log("Usuário cadastrado com sucesso!");
  } catch (err) {
    return res.status(500).send({
      message: "Erro ao tentar cadastrar o usuário no servidor. " + err.message,
    });
  }
}

async function find(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).send({
      message:
        "As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente.",
    });
  }
  try {
    const query = { id: id };
    const user = users.findOne(query);

    if (!user) {
      return res.status(403).send({
        message: "Essas credenciais não correspondem aos nossos registros.",
      });
    }
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({
      message: "Erro ao tentar encontrar o usuário no servidor" + err.message,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message:
          "As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente.",
      });
    }

    let user = await users.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "Essas credenciais não correspondem aos nossos registros.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Essas credenciais não correspondem aos nossos registros.",
      });
    }

    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token: token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Erro ao tentar encontrar o usuário no servidor" + err.message,
    });
  }
}

async function update(req, res) {
  // Validate request
  const { id } = req.query;
  if (!id) {
    return res.status(400).send({
      message:
        "As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente.",
    });
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message:
        "As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente.",
    });
  }

  try {
    // create a filter for a movie to update
    const filter = { id: id };
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        name: name,
        email: email,
        password: password,
      },
    };
    const result = await users.updateOne(filter, updateDoc, options);

    console.log(result);
    // if (num === 1) {
    //     return res.status(200).send({
    //       message: "Atualização do usuário realizada com sucesso",
    //     });
    //   } else {
    //     return res.status(403).send({
    //       message: "Essas credenciais não correspondem aos nossos registros.",
    //     });
    //   }
  } catch (err) {
    return res.status(500).send({
      message: "Erro ao tentar atualizar o usuário no servidor" + err.message,
    });
  }
}

async function remove(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).send({
      message:
        "As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente.",
    });
  }

  try {
    // Query for a movie that has title "Annie Hall"
    const query = { id: id };
    const result = await users.deleteOne(query);
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
      message: "Erro ao tentar excluir o usuário no servidor" + err.message,
    });
  }
}

module.exports = { create, find, login, update, remove };
