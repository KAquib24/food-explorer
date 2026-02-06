# 🍽️ Food Product Explorer

Food Product Explorer is a web application built using **React** that allows users to search, filter, sort, and explore food products using the **OpenFoodFacts public API**.

---

## 🎯 Objective

To build a responsive and user-friendly web application that enables users to:

* Browse food products
* Search products by name or barcode
* Filter products by category
* Sort products based on different criteria
* View detailed nutritional information of a product

---

## 🚀 Features

### 🏠 Homepage

* Displays a list of food products
* Each product card shows:

  * Product name
  * Product image
  * Category
  * Ingredients (if available)
  * Nutrition grade (A–E)
* Pagination implemented using **Load More** button

---

### 🔍 Search by Product Name

* Search bar to find products by name
* Search input is **debounced** to improve performance and avoid unnecessary API calls

---

### 🔢 Barcode Search

* Users can search products directly using a barcode
* Redirects to the product detail page

---

### 🧩 Filters & Sorting

* Filter products by category
* Sort products by:

  * Name (A–Z, Z–A)
  * Nutrition grade (A → E, E → A)

---

### 📄 Product Detail Page

* Displays detailed information about a product:

  * Product image
  * Ingredients list
  * Nutritional values (energy, fat, carbohydrates, proteins, sugar, salt)
  * Nutrition grade
  * Labels / certifications (if available)
* Handles loading and error states gracefully

---

### 📱 Responsive Design

* Fully responsive UI
* Optimized for mobile, tablet, and desktop screens
* Styled using **Tailwind CSS**

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **State Management:** React Hooks
* **API:** OpenFoodFacts API

---

## 🧠 Architecture & Best Practices

* Component-based architecture
* Clear separation of concerns:

  * Pages handle logic and data fetching
  * Components handle UI only
* Centralized API service layer
* Custom reusable hooks (e.g. debounced search)
* Defensive rendering and error handling
* Clean, readable, and modular code structure

---

## 🌐 API Information

**Base URL:**
[https://world.openfoodfacts.org/](https://world.openfoodfacts.org/)

### Endpoints Used:

* Search products by name

  ```
  /cgi/search.pl?search_terms={name}&json=true
  ```
* Get product by barcode

  ```
  /api/v0/product/{barcode}.json
  ```
* Get categories

  ```
  /categories.json
  ```

> ⚠️ Note:
> OpenFoodFacts is a public API maintained by a non-profit organization.
> Response times may vary and occasional delays or downtime can occur.

---

## ⏱️ Time Taken

**Approximately:** 18–22 hours
(Including planning, UI design, API integration, debugging, optimization, and final polish)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ProductCard.jsx
│   ├── SearchBar.jsx
│   ├── BarcodeSearch.jsx
│   ├── CategoryFilter.jsx
│   └── SortOptions.jsx
│
├── hooks/
│   └── useDebounce.js
│
├── pages/
│   ├── Home.jsx
│   └── ProductDetail.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
├── main.jsx
└── index.css
```

## 🙌 Thank You

Please feel free to reach out if any clarification is required regarding the implementation.
