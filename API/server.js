const express = require("express");
const app = express();
const port = 3004;
const database = require("./database.js");
const db = new database("./database.db");
const fs = require("fs");
var bodyParser = require("body-parser");
const session = require("express-session");
console.log(db.getMessages());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
var keys = {};
app.post('/login', (req, res) => {
    // to login into your account
    make()
    async function make(){
        let { email, password } = req.body;
        // var check = await check_password(email, password);
        var key_array = [];
        var key = genAPIKey();
        var check = true;
        if(check){
            console.log(2);
            console.log(keys[email]);
            console.log(1);
            if(!(keys[email] === undefined)){
                console.log(3);
                console.log(key[email]);
            key_array = keys[email];
            }
            key_array.push(key);
            keys[email] = key_array;
            res.status(200);
            res.send(key);
            
        }
        else{
            res.status(403);
            res.send('wrong user or password')    
        }
        console.log(keys);
    }
  }
);

app.post("/logout", (req, res) => {
    // Clear the user's session
    req.session.destroy(err => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
  
      // Send a response indicating that the user has been logged out
      res.send({ message: "Successfully logged out." });
    });
  });
  

  app.post('/create_user', (req, res) => {
    // to login into your account
    make(req, res)
    async function make(req, res){
        let { email, username, password, geburtsdatum, adresse } = req.body;
        let lowestId1 = null;
        // Iterate through all existing users
        for(let user of users){
            if(user.id < lowestId1 || lowestId1 === null){
                lowestId1 = user.id;
            }
        }
        // Generate a new ID for the user
        let newId = lowestId1 - 1;
        if(user_exist(username, email)){
            response = "user exist"
        }
        else{
            generate_user(email, username, password, geburtsdatum, adresse, newId);
            response = "user created"
        }
    }
})

app.post('/create_product', (req, res) => {
    // to login into your account
    make(req, res)
    async function make(req, res){
        let { name, description, price, Category, producer, images } = req.body;
        let lowestId = null;
        // Iterate through all existing products
        for(let product of products){
            if(product.id < lowestId || lowestId === null){
                lowestId = product.id;
            }
        }
        // Generate a new ID for the product
        let newId = lowestId - 1;
        if(product_exist(name)){
            response = "product exist"
        }
        else{
            generate_product(name, description, price, Category, producer, images, newId);
            response = "product added"
        }
    }
})


app.post("/create_user", (req, res) => {
  // to create a user
  make();
  async function make() {
    let { adresse, geburtsdatum, username, password, email } = req.body;
  }
});

// Mit diesem Kommando starten wir den Webserver.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  hell = genAPIKey();
  console.log(hell);
});

app.get("/", function (request, response) {
  response.sendFile(__dirname +"/test_backend.html");

});

app.post("/content", function (request, response) {
  db.getMessage(100);
  make();
  async function make() {
    let { email, password } = request.body;
    var json = await check_password(email, password);

    var data = JSON.parse(json);
    if (receiver > sender) {
      name = receiver.toString() + sender.toString();
    } else {
      name = sender.toString() + receiver.toString();
    }
    if (!Object.hasOwn(data, name)) response.send("no content");
    eval("var responsdata = data[" + name + "];");
    console.log(data);
    response.send(JSON.stringify(responsdata));
  }
});

app.post("/password", function (request, response) {
  hell();
  async function hell() {
    let { password, sender } = request.body;
    var json = await getpassword();
    var data = JSON.parse(json);
    if (Object.hasOwn(data, password)) response.send("already exist");
    eval("data[" + sender + "] = password");
    json = JSON.stringify(data);
    fs.writeFile("password.json", json, "utf8", callback);
    function callback() {
      response.send("su");
    }
  }
});

app.post("/send-message", function (request, response) {
  hell();
  async function hell() {
    let { receiver, sender, message, password } = request.body;
    var check = await passwod(password, sender);
    if (check == false) {
      response.send("false");
      return;
    }
    var json = await getjson();
    var name = 0;
    console.log(1);
    var data = JSON.parse(json);
    if (receiver > sender) {
      name = receiver.toString() + sender.toString();
    } else {
      name = sender.toString() + receiver.toString();
    }
    var chatlist = [];
    if (Object.hasOwn(data, name)) {
      chatlist = eval("data[" + name + "];");
    }
    console.log(2);
    chatlist.push(sender);
    chatlist.push(message);
    eval("data[" + name + "] = chatlist");
    json = JSON.stringify(data);
    fs.writeFile("data.json", json, "utf8", callback);
    function callback() {
      response.send("su");
    }
  }
});
// Hier teilen wir express mit, dass die öffentlichen HTML-Dateien
// im Ordner "public" zu finden sind.
app.use(
    express.static(__dirname + '/public')

    );
const genAPIKey = () => {
  //create a base-36 string that contains 30 chars in a-z,0-9
  return [...Array(30)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join("");
};
