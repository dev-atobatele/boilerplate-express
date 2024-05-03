let express = require('express');
let app = express();
var bodyParser = require('body-parser');
var env = require('dotenv').config();
// Only use each endpoint once, if not express will use the first occurence

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
  });

// Normal usage
//app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

/*
app.get("/json", (req, res) => {
    res.json({
        message: "Hello json"
      });
} );
*/
  app.use(bodyParser.urlencoded({extended:false}))
  app.use(bodyParser.json())

  app.use("/json", function middleware(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
  })
  var message= 'Hello json';
  app.get("/json", (req, res) => {
    if ( process.env['MESSAGE_STYLE'] === "uppercase") {
        res.json({ "message": message.toUpperCase() });
    }
    else {
      res.json({ "message": message });
    }
  });  

  app.get('/now', function middleware(req, res, next) {
    req.time = new Date().toString();  // Hypothetical synchronous operation
    next();
  }, function time(req, res) {
    res.send({time:req.time});
    console.log(req.time)
  });
 
  app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
      echo: word
    });
  });

  app.route('/name').get((req,res)=>{
    const first = req.query.first
    const last = req.query.last
    res.json({
      'name' : `${first} ${last}`
    })
  }).post((req,res)=>{
    var string = `${req.body.first} ${req.body.last}`
    res.json({
      name:string
    })
  })



















 module.exports = app;
