# Modern Coffee Shop REST API

A simple REST API for managing a modern coffee shop menu, built with Node.js and Express 5.

This project was developed as a midterm assignment for the REST API course.

## Student Information

| Information | Details                    |
|---|----------------------------|
| Name | Nabyl Jawahir              |
| NIM | 20250040073                |
| Project Theme | Modern Coffee Shop         |
| Course | PLATFORM-BASED PROGRAMMING |

Video Demonstration: https://youtu.be/w-VPom-YYl8?si=wA0lMA3t629rDy1O

## Technologies Used

- Node.js
- Express.js 5
- Nodemon
- JavaScript (CommonJS)
- Thunder Client / Postman for API testing

## Project Structure

```text
midterm-20250040073-nabyl/
├── index.js
├── middleware.js
├── routes/
│   └── menus.js
├── screenshots/
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/nabyljawahir-777/midterm-20250040073-nabyl
   ```

2. Navigate to the project directory:

   ```bash
   cd midterm-20250040073-nabyl
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Running the Server

Start the development server using:

```bash
npm run dev
```

The server will run at:

```text
http://localhost:3000
```

## Initial Menu Data

The API contains eight initial menu items divided into four categories:

| ID | Name | Category | Price | Stock |
|---|---|---|---:|---:|
| 1 | Caramel Macchiato | Coffee | 28000 | 20 |
| 2 | Iced Americano | Coffee | 22000 | 25 |
| 3 | Matcha Latte | Non-Coffee | 27000 | 15 |
| 4 | Chocolate Milk | Non-Coffee | 24000 | 18 |
| 5 | Butter Croissant | Pastry | 22000 | 12 |
| 6 | Blueberry Muffin | Pastry | 18000 | 10 |
| 7 | Classic Tiramisu | Dessert | 32000 | 8 |
| 8 | New York Cheesecake | Dessert | 35000 | 7 |

All data is stored in an in-memory JavaScript array. Data will reset when the server restarts.

## API Endpoints

Base URL:

```text
http://localhost:3000
```

### 1. Welcome Route

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Display API welcome information |

### 2. Menu Management (CRUD)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/menus` | Retrieve all menu items |
| GET | `/menus/:id` | Retrieve a menu item by ID |
| POST | `/menus` | Create a new menu item |
| PUT | `/menus/:id` | Update an existing menu item |
| DELETE | `/menus/:id` | Delete a menu item |

### 3. Category Filtering

| Method | Endpoint | Description |
|---|---|---|
| GET | `/menus/category` | Retrieve all menu items |
| GET | `/menus/category/:name` | Filter menu items by category |

Available categories:

- Coffee
- Non-Coffee
- Pastry
- Dessert

Category filtering is case-insensitive.

### 4. Wildcard Route

| Method | Endpoint | Description |
|---|---|---|
| GET | `/files/*path` | Capture multiple path segments |

Example:

```text
GET /files/images/products/coffee
```

Example response:

```json
{
  "success": true,
  "message": "Wildcard route accessed successfully",
  "path": [
    "images",
    "products",
    "coffee"
  ]
}
```

## Request Examples

### Create a Menu Item

**POST** `/menus`

```json
{
  "name": "Vanilla Latte",
  "category": "Coffee",
  "price": 30000,
  "stock": 15
}
```

### Update a Menu Item

**PUT** `/menus/1`

```json
{
  "name": "Caramel Macchiato",
  "category": "Coffee",
  "price": 30000,
  "stock": 25
}
```

### Delete a Menu Item

**DELETE** `/menus/1`

Authentication is required.

## Authentication

The DELETE endpoint is protected by authentication middleware.

Include the following HTTP header:

```text
Authorization: Bearer coffee-shop-secret
```

Requests without a valid token will receive:

```json
{
  "success": false,
  "message": "Unauthorized: Invalid or missing authentication token"
}
```

## Input Validation

The API validates incoming menu data:

- Name must be a non-empty string.
- Category must be a non-empty string.
- Price must be a valid non-negative number.
- Stock must be a non-negative integer.

Invalid input returns HTTP `400 Bad Request`.

## Middleware

This project implements the following middleware:

| Middleware | Responsibility |
|---|---|
| `logger` | Logs HTTP methods and request URLs |
| `requireAuth` | Protects the DELETE endpoint |
| `notFound` | Handles unknown routes |
| `errorHandler` | Handles application errors centrally |

## Error Handling

The API uses consistent JSON error responses.

Example:

```json
{
  "success": false,
  "message": "Menu not found"
}
```

Common HTTP status codes:

| Status | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |


## Testing

All API endpoints were tested using Thunder Client in IntelliJ IDEA.

A total of 12 screenshots are provided in the `screenshots/` directory, covering:

1. Welcome route
2. Retrieve all menus
3. Retrieve menu by ID
4. Create a menu item
5. Update a menu item
6. Delete without authentication
7. Delete with authentication
8. Filter menus by category
9. Filter dessert category
10. Wildcard route
11. Invalid input validation
12. Unknown route handling

These screenshots demonstrate the API responses and HTTP status codes for the tested endpoints.

## Notes

- This project uses an in-memory array instead of a database.
- Menu data is not persistent and resets when the server restarts.
- The project uses Express 5 and its routing syntax.
- Authentication uses a simple demonstration token and is not intended for production security.

