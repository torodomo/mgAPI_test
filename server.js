var express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
path = require('path'),
port = 8000,
app = express();

// Set up body-parser to parse form data
app.use(bodyParser.urlencoded({extended: true}));
// JSON
app.use(bodyParser.json());
// Set up database connection, Schema, model
mongoose.connect('mongodb://localhost/1955_API');

var APISchema = new mongoose.Schema({
    name: String,
    });

var Name = mongoose.model('name', APISchema);

// Here are our routes!
app.get('/', function(req, res){
    Name.find({}, function(err, results){
        if(err) { 
            console.log(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/new/:name', function(req, res){
    Name.create({name: req.params.name}, function(err, results){
        if(err) { 
            console.log(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/remove/:name', function(req, res){
    Name.remove({name: req.params.name}, function(err, results){
        if(err) { 
            console.log(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/:name', function(req, res){
    Name.find({name: req.params.name}, function(err, results){
        if(err) { 
            console.log(err);
        } else {
            res.json(results);
        }
    });
});


// END OF ROUTING...

app.listen(port, function() {
    console.log("listening on port: ", port);
    });