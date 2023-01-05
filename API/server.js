const express = require("express");
const app = express();
const port = 3004;
const database = require("./database.js");
const db = new database("./database.db");
const fs = require("fs");
const session = require("express-session");
const mysql = require("mysql2");
const { response } = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
var bodyParser = require("body-parser");
var cors = require('cors');
db.connect("./database.db");
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
var keys = {};
var key_for_admin = "";
// Mit diesem Kommando starten wir den Webserver.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
//  generated_api_key = genAPIKey();
//  console.log(generated_api_key);
});
const genAPIKey = () => {
  //create a base-36 string that contains 30 chars in a-z,0-9
  return [...Array(300)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join("")
};

async function check_key(key, eMail) {
  if (keys[eMail]?.includes(key)) {
    return true;
  } else {
    return false;
  }
}

async function getuser(value) {
  var object = keys;
  return Object.keys(object).find((key) => object[key].includes(value));
}

async function verifyCredentials(eMail, password) {
  var get_user_form_db = await db.check_user(await eMail, await password);
  console.log(get_user_form_db);
  return get_user_form_db !== null;
  }


app.use(cors());

app.post("/login", async (req, res) => {
  try {
    const { eMail, password } = req.body;
    console.log({ eMail, password })
    // Verify the eMail and password
    console.log(await verifyCredentials)
    const isValid = await verifyCredentials(eMail, password);

    if (await eMail === "admin" && await password === "12345") {
      key_for_admin = await genAPIKey();
      res.send("admin_page?key=" + key_for_admin);
    } else if (isValid === true) {
      console.log("sucessfull login")
      // Generate a token
      const token = await genAPIKey();
      res.status(200).send({ token });
    } else {
      res.status(405).send({ error: "Invalid eMail or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.get("/logout", (req, res) => {
  try {
    // Invalidate the JWT token
    //invalidateJWT(req.headers.authorization);
    res.status(200).send({ message: "Successfully logged out" });
  } catch (error) {
    console.error(error);
    res.status(404).send({ error: "Error logging out" });
  }
});

/* if (eMail === "admin" && password === "12345") {
 key_for_admin = await genAPIKey();
  res.send("admin_page?key=" + key_for_admin); */

app.post("/upload_image", (req, res) => {
  res.sendFile(__dirname + "\\test_backend.html");
});

app.post("/create_product", (req, res) => {
  // to login into your account
  make(req, res);
  async function make(req, res) {
    console.log(req.body);
    let { produktID, name, imageData, price, producer } = req.body;

    // Lese den Inhalt der hochgeladenen Datei in eine Variable
    imageData = req.file.buffer;
    // Wandeln  den Inhalt in einen BLOB um
    const imageBlob = Buffer.from(imageData).toString("base64");
    // Jetzt kannst du den BLOB (imageBlob) in deiner .db-Datei speichern
    console.log(imageBlob);
    name = req.name;
    price = req.price;
    producer = req.producer;
    db.create_product(produktID, name, imageBlob, price, producer);
    let lowestIdp = null;
    // Iterate through all existing products
    for (let product of products) {
      if (product.id < lowestIdp || lowestIdp === null) {
        lowestIdp = product.id;
      }
    }
    // Generate a new ID for the product
    let newId = lowestIdp + 1;
    if (product_exist(name)) {
      response = "product exist";
    } else {
      db.create_product(imageBlob);
      response = "product added";
    }
  }
});
app.post("/update_product", (req, res) => {
  make(req, res);
  async function make(req, res) {
    let { name, description, price, Category, producer, images, key } =
      req.body;
    if (!(key == key_for_admin)) res.send("forbidden");
    let lowestIdp = null;
    // Iterate through all existing products
    for (let product of products) {
      if (product.id < lowestIdp || lowestIdp === null) {
        lowestIdp = product.id;
      }
    }
    // Generate a new ID for the product
    let newId = lowestIdp + 1;
    if (check_rights(key, eMail)) {
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
app.post("/create_user", bodyParser.urlencoded, (req, res) => {
  // to login into your account
  make(req, res);
  async function make(req, res) {
    let { eMail, username, password, geburtsdatum, adresse } = req.body;
    let lowestIduser = null;
    // Iterate through all existing users
    var id = await db.get_new_userID();
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    // Generate a new ID for the user
    let newIduser = id["userID"] + 1;
    console.log(id);
    console.log(db.user_exist(eMail));
    if (
      !(db.user_exist(eMail) === undefined || db.user_exist(eMail).length === 0)
    ) {
      res.send("user exist");
    } else {
      console.log("wwwwwwwwwwwwwwwww");
      db.create_user(
        newIduser,
        username,
        eMail,
        geburtsdatum,
        password,
        adresse
      );
      res.send("succesful");
    }
  }
});
app.post("/update_user", bodyParser.urlencoded, (req, res) => {
  // to login into your account
  make(req, res);
  async function make(req, res) {
    let {
      original_eMail,
      eMail,
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
        eMail,
        password,
        geburtsdatum,
        adresse
      );
      db.update_user(
        await getuser(key),
        username,
        eMail,
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
  if (!(key_for_admin === req.query.key)) {
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

app.get("/get_product", async (req, res) => {
  //get all products
  res.set("Access-Control-Allow-Origin", "*");
  res.send(await db.getProducts());
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
    let { key } = req.body;
    var user = await getuser(key);
    res.send(db.get_cart(key));
  }
});

app.post("/add_shopping_cart", (req, res) => {
  // to login into your account
  make(req, res);
  async function make(req, res) {
    let { key, produktid } = req.body;
    var user = await getuser(key);
    var warenkorbid = await db.get_new_warenkorbID();
    var userid = await db.get_user_ID(user);
    db.add_to_cart(warenkorbid, produktid, userid, 1);
    res.send("sucess");
  }
});
