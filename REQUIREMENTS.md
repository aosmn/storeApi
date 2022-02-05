# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)




## API Docs

---

### Products API

---

`GET /products`

Get a list of all products

`GET /products/category/:category`

Get a list of products filtered by category

`GET /products/:id`

Get product by id

`POST /products` -- _Requires Authentication_

Create a product

```JSON
BODY {
  "name": string,
  "category": string,
  "price": number
}
```

`DELETE /products/:id` -- _Requires Authentication_

Delete a product

---

### Users API

---

`GET /users` -- _Requires Authentication_

Get a list of all users

`POST /users`

Sign up user

```JSON
BODY {
  "username": string,
  "firstname": string,
  "lastname": string,
  "password": string
}
```

`GET /users/:id` -- _Requires Authentication_

Get user by id

`POST /user/login`

Authenticate user and get JWT token

```JSON
BODY {
  "username": string,
  "password": string
}
```

`DELETE /users/:id` -- _Requires Authentication_

Delete a product

---

### Orders API

---

`GET /orders`

Get a list of all orders

`GET /orders/:id/products` -- _Requires Authentication_

Get order products

`POST /orders/:id/products` -- _Requires Authentication_

Add product to order

```JSON
Body {
  "quantity": number,
  "productId": number
}
```

`DELETE /orders/:orderId/products/:productId` -- _Requires Authentication_

Remove product from order

`GET /orders/:id`

Get order by id

`DELETE /orders/:id` -- _Requires Authentication_

Delete order by id

`GET /orders/user/:id/complete` -- _Requires Authentication_

Get completed orders

`GET /orders/user/:id` -- _Requires Authentication_

Get orders by user

`POST /orders` -- _Requires Authentication_

Create an order

```JSON
BODY {
  "user_id": string,
  "status": string ("active" | "complete")
}
```
