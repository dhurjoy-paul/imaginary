# Imaginary Store 🛒

A simple **Next.js 15** (App Router) project with **MongoDB** integration.  
This app demonstrates how to fetch products from MongoDB and display them on the frontend using API routes.

---

## 🚀 Features

- Next.js 15 (with Turbopack)
- MongoDB Atlas connection via `lib/mongodb.js`
- REST API routes (`/api/products`, `/api/products/random`)
- Product listing with formatted prices

---

## ⚙️ Setup & Installation

## Clone Repository

```bash
git clone https://github.com/your-username/imaginary.git
cd imaginary
npm install
```

Create a .env.local file in the root of your project:

```
MONGODB_URI=your-mongodb-atlas-connection-string
MONGODB_DB=imaginaryDB
```

Start Development Server

```
npm run dev
```

---

## 📦 Project Structure

```
src/
├─ app/
│ ├─ api/
│ │ └─ products/
│ │ ├─ route.js # GET all products
│ │ └─ random/route.js # GET one random product
│ └─ page.js # Homepage
└─ lib/
└─ mongodb.js # MongoDB connection
```

## 🌐 Route Summary

### API Routes

```
GET /api/products
→ Returns all products from MongoDB.

GET /api/products/random
→ Returns one random product.
```

### Pages

```
/
→ Homepage

/products
→ All products
```
