# MongoDB — Deep Dive (Core MongoDB + Mongoose)

> **Format:** This README explains MongoDB concepts, shows how to connect and perform CRUD using the **native MongoDB Node.js driver (core mongodb)**, demonstrates schema validation in core MongoDB, and finally shows how to build models and perform CRUD using **Mongoose**. Each technical section includes a detailed English explanation followed by the same explanation in **Hindi (written in English script)**.

---

## Table of Contents

1. What is MongoDB? (Concepts & Architecture)
2. BSON, ObjectId, Data Types & How Documents Work
3. Replication, Sharding, and Deployment Patterns
4. Consistency, Transactions & Atomicity
5. Connecting to MongoDB using the **Core MongoDB Node.js Driver**
6. Schema-like Validation in Core MongoDB (collection validators / JSON Schema)
7. CRUD with Core MongoDB (detailed examples with Node.js)
8. Indexes, Projection, Sorting, Pagination, Bulk Operations
9. Introduction to Mongoose: Why use it?
10. Mongoose: Connection, Schema, Model — Example Project
11. CRUD with Mongoose (detailed examples)
12. Advanced Topics: Aggregation Framework, Change Streams, TTL, Transactions
13. Best Practices, Performance Tips & Production Considerations
14. Useful Links & Commands (mongo shell, mongod, mongosh)

---

## 1. What is MongoDB? (Concepts & Architecture)

MongoDB is a distributed, document-oriented NoSQL database that stores data in flexible, JSON-like documents (BSON internally). Unlike relational databases (tables/rows), MongoDB groups related fields together in documents which map naturally to objects in modern programming languages. MongoDB is schemaless by default — you can store documents with different structures in the same collection — but it supports validation and schema enforcement if desired. Key architectural components include the mongod server process, mongos router (used with sharding), replica sets for high availability, and optional sharding for horizontal scaling.

---

## 2. BSON, ObjectId, Data Types & How Documents Work

* **BSON**: Binary JSON — compact, efficient representation (has types like Date, Int32, Int64, Decimal128, Binary).
* **ObjectId**: Default primary key type (`_id`). It's a 12-byte value: 4 bytes timestamp, 5 bytes random value/machine/process, 3 bytes incrementing counter — giving roughly sortable unique ids.
* **Documents**: Key-value pairs; values can be scalars, arrays, nested documents, binary, decimal, etc.
* **Collections**: Logical groups of documents (akin to tables but schemaless).

---

## 3. Replication, Sharding, and Deployment Patterns

* **Replica Set**: A group of `mongod` processes that keep copies of the same data. Provides automatic failover and redundancy. One primary accepts writes; secondaries replicate the primary's oplog and can become primary if needed.
* **Sharding**: Horizontal partitioning of data across multiple shards. Each shard is usually a replica set. A `mongos` query router distributes queries to appropriate shards based on a shard key.
* **Deployment**: Dev (single `mongod`), Prod (replica set + optional sharding), Cloud (MongoDB Atlas) offering managed clusters, backups, monitoring, and global distribution.
---

## 4. Consistency, Transactions & Atomicity

* Single-document operations are atomic in MongoDB: updating a single document is atomic (even if it has multiple fields or arrays).
* Multi-document ACID transactions are supported on replica sets and sharded clusters (since MongoDB 4.0+). Transactions have performance costs and complexity.
* Read concern and write concern allow tuning of durability vs latency (e.g., `w: 1`, `w: majority`, `readConcern: 'majority'`).

---

## 5. Connecting to MongoDB using the Core MongoDB Node.js Driver

Below is a minimal but production-structured example using the official `mongodb` Node.js driver (v4+). Use connection pooling, handle errors, and close the client on shutdown.

```js
// package.json dependencies: "mongodb": "^4.0.0"
const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'myapp_db';

let client;

async function connect() {
  client = new MongoClient(uri, {
    maxPoolSize: 20, // pool size
    w: 'majority',
    retryWrites: true,
  });

  await client.connect();
  console.log('MongoDB connected');
  return client.db(dbName);
}

async function close() {
  if (client) await client.close();
}

module.exports = { connect, close, ObjectId };
```

## 6. Schema-like Validation in Core MongoDB

