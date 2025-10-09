# 📁 Backend Project Folder Structure & Semantic Versioning in Node.js

This document provides a complete and in-depth explanation of **backend folder structure** used in Node.js projects and a detailed understanding of **semantic versioning (SemVer)** — an essential concept for package management and version control in the Node.js ecosystem.

---

## 🏗️ Backend Project Folder Structure (Node.js + Express)

A well-organized backend folder structure improves scalability, readability, and maintainability. Below is a standard structure for a Node.js + Express project:

```bash
backend/
│
├── package.json          # Project metadata and dependencies
├── server.js             # Entry point of the server
├── .env                  # Environment variables
├── .gitignore            # Files ignored by Git
├── README.md             # Project documentation
│
├── src/                  # Source code folder (main logic)
│   ├── config/           # Configuration files (DB, Cloud, etc.)
│   │   ├── db.js         # Database connection setup (MongoDB, MySQL)
│   │   └── cloud.js      # Cloud or storage configuration
│   │
│   ├── models/           # Database models or schemas
│   │   ├── User.js       # User schema/model
│   │   └── Product.js    # Product schema/model
│   │
│   ├── controllers/      # Handle request logic (business logic)
│   │   ├── userController.js
│   │   └── productController.js
│   │
│   ├── routes/           # Route definitions
│   │   ├── userRoutes.js
│   │   └── productRoutes.js
│   │
│   ├── middlewares/      # Custom middlewares (auth, error handling)
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── services/         # Third-party API logic, reusable functions
│   │   ├── emailService.js
│   │   └── paymentService.js
│   │
│   ├── utils/            # Helper functions, constants, validators
│   │   ├── generateToken.js
│   │   └── validateInput.js
│   │
│   ├── public/           # Static files (images, uploads, etc.)
│   │   └── uploads/
│   │
│   ├── app.js            # Express app configuration (use(), routes)
│   └── index.js          # Application bootstrap (connect DB, start server)
│
└── tests/                # Unit and integration tests
    ├── user.test.js
    └── product.test.js
```

### 📘 Folder Explanation

* **package.json** → Contains metadata, dependencies, scripts, and versioning.
* **server.js / index.js** → The main entry point for starting the Express server.
* **src/config/** → Holds environment configurations like database, cloud, and third-party setup.
* **src/models/** → Defines database schemas and ORM models.
* **src/controllers/** → Implements business logic and interacts with models.
* **src/routes/** → Manages API endpoints and maps them to controllers.
* **src/middlewares/** → Custom middlewares like authentication, validation, and error handling.
* **src/services/** → Contains reusable logic like email notifications, payment processing, etc.
* **src/utils/** → General-purpose helper functions and constants.
* **tests/** → Automated testing scripts using Jest or Mocha.
* **public/** → Publicly accessible static files.

### 🧠 Tips for Scalability

* Separate logic using MVC (Model–View–Controller) pattern.
* Keep business logic out of route files.
* Use `.env` for environment variables (avoid committing it).
* Always modularize — each folder should have a single responsibility.
* Add a `logs/` folder for Winston or Morgan-based logging.

---

## 🧮 Semantic Versioning (SemVer) in Node.js

Semantic Versioning is a **standardized version control system** used to manage package versions in Node.js (`package.json`). It helps both developers and automated tools (like npm or yarn) to understand the type of changes made between releases.

### 🧩 Version Format

```
MAJOR.MINOR.PATCH
Example: 2.4.1
```

| Part      | Meaning                    | Example | When to Increment                                              |
| --------- | -------------------------- | ------- | -------------------------------------------------------------- |
| **MAJOR** | Breaking changes           | 2.x.x   | When you make incompatible API changes                         |
| **MINOR** | New features (no breakage) | x.4.x   | When you add new functionality in a backward-compatible manner |
| **PATCH** | Bug fixes                  | x.x.1   | When you fix backward-compatible bugs                          |

### 🧠 Example Scenarios

1. **Bug Fix:**

   * From `1.0.0` → `1.0.1`
   * Fixed a typo or small logic error.

2. **New Feature (Backward Compatible):**

   * From `1.0.0` → `1.1.0`
   * Added a new endpoint `/api/reports`.

3. **Breaking Change:**

   * From `1.0.0` → `2.0.0`
   * Changed existing API responses or removed endpoints.

### 📦 Pre-release Versions

Used for beta, alpha, or RC (Release Candidate) testing.

```
1.0.0-alpha.1
1.0.0-beta.3
1.0.0-rc.2
```

These indicate unstable releases for testing.

### 🔢 npm Versioning Symbols

| Symbol | Example | Meaning                                                 |
| ------ | ------- | ------------------------------------------------------- |
| **^**  | ^1.2.3  | Allows updates to MINOR and PATCH (1.x.x) but not MAJOR |
| **~**  | ~1.2.3  | Allows only PATCH updates (1.2.x)                       |
| **>=** | >=1.2.3 | Accepts any version >= given version                    |
| **<**  | <2.0.0  | Any version less than specified                         |
| *****  | *       | Accepts any version                                     |

### 🧩 Example in `package.json`

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "~7.1.0"
  }
}
```

* Express will automatically update minor/patch versions.
* Mongoose will only update patch versions.

### ⚠️ Edge & Corner Cases

1. **Breaking Change Without Version Bump:**

   * Dangerous practice — always increment MAJOR for breaking changes.
2. **Downgrading:**

   * You can manually install older versions using `npm install package@version`.
3. **0.x.y Versions:**

   * Versions before `1.0.0` are considered unstable — even minor updates may break compatibility.
4. **Dependency Conflicts:**

   * Occur when two packages require different versions of the same dependency. Resolve using `npm dedupe` or `resolutions` in `package.json`.

### 🧭 Checking Version Updates

```bash
npm outdated        # Show available updates
npm update          # Update compatible packages
npm install pkg@latest  # Install the latest stable version
```

### 🧾 Summary

| Concept             | Description                                     |
| ------------------- | ----------------------------------------------- |
| Folder Structure    | Organizes backend code using modular design     |
| MVC Pattern         | Separation of concerns: Model, View, Controller |
| Semantic Versioning | Helps maintain consistency across versions      |
| Major.Minor.Patch   | Defines compatibility and release level         |
| npm Symbols (^, ~)  | Define version flexibility in dependencies      |

---

## 🚀 Conclusion

A clean **backend folder structure** ensures scalability, readability, and easier debugging, while **semantic versioning** ensures smooth collaboration and predictable package behavior. Together, they form the foundation for **maintainable and production-grade Node.js app
