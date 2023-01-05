const express = require("express");
const app = express();
const port = 3004;
const database = require("./database.js");
const db = new database("./database.db");
db.connect("./database.db");
const fs = require("fs");
var bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const session = require("express-session");
const mysql = require("mysql2");
const { response } = require("express");
const multer = require("multer");

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

async function check_key(key, email) {
  if (keys[email].includes(key)) {
    return true;
  } else {
    return false;
  }
}
async function getuser(value) {
  var object = keys;
  return Object.keys(object).find((key) => object[key].includes(value));
}
app.post('/login',(req, res) => {
  // to login into your account
  make();
  async function make() {
    console.log("sdvsdssssssssssssssssssss");
    console.log(req.body);
    let { email, password } = req.body;
    console.log(email === "admin" && password === "12345");
    if (email === "admin" && password === "12345") {
      aidmin_key = await genAPIKey();
      res.send("admin_page?key=" + aidmin_key);
    } else {
      var check = await db.check_user(email, password);
      var key_array = [];
      var key = genAPIKey();
      console.log(1111);
      console.log(check);
      if (!(check === undefined || check.length === 0)) {
        if (!(keys[email] === undefined)) {
          key_array = keys[email];
        }
        key_array.push(key);
        keys[email] = key_array;
        res.status(200);
        res.send(key);
      } else {
        res.status(403);
        res.send("wrong user or password");
      }
      console.log(keys);
    }
    console.log(keys);
  }
});


app.post("/logout",(req, res) => {
  let { email, key } = req.body;
  array_list = keys[email];
  console.log(key);
  if (!array_list.includes(key)) res.send({ message: "failed. Not logged in" });
  else {
    const index = array_list.indexOf(key);
    const x = array_list.splice(index, 1);
    res.send({ message: "Successfully logged out." });
    console.log(keys);
  }
});

app.post("/upload_image", (req, res) => {
  res.sendFile(__dirname + "\\test_backend.html");
});

app.post("/create_product", (req, res) => {
  async function make(req, res) {
    let { produktID, name, price, producer } = req.body;

    // Check if an image file was uploaded
    let imageBlob = null;
    if (req.file) {
      // Read the contents of the uploaded file
      imageData = req.file.buffer;
      // Convert the contents to a base64-encoded string
      imageBlob = Buffer.from(imageData).toString("base64");
    }

    var id = await db.get_new_produktID();
    // Generate a new ID for the user
    produktID = id["produktID"] + 1;
    name = req.name;
    price = req.price;
    producer = req.producer;

    // Check if a product with the same name already exists
    if (db.product_exist(name)) {
      response = "product exist";
      return res.send(response);
    } else {
      db.create_product(produktID, name, imageBlob, price, producer);
      response = "product added";
      return res.send(response);
    }
  }

  make(req, res);
});

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
    var id = await db.get_new_userID();
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    // Generate a new ID for the user
    let newIduser = id["userID"] + 1;
    console.log(id);
    console.log(db.user_exist(email));
    if (
      !(db.user_exist(email) === undefined || db.user_exist(email).length === 0)
    ) {
      res.send("user exist");
    } else {
      console.log("wwwwwwwwwwwwwwwww");
      db.create_user(
        newIduser,
        username,
        email,
        geburtsdatum,
        password,
        adresse
      );
      res.send("succesful");
    }
  }
});

app.post("/update_user", (req, res) => {
  // to login into your account
  make(req, res);
  async function make(req, res) {
    let {
      original_email,
      email,
      username,
      password,
      geburtsdatum,
      adresse,
      key,
    } = req.body;
    console.log(await getuser(key));
    console.log((await getuser(key)) === undefined);
    console.log(111);
    if ((await getuser(key)) === undefined) {
      res.status(403);
      res.send("forbidden");
    } else {
      console.log(
        await getuser(key),
        username,
        email,
        password,
        geburtsdatum,
        adresse
      );
      db.update_user(
        await getuser(key),
        username,
        email,
        password,
        geburtsdatum,
        adresse
      );
      res.send("user updated");
    }
  }
});

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "\\admin_login.html");
});

app.get("/get_html", (req, res) => {
  res.sendFile(__dirname + "\\createproduct.html");
});

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "\\admin_login.html");
});

app.get("/admin_page?:key", (req, res) => {
  if (!(aidmin_key === req.query.key)) {
    res.sendFile(__dirname + "\\admin_login.html");
  } else {
    res.sendFile(__dirname + "\\admin_page.html");
  }
});

app.post("/load", (req, res) => {
  // Get the file that was set to our field named "image"
  console.log(req.files);
  const { image } = req.files;

  // If no image submitted, exit
  if (!image) return res.sendStatus(400);

  // Move the uploaded image to our upload folder
  image.mv(__dirname + "/images/" + image.name);

  res.sendStatus(200);
});

app.get("/get_product", (req, res) => {
  //get all products
  res.set('Access-Control-Allow-Origin', '*');
  res.send(db.getProducts());
});

app.get("/get_product_by_ID", (req, res) => {
  //get the id in the request
  var id = req.query.id;
  //get the product with the id
  res.send(db.getProductByID(id));
});


app.post("/get_shopping_cart", (req, res) => {
// to login into your account
make(req, res);
  async function make(req, res) {
    let { key} = req.body;
    var user = await getuser(key);
    res.send(db.get_cart(key));
}
});


app.post("/add_shopping_cart", (req, res) => {
  // to login into your account
  make(req, res);
    async function make(req, res) {
      let { key, produktid} = req.body;
      var user = await getuser(key);
      var warenkorbid = await db.get_new_warenkorbID();
      var userid = await db.get_user_ID(user);
      db.add_to_cart(warenkorbid, produktid, userid, 1)
      res.send("sucess");
  }
  });
  