## API Endpoints
#### Products
- Index '/plugins' [GET] 
- Show: '/plugins/:id' [GET] 
- Create [token required]: '/plugins' [POST]
- Edit [token required]: '/plugins/:id' [PUT]
- Delete [token required]: '/plugins/:id' [DELETE]

#### Users
- Index: '/users' [GET]
- Show [token required]: '/users/:id' [GET]
- Create: '/users' [POST]
- Edit [token required]: '/users/:id' [PUT]
- Delete [token required]: '/users/:id' [DELETE]

#### Orders
- Index [token required]: '/orders' [GET]
- Create [token required]: '/orders' [POST]
- Add plugins to order [token required]: '/orders/:id/plugins' [POST]
- Show current order by user [token required]: '/orders/:id' [GET]
- Show completed orders by user [token required]: '/orders/:user_id/completed' [GET]
- Edit [token required]: '/orders/:id' [PUT]
- Delete [token required]: '/orders/:id' [DELETE]

## Data Shapes
#### Product
- id
- name
- price

Table: plugins (id:integer, name:varchar, price:decimal)

#### User
- id
- first_name
- last_name
- username
- pass

Table: users (id:integer, first_name:varchar, last_name:varchar, username: varchar, pass:varchar)

#### Orders
- id
- quantity
- user_id
- status (open or completed)

Table 1: orders (id:integer, user_id:integer[foreign key to users table], order_status:varchar)

Table 2: plugins_orders (id:integer, order_id:integer[foreign key to orders table], product_id:integer[foreign key to plugins table], quantity:integer)
