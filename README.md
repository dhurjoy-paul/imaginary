# imaginary Store 🛒

A simple **Next.js 15.5.0** (App Router) project with **MongoDB** integration.  
This app demonstrates how to fetch products from MongoDB and display them on the frontend using API routes.

## 🚀 Features

- Used **NEXT Auth** for secure authentication
- **MongoDB** was used as a Database
- Product adding page is **protected**
- Users will get **real-time** product buying feel across the site
- Related product suggestions
- Used **NEXT.JS** also for backend

## ⚙️ Setup & Installation

## Clone Repository

```bash
git clone https://github.com/your-username/imaginary.git
cd imaginary
npm install
```

Create a .env.local file in the root of your project:

```
NEXTAUTH_SECRET=<your random code>
GOOGLE_CLIENT_ID=<google client id>
GOOGLE_CLIENT_SECRET=<google client secret>
MONGODB_URI=<which contains admin, password and db name>
MONGODB_DB=<db name>
```

Start Development Server

```
npm run dev
```

---

## 🌐 Route Summary

### Pages Routes

```
/
→ Homepage

/products
→ All products

/dashboard/add-product
→ Add product

/login
→ Login page
```

### API Routes

```
GET /api/products
→ Returns all products from MongoDB.

GET /api/products/:id
→ Returns single matched product from MongoDB.

GET /api/products/random
→ Returns random product(s).

POST /api/products
→ Adds product to MongoDB.
```

## 📦 Project Structure

```
imaginary
├─ jsconfig.json
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ public
├─ README.md
└─ src
   ├─ app
   │  ├─ api
   │  │  ├─ auth
   │  │  │  └─ [...nextauth]
   │  │  │     └─ route.js
   │  │  └─ products
   │  │     ├─ random
   │  │     │  └─ route.js
   │  │     ├─ route.js
   │  │     └─ [id]
   │  │        └─ route.js
   │  ├─ dashboard
   │  │  └─ add-product
   │  │     └─ page.js
   │  ├─ favicon.ico
   │  ├─ globals.css
   │  ├─ layout.js
   │  ├─ login
   │  │  └─ page.js
   │  ├─ page.js
   │  ├─ products
   │  │  ├─ page.js
   │  │  └─ [id]
   │  │     └─ page.js
   │  └─ providers.js
   ├─ components
   │  ├─ Footer.js
   │  ├─ Loading.js
   │  └─Navbar.js
   └─ lib
      └─ mongodb.js

```
