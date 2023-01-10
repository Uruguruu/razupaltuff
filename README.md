# razupaltuff

Razupaltuff ist ein Onlineshop für Krimskrams.

## API

We create our own API

## Team

- Patrick Krispel
- Samuel Muggli
- Tobias Klingler
- Niel Müller
- Gino Paganini
- Jan Schäfli

## Logo

![Logo](/img/logo.png)

## Description

It is a small online shop that sells crime stuff like pens, pencils, writing
utensils, firecrackers, tables, bananas, etc.. There are different pages like a
login, account, products and shopping cart. Everything is to run via our own
Api.

## Api

### Post

- /check_key - Accepts an API key as a parameter and returns a boolean
  indicating whether the key is valid.
- /login - Accepts an email and password as parameters and returns an API key if
  the provided credentials are valid. It also logs the user in by storing their
  API key in the keys object.
- /logout - Accepts an API key as a parameter and logs the user out by deleting
  the key from the keys object.
- /upload_image - Serves a file for uploading an image.
- /create_product - Accepts a product name, price, producer, description, and
  image as parameters and creates a new product in the database.
- /update_product - Accepts a product ID, name, price, producer, description,
  and image as parameters and updates an existing product in the database.
- /delete_product - Accepts a product ID as a parameter and deletes the
  corresponding product from the database.
- /create_user - Accepts an email and password as parameters and creates a new
  user in the database.
- /update_user - Accepts an email, password, and new password as parameters and
  updates an existing user in the database.
- /delete_user - Accepts an email as a parameter and deletes the corresponding
  user from the database.
- /add_shopping_cart - Accepts an API key and a product ID as parameters and
  adds the product to the user's shopping cart.
- /delet_product_by_Id - Accepts a product ID as a parameter and deletes the
  corresponding product from the database.

### Get

- /get_product - Accepts a product ID as a parameter and returns the
  corresponding product from the database.
- /get_products - Returns all products from the database.
- /get_user - Accepts an email as a parameter and returns the corresponding user
  from the database.
- /get_users - Returns all users from the database.
- /get_shopping_cart - Serves a file for displaying the shopping cart.
- /get_product_by_ID - Accepts a product ID as a parameter and returns the
  corresponding product from the database.
- /get_shopping_cart_by_userID - Accepts a user ID as a parameter and returns
  the corresponding shopping cart from the database.

## project flow

<u>The Start</u>

After we received the tasks for our project and made the team, we wasted no time
and went right to work. First, the repository "razupaltuff" was created, and we
split to make the different files for the skeleton of our project. During the
creation of the data bank Diagram, YAML file, Team skill table and so on the
"readme.md" started to get some shape. After we completed the planning and NR. 6
joined our group, we agreed that 3 people for the frontend and 3 people for the
backend would be the smartest approach.

<u>Progress Time</u>

According to the YAML file created in advance, we started building our
applications and sites. Most of our time was spent troubleshooting and fixing
issues or figuring out how fetch works. The backend and frontend team worked
close together, so our goals could be reached. Finding the right method and
searching causes for problems in 3 different files with up to 300+ lines was a
challenge. If someone was absent, we needed to figure out how to use their code
first before we could continue.

<u>Ending</u>

The 3.5 Days we were given sadly resulted half done shop, because of a lack of
time and the overestimation of the tasks. Some basic functions for our shop were
done, but a lot was missing, like a working login that actually mad you log in
with a specific user. At the end, we came to the conclusion that, setting
yourself realistic and smart goals as fast forgotten but super important.