MongoDB is schemaless by default but supports **collection validators** (JSON Schema) to enforce field types/constraints at the server level. Example creating a collection with JSON Schema validation:

```js
// createCollection with validator
const db = await connect();
await db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name','email'],
      properties: {
        name: { bsonType: 'string', description: 'must be a string' },
        email: { bsonType: 'string', pattern: '^.+@.+$', description: 'must be an email' },
        age: { bsonType: 'int', minimum: 0 }
      }
    }
  },
  validationLevel: 'strict',
  validationAction: 'error'
});
```

This lets you keep the advantages of flexible documents while enforcing important constraints at the DB level.
---

## 7. CRUD with Core MongoDB (Detailed Node.js Examples)

Assume we have a `users` collection. These examples show modern async/await usage.

```js
// crud-core.js
const { connect, ObjectId } = require('./mongoClient');

async function runExamples() {
  const db = await connect();
  const users = db.collection('users');

  // CREATE
  const newUser = { name: 'Alice', email: 'alice@example.com', age: 28 };
  const insertRes = await users.insertOne(newUser);
  console.log('Inserted id:', insertRes.insertedId);

  // READ - findOne
  const user = await users.findOne({ _id: insertRes.insertedId });
  console.log('Found user:', user);

  // READ - find many with projection, sort, limit
  const cursor = users.find({ age: { $gte: 18 } })
                      .project({ name: 1, email: 1 })
                      .sort({ age: -1 })
                      .limit(10);
  const results = await cursor.toArray();

  // UPDATE - updateOne (set)
  const updateRes = await users.updateOne(
    { _id: insertRes.insertedId },
    { $set: { age: 29 }, $currentDate: { updatedAt: true } }
  );
  console.log('ModifiedCount:', updateRes.modifiedCount);

  // UPSERT - update with upsert:true
  await users.updateOne({ email: 'bob@example.com' }, { $set: { name: 'Bob' } }, { upsert: true });

  // DELETE
  const delRes = await users.deleteOne({ _id: insertRes.insertedId });
  console.log('DeletedCount:', delRes.deletedCount);

  // Bulk operations example
  const bulk = users.initializeOrderedBulkOp();
  // NOTE: initializeOrderedBulkOp is older API; prefer bulkWrite for modern code
  // Modern bulk example below:
  await users.bulkWrite([
    { insertOne: { document: { name: 'Bulk1' } } },
    { updateOne: { filter: { name: 'Bulk1' }, update: { $set: { a: 1 } } } },
    { deleteOne: { filter: { name: 'Old' } } }
  ]);
}

runExamples().catch(console.error);
```

Key notes:

* Use `find`, `findOne`, `insertOne`, `insertMany`, `updateOne`, `updateMany`, `deleteOne`, `deleteMany`, `bulkWrite`.
* Use `projection` to return only needed fields.
* Use `skip`/`limit` or range paging (better) for pagination.
* Prefer `bulkWrite` for many mixed operations for performance.
---

## 8. Indexes, Projection, Sorting, Pagination, Bulk Operations

* Create indexes: `db.collection.createIndex({ email: 1 }, { unique: true })` for uniqueness
* Compound indexes, TTL indexes (`expireAfterSeconds`) for session/OTP cleanup
* Use projection (`.project({ field: 1 })`) to reduce network payload
* For pagination prefer range queries on a sort key (e.g., `_id` or createdAt) instead of large `skip` values
* Use `bulkWrite` for mixed insert/update/delete workloads to reduce round trips

---

## 9. Introduction to Mongoose: Why use it?

Mongoose is an ODM (Object Data Modeling) library for Node.js that provides a higher-level API on top of the MongoDB driver. It adds:

* Schemas and Models (stronger structure and validation)
* Middleware (hooks) for lifecycle events (pre/post save)
* Virtuals, getters/setters, custom instance/static methods
* Built-in schema validation and type casting
* Population (ref/joins-like behavior)

Use Mongoose when you want stronger schema modeling, clear domain models, and richer application-level features. If you need maximum control and minimal abstraction, use the native driver.

---

## 10. Mongoose: Connection, Schema, Model — Example Project

Install: `npm i mongoose`

