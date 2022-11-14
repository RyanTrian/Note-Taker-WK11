const api = require('express').Router();
const path = require("path");
let db = require("../db/db.json");
const { writeFile, readFileSync } = require("fs");
const { v4: uuidv4 } = require('uuid');

api.get("/notes", (req, res) => {
  db = JSON.parse(readFileSync("./db/db.json", "utf8"));
  res.json(db);
});

api.post('/notes', (req, res) => {
  req.body.id = uuidv4();
  db.push(req.body);
  writeFile('./db/db.json', JSON.stringify(db, null, 4), (err) => {
    err ? console.log(err) : console.log("file created");
  });
  res.send(`Added note ${req.body.name}`);
})

api.delete('/notes/:id', (req, res) => {
  
  const checkId = db.filter((note) => req.params.id !== note.id)

  writeFile('./db/db.json', JSON.stringify(checkId, null, 4), (err) => {
    err ? console.log(err) : console.log("note deleted")
  });
      
  res.send(`Deleted note`);
})

module.exports = api;

