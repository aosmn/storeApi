## DB Schema
### Product

- **id** SERIAL PRIMARY KEY Number
- **name** VARCHAR(150)
- **price** INTEGER
- **category** VARCHAR(150)

### User
- **id** SERIAL PRIMARY KEY
- **username** VARCHAR(50)
- **firstName** VARCHAR(50)
- **lastName** VARCHAR(50)
- **password_digest** VARCHAR

### Orders
- **id** SERIAL PRIMARY KEY
- **user_id** BIGINT REFERENCES users(id)
- **status** VARCHAR(8)

### Order Products
- **id** SERIAL PRIMARY KEY
- **quantity** INTEGER
- **order_id** BIGINT REFERENCES orders(id)
- **product_id** BIGINT REFERENCES products(id)






## API Endpoints

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
