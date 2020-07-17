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
app.use(express.static(".public/node_modules"));
app.use(express.static("./db"));
console.log(__dirname);
// DATA PIPE =======================================================
let noteList = [];

if(fs.readFileSync(__dirname + 'cache.txt', 'utf-8')) {
    var cache = fs.readFileSync(__dirname + 'cache.txt', 'utf-8');
    cache = JSON.stringify(cache);
    noteList.push(cache)
    console.log('initial READ \n' + noteList);
}

// ROUTE TABLE ========================================
app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "index.html"));
    });
    
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
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

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});