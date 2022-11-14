// Victor Ekpenyong
// MONGO & Express Library of Truth Server 
var Express = require('express');
const {MongoClient} = require('mongodb');

let cs = "mongodb+srv://victor:ekpenyong@cluster0.8dqolnm.mongodb.net/?retryWrites=true&w=majority";
let db;
let books;

async function start() {
    const client = new MongoClient(cs)
    await client.connect();
    db = client.db("Library");
    books = db.collection("Capstone");
    console.log("Listening");
    app.listen(9000);
}


var app = Express();

//helper functions

function handle_put(title, book) {
    for(const value in book) {
        books.updateOne({title:title}, {$set:{[value]:book[value]}});
    }
}

// Middleware Functions
app.use(Express.json());
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers',
     'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === "OPTIONS") res.sendStatus(200);
    else next();
});


// CRUD Function Handlers

//Status 404 sent out for all other POST requests not previosly specified
app.post('*', function(req,res) {
    res.status(404);
    res.send("Invalid URL");
});


//Read - All Books and/or Books based on availability
app.get('/books', async function(req, res) {
    if(req.query.avail != undefined) {
        if(req.query.avail != 'true' && req.query.avail != 'false') {
            res.status(400);
            res.send("Invalid Query Assignment");
        }
        else {
            res.status(400);
            let status = (req.query.avail === 'true');
            let availBooks = await books.find({avail: status}).project({_id:0, title:1}).toArray();
            res.send(availBooks);
        }
    }
    else {  
        res.status(200);
        let allBooks = await books.find().project({_id:0, title:1, avail:1}).toArray();
        res.send(allBooks);
    }
});
//Read - Specific Book with matching ID
app.get('/books/:title', async function(req, res) {
    let book = await books.findOne({title:req.params.title});
    if(book === null) {
        res.status(404)
        res.send("Book ID Not Found")
    }
    else {
        res.status(200);
        res.send(book);
    }
});
//Status 404 sent out for all other GET requests not previosly specified
app.get('*', function(req,res) {
    res.status(404);
    res.send("Invalid URL");
});


// Update - Existing Book information being updated
app.put('/books/:title', async function(req, res) {
    let existingBook = req.body;
    let book = await books.findOne({title:req.params.title});
    if(book === null) {
        res.status(404);
        res.send("Book Title Not Found");
    }
    else {
        handle_put(req.params.title, existingBook);
        res.status(200);
        res.send("Book ID - " + req.params.title + " updated!");
    }
});
//Status 404 sent out for all other PUT requests not previosly specified
app.put('*', function(req,res) {
    res.status(404);
    res.send("Invalid URL");
});


// Delete - Book being deleted
//Status 404 sent out for all other DELETE requests not previosly specified
app.delete('*', function(req,res) {
    res.status(404);
    res.send("Invalid URL");
});


start();
