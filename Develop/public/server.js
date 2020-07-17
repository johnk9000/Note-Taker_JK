// Dependencies =======================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
// express config
var app = express();
var PORT = process.env.PORT || 4200;
// app config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./assets/css"));
app.use(express.static("./assets/js"));
app.use(express.static("./"));
app.use(express.static("./node_modules"));
app.use(express.static("./db"));
console.log(__dirname);
// DATA PIPE =======================================================
let noteList = [];

async function writeData() {
    try{
        if(noteList){
            fs.readFileSync(__dirname, 'cache.txt')
        }
    } catch(err) {

    }
};

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
    //localStorage.setItem('noteList', JSON.stringify(noteList))
    console.log('posting note')    
    var note = req.body;
        note.id = note.title.replace(/\s+/g, "").toLowerCase();
        console.log('route post \n' + note);
        noteList.push(note);
    fs.writeFileSync(__dirname + 'cache.txt', noteList);
        res.json(noteList);
    //let note = { id: 1, title: 'post title', cont: "post content"};
})

app.delete('/api/notes/: id', function(req, res){

});
// app.post("/api/notestash", function(req, res) {


// retrieve note content
// app.get("/api/notestash", function(req, res) {
    // ** fs read & write modules here **
    //     return res.json(notestash);
    // });
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});