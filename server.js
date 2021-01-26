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

//GET REQUESTS

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

//POST REQUEST:

//recieve new notes to save on the request body, and add it to the json file,
//and then return a new note to the client
//*need to give each note a unique id
app.post("/api/notes", (req, res) => {
  //req.body is where incoming content will be
  //set unquie id based on what the next index of the array will be
  req.body.id = notes.length.toString();
  //create a variable for new notes, set equal to the req.body
  const newNote = req.body
  //push new note to the db.json file
  notes.push(newNote);
  res.json(newNote);
});

//GET * REQUEST

//returns index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

//Bonus: should recive a query parameter containing the id of a note to delete. 
//In order to delete a note you need to read all the notes from the db.json file, remove the note with the given id property
//and rewrite the note to the db.json file
app.delete("/api/notes/:id", (req,res) => {
  //use query params to find id of note to delte
    const deleteNote = notes.findIndex((note) => note.id === req.params.id);
  
    //splice the note from the array
    notes.splice(deleteNote, 1);

    //use fs module to update array after deleted
    fs.writeFileSync("./data/db.json", JSON.stringify(notes, null, 2), function(err){
      if (err) throw err;
    })
    res.json("Note deleted!")
});

//server listening
app.listen(PORT, () => {
  if (PORT === process.env.PORT) {
    console.log(`App listening on http://localhost:${PORT}`);
  } else {
    console.log(`App listening on port ${PORT}`);
  }
});
