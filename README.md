# Restaurant Management System

This project is a Restaurant Management System built using Node.js, Express, and PostgreSQL as server-side and React as a client-side.

## User Service(Logic that you need implement in the code and database)

1. You need create in database those tables: `users`, `user_secrets`, `roles`, `user_roles`. `user` table is the main others not necessary
2. Setup Express server and connect to database then implement all logic in server side
3. Then create routes where we gonna implement into client-side(react) to retrieve or send data

### users table

Stores basic user information.

- `id`: Unique identifier for the user.
- `name`: Full name of the user.
- `email`: Unique email address of the user.
- `phone_number`: Contact number of the user.
- `address`: Physical address of the user.
- `created_at`: Timestamp when the user was created.
- `updated_at`: Timestamp when the user was last updated.

### user_secrets table

Stores sensitive information like passwords.

- `id`: Unique identifier for the user secret.
- `user_id`: Foreign key referencing the `users` table.
- `password`: password of the user.
- `created_at`: Timestamp when the password was created.
- `updated_at`: Timestamp when the password was last updated.

### roles

Stores different roles that a user can have.

- `id`: Unique identifier for the role.
- `role_name`: Name of the role ('user', 'admin').

### user_roles

Manages the many-to-many relationship between users and roles.

- `user_id`: Foreign key referencing the `users` table.
- `role_id`: Foreign key referencing the `roles` table.

### API Endpoints Users

- **Read All Users**: `GET /users`
- **Create User**: `POST /users`
- **Login User**: `POST /users/login`
- **Read User by ID**: `GET /users/:id`
- **Update User by ID**: `PUT /users/:id`
- **Delete User by ID**: `DELETE /users/:id`

## Menu Service(Logic waht you need implement in the code and database)

1. You need create in database those tables: `categories`, `menu_items`. `menu_items` table is the main others not necessary
2. Setup Express server and connect to database then implement all logic in server side
3. Then create routes where we gonna implement into client-side(react) to retrieve or send data

### categories

Stores different categories of menu items.

- `id`: Unique identifier for the category.
- `category_name`: Name of the category ('appetizer', 'main course', 'dessert').

### menu_items

Stores details of menu items.

- `id`: Unique identifier for the menu item.
- `name`: Name of the menu item.
- `description`: Description of the menu item.
- `price`: Price of the menu item.
- `category_id`: Foreign key referencing the `categories` table.
- `created_at`: Timestamp when the menu item was created.
- `updated_at`: Timestamp when the menu item was last updated.

### API Endpoints Menus

- **Read All Menu Items**: `GET /menu`
- **Create Menu Item**: `POST /menu`
- **Read Menu Item by ID**: `GET /menu/:id`
- **Update Menu Item by ID**: `PUT /menu/:id`
- **Delete Menu Item by ID**: `DELETE /menu/:id`

## Order Service(Logic waht you need implement in the code and database)

1. You need create in database those tables: `order_status`, `orders`, `order_items`. `orders` table is the main others not necessary
2. Setup Express server and connect to database then implement all logic in server side
3. Then create routes where we gonna implement into client-side(react) to retrieve or send data

### order_status

Stores different statuses of orders.

- `id`: Unique identifier for the status.
- `status_name`: Name of the status ('placed', 'preparing', 'ready', 'served', 'paid').

### orders

Stores orders placed by users.

- `id`: Unique identifier for the order.
- `customer_id`: Foreign key referencing the `users` table.
- `total`: Total price of the order.
- `status_id`: Foreign key referencing the order_statuses table.
- `order_time`: Timestamp when the order was placed.

### order_items

Stores items included in each order.

- `id`: Unique identifier for the order item.
- `order_id`: Foreign key referencing the `orders` table.
- `menu_item_id`: Foreign key referencing the `menu_items` table.
- `quantity`: Quantity of the menu item in the order.
- `created_at`: Timestamp when the order item was created.
- `updated_at`: Timestamp when the order item was last updated.

### API Endpoints Orders

- **Create Order for a User**: `POST /orders`
- **Read Orders for a User**: `GET /orders/user/:userId`
- **Read Order for a User**: `GET /orders/user/:userId/:orderId`
- **Delete Order for a User**: `DELETE /orders/user/:userId/:orderId`
