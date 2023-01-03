const express = require("express");
const app = express();
const port = 3004;
const database = require("./database.js");
const db = new database("./database.db");
const fs = require("fs");
var bodyParser = require("body-parser");
const session = require("express-session");
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
        var check = await db.check_user(email, password);
        var key_array = [];
        var key = genAPIKey();
        var check = true;
        if(check){
            if(!(keys[email] === undefined)){
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
  let { email, key } = req.body;
  array_list = keys[email];
  if(!(array_list.includes(key))) res.send({ message: "failed. Not logged in" });
  else{
  const index = array_list.indexOf(key);
  const x = array_list.splice(index, 1);
  res.send({ message: "Successfully logged out." });
  console.log(keys);
  }
});
  
app.post('/create_user', (req, res) => {
    // to login into your account
    make(req, res)
    async function make(req, res){
        let { email, username, password, geburtsdatum, adresse } = req.body;
        if(db.user_exist(username, email)){
            response = "user exist"
        }
        else{
            db.create_user(email, username, password, geburtsdatum, adresse);
            response = "user created"
        }
    }
})

 app.post('/update_user', (req, res) => {
  // to login into your account
  make(req, res)
  async function make(req, res){
      let { email, username, password, geburtsdatum, adresse, key } = req.body;
      if(!(check_key(email, key))){
        res.status(403);
        res.send('forbidden')    
      } 
      else{
        db.update_user(email, username, password, geburtsdatum, adresse);
        response = "user created"
    
    }
  }
})

app.post('/create_product', (req, res) => {
    // to login into your account
    make(req, res)
    async function make(req, res){
        let { name, description, price, Category, producer, images } = req.body;
        if(product_exist(name)){
            response = "product exist"
        }
        else{
            generate_product(name, description, price, Category, producer, images);
            response = "product added"
        }
    }
})


app.post('/update_product', (req, res) => {
  // to login into your account
  make(req, res)
  async function make(req, res){
    let {email, name, description, price, Category, producer, images, key } = req.body;
    if(!(check_key(email, key))){
      res.status(403);
      res.send('forbidden')    
    } 
    else{
      if(product_exist(name)){
          response = "product exist"
      }
      else{
          generate_product(name, description, price, Category, producer, images);
          response = "product added"
      }
    }
  }
})



// Mit diesem Kommando starten wir den Webserver.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  hell = genAPIKey();
  console.log(hell);
});

app.get("/", function (request, response) {
  response.sendFile(__dirname +"/test_backend.html");

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

function check_key( email,key){
  list = keys[email];
  return list.includes(key);
}