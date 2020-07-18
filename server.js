// Dependencies =======================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
// express config
var app = express();
var PORT = process.env.PORT || 3600;
// app config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(".public/assets/css"));
app.use(express.static(".public/assets/js"));
app.use(express.static("public"));
//app.use(express.static(".public/node_modules"));
app.use(express.static("./db"));
console.log(__dirname);
// DATA PIPE =======================================================
let noteList = [];

var idList = [];
while(idList.length < noteList.length + 10){
    console.log('ID: ' + idList)
    var r = Math.floor(Math.random() * 100) + 1;
    if(idList.indexOf(r) === -1){
        idList.push(r);
    }
}

app.get("/api/db", (req, res) => {
    if (err) throw (err);
        console.log('accessing DB...' + res)
    res.send(noteList)
})

app.post("/api/db/", (req, res) => {
    console.log('reading db...' + res);
    var data = req.body
    noteList.length = 0;
    noteList.push(data)
        console.log('loading to cache: \n' + noteList)
    res.json(noteList)
})
// ROUTE TABLE ========================================
app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "public/index.html"));
    });
    
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {  
    return res.json(noteList)
});

app.post("/api/notes", function(req, res) {
    var note = req.body;
        note.id = note.title.replace(/\s+/g, "").toLowerCase(); 
        noteList.push(note);
            console.log('route POST \n' + noteList);
        res.json(noteList);
})

app.delete('/api/notes/:id', function(req, res){
    console.log('parameter ID ' + req.params.id);
    let newList = [];
    noteList.forEach(note => {
        if( note.id !== req.params.id) {
            newList.push(note);
        }
    })
    noteList = newList;
    console.log('filtered note-list' + JSON.stringify(noteList))
    return req.params.id
});


// INIT =================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});