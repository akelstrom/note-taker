//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = require("./data/db.json");

//port
const PORT = process.env.PORT || 3002;

//instantiate the server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

//get requests

//returns index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

//returns notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/notes.html"));
});

//returns db.json file-- where all notes will be saved
app.get("/api/notes", (req, res) => {
  let results = notes;
  res.json(results);
});

//recieve a new notes to save on the request body, add it to the db.json file 
//and then return a new note to the client
//*need to give each note a unique id
app.post("/api/notes", (req, res) => {
  //req.body is where incoming content will be
  //set unquie id based on what the next index of the array will be
  req.body.id = notes.length.toString();
  //add note to json file and notes array in this function
  const newNote = req.body

  //push new note to the db.json file
  notes.push(newNote);
  res.json(newNote);
});


//returns index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.delete("")

//server listening
app.listen(PORT, () => {
  if (PORT === process.env.PORT) {
    console.log(`App listening on http://localhost:${PORT}`);
  } else {
    console.log(`App listening on port ${PORT}`);
  }
});
