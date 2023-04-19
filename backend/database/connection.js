const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const database = client.db("acidentesDB");
const users = database.collection("users");
const occurrences = database.collection("occurrences");

module.exports = { client, users, occurrences };
