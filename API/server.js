const express = require("express");
const app = express();
const port = 3004;
const database = require("./database.js");
const db = new database("./database.db");
const fs = require("fs");
var bodyParser = require("body-parser");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
var keys = {};
var key_for_admin = "";
// Mit diesem Kommando starten wir den Webserver.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
//  generated_api_key = genAPIKey();
//  console.log(generated_api_key);
  hell = genAPIKey();
  //console.log(hell);
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
app.post("/login", (req, res) => {
  // to login into your account
  make();
  async function make() {
    let { email, password } = req.body;
    console.log(email === "admin" && password === "12345");
    if (email === "admin" && password === "12345") {
      aidmin_key = await genAPIKey();
      res.send("admin_page?key=" + aidmin_key);
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

app.post("/create_product", upload.single("image"), (req, res) => {
  // Lese den Inhalt der hochgeladenen Datei in eine Variable
  setTimeout(() => {
    const imageBuffer = req.file.buffer;
    const image = imageBuffer.toString("base64");
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const producer = req.body.producer;
    // Generate a new ID for the product
    const ID = db.get_new_produktID();
    const produktID = ID["produktID"] + 1;
    try {
      db.create_product(produktID, name, image, price, producer, description);
      res.send("product added successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while creating the product");
    }
  }, 1000);
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
app.get("/create_product", (req, res) => {
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
  // get the id from the request query parameters
  const id = req.query.id;
  // get the product with the id
  const product = db.get_product(id);
  // send the product in the response
  res.send(product);
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

app.get("/get_shopping_cart_by_userID", (req, res) => {
  const id = req.query.id;
  const product = db.get_cart(id);
  res.send(product);
});