```js
// db.mongoose.js
const mongoose = require('mongoose');

async function connect() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp_db';
  await mongoose.connect(uri, {
    maxPoolSize: 20,
    serverSelectionTimeoutMS: 5000,
    autoIndex: true,
  });
  console.log('Mongoose connected');
}

module.exports = { connect };

// models/User.js
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age: { type: Number, min: 0 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

userSchema.methods.greet = function() { return `Hi ${this.name}`; };

module.exports = model('User', userSchema);
```
---

## 11. CRUD with Mongoose (Detailed Examples)


```js
const mongooseConnect = require('./db.mongoose');
const User = require('./models/User');

async function run() {
  await mongooseConnect.connect();

  // CREATE
  const u = new User({ name: 'Charlie', email: 'charlie@example.com', age: 30 });
  await u.save(); // runs validations, middleware

  // READ
  const found = await User.findOne({ email: 'charlie@example.com' }).select('name email');

  // UPDATE
  const updated = await User.findByIdAndUpdate(found._id, { $set: { age: 31 } }, { new: true, runValidators: true });

  // UPSERT
  await User.updateOne({ email: 'dave@example.com' }, { $set: { name: 'Dave' } }, { upsert: true });

  // DELETE
  await User.deleteOne({ _id: found._id });

  // Query helpers, virtuals, population examples would go here
}

run().catch(console.error);
```

Key Mongoose features in these operations:

* `save()` triggers schema validation and middleware
* `findByIdAndUpdate(..., { new: true, runValidators: true })` returns updated doc and runs validators
* `pre` and `post` middleware for hooks (e.g., hashing passwords before save)
* `populate()` to resolve refs (similar to joins)

---

## 12. Advanced Topics: Aggregation, Change Streams, TTL, Transactions

* **Aggregation Framework**: Powerful pipeline-based data processing (`$match`, `$group`, `$project`, `$lookup`, `$unwind`, etc.). Use for analytics and complex queries.
* **Change Streams**: Listen to real-time changes in collections (requires replica set). Useful for event-driven architectures.
* **TTL Indexes**: `db.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })` — MongoDB removes documents automatically after TTL.
* **Transactions**: Multi-document transactions using session API in the driver and Mongoose's `startSession()`.

---

## 13. Best Practices, Performance Tips & Production Considerations

* Model your schema around queries (query-driven schema design).
* Use indexes for read patterns; avoid over-indexing.
* Prefer projection to reduce network payloads.
* Avoid unbounded arrays inside documents; large arrays cause document growth issues.
* Use connection pooling and set appropriate pool sizes.
* Use replica sets (not standalone) in production for durability and transactions.
* Monitor with MMS/Atlas or Prometheus exporters; watch locks, page faults, index usage, and slow queries.
* Backups: filesystem snapshot, `mongodump`/`mongorestore`, or managed backups in Atlas.


---

## 14. Useful Links & Commands

**Quick shell commands**

```bash
# start mongod (dev)
mongod --dbpath /data/db

# mongo shell (mongosh)
mongosh "mongodb://localhost:27017/myapp_db"

# show collections
> show collections

# create index
> db.users.createIndex({ email: 1 }, { unique: true })

# create collection with validator (from shell)
> db.createCollection('users', { validator: { $jsonSchema: { ... } } })
```

**References & docs**

* Official MongoDB docs: [https://www.mongodb.com/docs](https://www.mongodb.com/docs)
* Node.js driver docs: [https://www.mongodb.com/docs/drivers/node/current/](https://www.mongodb.com/docs/drivers/node/current/)
* Mongoose docs: [https://mongoosejs.com/docs/](https://mongoosejs.com/docs/)

---

## Appendix — Minimal Project Structure Suggestion

```
project-root/
├─ src/
│  ├─ db/ mongoClient.js         # native driver connection
│  ├─ db/ mongoose.js           # mongoose connection
│  ├─ models/ User.js           # Mongoose model
│  ├─ services/ user.core.js    # core driver CRUD for users
│  └─ services/ user.mongoose.js# mongoose CRUD for users
├─ package.json
└─ README.md
```

---

## Closing Notes

This README provides a deep technical path from raw MongoDB usage (core driver) to higher-level modeling with Mongoose. For interview preparation, pay attention to:

* Differences between core driver and Mongoose (control vs convenience)
* How indexing and schema design affect performance
* When to use transactions vs single-document atomic operations

---
