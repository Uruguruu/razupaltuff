const express = require("express");
const app = express();
const port = 3004;
const database = require("./database.js");
const db = new database("./database.db");
db.connect("./database.db");
const fs = require("fs");
var bodyParser = require("body-parser");
const session = require("express-session");
const mysql = require("mysql2");
const { response } = require("express");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
var keys = {};
var aidmin_key = "";
// Mit diesem Kommando starten wir den Webserver.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  hell = genAPIKey();
  console.log(hell);
});

const genAPIKey = () => {
  //create a base-36 string that contains 30 chars in a-z,0-9
  return [...Array(300)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join("");
};

async function getuser(rkey) {
  return Object.keys(keys).find((key) => object[key] === rkey);
}

async function check_rights(user){

}
app.post('/login', (req, res) => {
    // to login into your account
    make()
    async function make(){
        let { email, password } = req.body;
        console.log(email === "admin" && password === "12345");
        if(email === "admin" && password === "12345"){
          aidmin_key = await genAPIKey();
          res.send("admin_page?key="+aidmin_key);
        }
        else{
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
      console.log(keys);
    }
  });


app.post("/logout", (req, res) => {
  let { email, key } = req.body;
  array_list = keys[email];
  if (!array_list.includes(key)) res.send({ message: "failed. Not logged in" });
  else {
    const index = array_list.indexOf(key);
    const x = array_list.splice(index, 1);
    res.send({ message: "Successfully logged out." });
    console.log(keys);
  }
});

app.post("/create_product", (req, res) => {
  // to login into your account
  make(req, res)
  async function make(req, res){
      let { name,  price, description,Category,  images  } = req.body;
      if(!(key == aidmin_key))  res.send('forbidden'); 
      
      // Lese den Inhalt der hochgeladenen Datei in eine Variable
      const imageData = req.file.buffer;
      // Wandeln  den Inhalt in einen BLOB um
      imageBlob = Buffer.from(imageData).toString('base64');
      // Jetzt kannst du den BLOB (imageBlob) in deiner .db-Datei speichern
      console.log(imageBlob)
      const formData = req.body;

      let lowestIdp = null;
      // Iterate through all existing products
      for(let product of products){
          if(product.id < lowestIdp || lowestIdp === null){
              lowestIdp = product.id;
          }
      }
      // Generate a new ID for the product
      let newId = lowestIdp + 1;
      if(product_exist(name)){
          response = "product exist"
      }
      else{
          create_product(formData);
          response = "product added"
      }
    }
    // Generate a new ID for the product
    let newId = lowestIdp + 1;
    if (product_exist(name)) {
      response = "product exist";
    } else {
      generate_product(
        name,
        description,
        price,
        Category,
        producer,
        images,
        newId
      );
      response = "product added";
    }
  })


app.post("/update_product", (req, res) => {
  make(req, res);
  async function make(req, res) {
    let { name, description, price, Category, producer, images, key } =
      req.body;
    if (!(key == aidmin_key)) res.send("forbidden");
    let lowestIdp = null;
    // Iterate through all existing products
    for (let product of products) {
      if (product.id < lowestIdp || lowestIdp === null) {
        lowestIdp = product.id;
      }
    }
    // Generate a new ID for the product
    let newId = lowestIdp + 1;
    if (check_rights(key, email)) {
      response = "product exist";
    } else {
      generate_product(
        name,
        description,
        price,
        Category,
        producer,
        images,
        newId
      );
      response = "product added";
    }
  }
});

app.post("/create_user", (req, res) => {
  // to login into your account
  make(req, res);
  async function make(req, res) {
    let { email, username, password, geburtsdatum, adresse } = req.body;
    let lowestIduser = null;
    // Iterate through all existing users
    for (let user of users) {
      if (user.id < lowestIduser || lowestIduser === null) {
        lowestIduser = user.id;
      }
    }
    // Generate a new ID for the user
    let newIduser = lowestIduser + 1;
    if (user_exist(username, email)) {
      response = "user exist";
    } else {
      create_user(email, username, password, geburtsdatum, adresse, newIduser);
      if (db.user_exist(email)) {
        response = "user exist";
      } else {
        var userID = 1;
        console.log(newIduser, username, email, geburtsdatum, password);
        db.create_user(newIduser, username, email, geburtsdatum, password);
        response = "user created";
      }
    }
  }
});

app.post("/update_user", (req, res) => {
  // to login into your account
  make(req, res);
  async function make(req, res) {
    let { email, username, password, geburtsdatum, adresse, key } = req.body;
    if (!check_key(key)) {
      res.status(403);
      res.send("forbidden");
    } else {
      db.update_user(email, username, password, geburtsdatum, adresse);
      response = "user created";
    }
  }
});

app.post("/update_user", (req, res) => {
  // to login into your account
  make(req, res);
  async function make(req, res) {
    let { email, username, password, geburtsdatum, adresse, key } = req.body;
    if (!check_key(key)) {
      res.status(403);
      res.send("forbidden");
    } else {
      db.update_user(email, username, password, geburtsdatum, adresse);
      response = "user created";
    }
  }
});



app.get("/admin",(req, res) => {
  res.sendFile(__dirname+"\\admin_login.html");
})




app.get('/get_html', (req,res) =>{
  res.sendFile(__dirname+"\\createproduct.html");
})

app.post('/upload_image', (req,res) =>{
  res.sendFile(__dirname+"\\createproduct.html")
})


