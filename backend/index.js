const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

//Load routes
const users = require("./routes/users");
const occurrences = require("./routes/occurrences");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Dev logging middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/", users);
app.use("/", occurrences);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
