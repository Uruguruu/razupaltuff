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

## description

It is a small online shop that sells crime stuff like pens, pencils, writing utensils, firecrackers, tables, bananas, etc.. There are different pages like a login, account, products and shopping cart. Everything is to run via our own Api.

## Api

### Post

- /check_key - Accepts an API key as a parameter and returns a boolean indicating whether the key is valid.
- /login - Accepts an email and password as parameters and returns an API key if the provided credentials are valid. It also logs the user in by storing their API key in the keys object.
- /logout - Accepts an API key as a parameter and logs the user out by deleting the key from the keys object.
- /upload_image - Serves a file for uploading an image.
- /create_product - Accepts a product name, price, producer, description, and image as parameters and creates a new product in the database.
- /update_product - Accepts a product ID, name, price, producer, description, and image as parameters and updates an existing product in the
database.
- /delete_product - Accepts a product ID as a parameter and deletes the corresponding product from the database.
- /create_user - Accepts an email and password as parameters and creates a new user in the database.
- /update_user - Accepts an email, password, and new password as parameters and updates an existing user in the database.
- /delete_user - Accepts an email as a parameter and deletes the corresponding user from the database.
- /add_shopping_cart - Accepts an API key and a product ID as parameters and adds the product to the user's shopping cart.
- /delet_product_by_Id - Accepts a product ID as a parameter and deletes the corresponding product from the database.

### Get

- /get_product - Accepts a product ID as a parameter and returns the corresponding product from the database.
- /get_products - Returns all products from the database.
- /get_user - Accepts an email as a parameter and returns the corresponding user from the database.
- /get_users - Returns all users from the database.
- /get_shopping_cart - Serves a file for displaying the shopping cart.
- /get_product_by_ID - Accepts a product ID as a parameter and returns the corresponding product from the database.
- /get_shopping_cart_by_userID - Accepts a user ID as a parameter and returns the corresponding shopping cart from the database.
