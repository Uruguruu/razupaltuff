const express = require("express");
const app = express();
const port = 3004;
const database = require("./database.js");
const db = new database("./database.db");
db.connect("./database.db");
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
        if(!(check.length === 0)){
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
        if(db.user_exist(email)){
            response = "user exist"
        }
        else{
          var userID= 1;
          console.log(userID, username, email, geburtsdatum, password);
            db.create_user(userID, username, email, geburtsdatum, password);
            response = "user created"
        }
    }

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
          generate_product(name, description, price, Category, producer, images);
          response = "product added"
    }
  }
})



// Mit diesem Kommando starten wir den Webserver.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  hell = genAPIKey();
  console.log(hell);
});

  }
})
}

})
  })