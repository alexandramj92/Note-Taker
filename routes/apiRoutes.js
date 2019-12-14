// LOAD Data
const fs = require("fs");
const rawData = fs.readFileSync('./db/db.json');
const noteData = JSON.parse(rawData);



//ROUTING

module.exports = function(app){
    //API GET Requests

    app.get("/api/notes" , function(req, res){
        res.json(noteData);
        
    });

    //API POST Requests

    app.post("/api/notes", function(req, res){
        noteData.push(req.body);
        res.json(true);
        fs.writeFileSync('./db/db.json', JSON.stringify(noteData));

    });


    app.delete("/api/notes/:id", async function (req, res) {
    
        let newData = noteData.filter(function(note){
        return note.id !== req.params.id;
        });


        await fs.writeFileSync('./db/db.json', JSON.stringify(newData));

        res.json(true);
    });

    
};

