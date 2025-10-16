# MongoDB Aggregation with Mongoose — Deep Dive

> This README explains MongoDB aggregation framework in detail using Mongoose, covering all aggregation operators, possible use-cases, edge cases, hidden nuances, and best practices. This guide is written entirely in English script.

---

## Table of Contents

1. Introduction to Aggregation
2. Why Use Aggregation
3. Aggregation Pipeline Basics
4. Stages Overview with Detailed Examples
5. Operators in Aggregation
6. Edge Cases & Hidden Cases
7. Using Aggregation with Mongoose
8. Real-world Use Cases
9. Performance Considerations
10. References

---

## 1. Introduction to Aggregation

MongoDB Aggregation is a framework for performing data processing and transformation on collections. Unlike `find()` queries which return documents, aggregation pipelines allow you to transform, group, filter, sort, and compute new data in multiple stages. The aggregation framework is similar to SQL's `GROUP BY` and `JOIN`, but with a more flexible and document-oriented approach.

**Core Concepts:**

* **Pipeline:** Sequence of stages (`$match`, `$group`, `$project`, etc.)
* **Stages:** Each stage transforms the input documents and passes them to the next stage
* **Expressions:** Computation operators inside stages (`$sum`, `$avg`, `$add`, `$concat`, `$cond`)
* **Documents Flow:** Each stage receives documents from the previous stage and outputs transformed documents

---

## 2. Why Use Aggregation

* Complex analytics queries
* Multi-stage filtering and transformation
* Computation of totals, averages, min/max
* Data restructuring and reshaping
* Handling nested arrays or subdocuments
* Efficient data processing inside the database instead of in application logic

---

## 3. Aggregation Pipeline Basics

**Pipeline Structure:**

```js
[{$stage1: {...}}, {$stage2: {...}}, ...]
```

* **$match:** Filters documents (like `find()`)
* **$group:** Groups documents by a key, computes aggregates
* **$project:** Include/exclude fields, reshape documents
* **$sort:** Sort documents
* **$limit / $skip:** Pagination
* **$unwind:** Deconstruct array fields into multiple documents
* **$lookup:** Join with another collection
* **$addFields / $set:** Add computed fields
* **$replaceRoot / $replaceWith:** Replace root document
* **$facet:** Multiple pipelines in parallel
* **$bucket / $bucketAuto:** Group numeric values into ranges
* **$sortByCount:** Count frequency of values and sort

````

---

## 4. Stages Overview with Detailed Examples

### $match
- Filters documents based on conditions
```js
db.orders.aggregate([{$match: {status: 'shipped'}}]);
````

* Edge case: If no documents match, pipeline returns empty array
* Hidden case: `$expr` can compare fields inside the same document

```js
{$match: {$expr: {$gt: ['$price', '$cost']}}}
```

### $group

* Groups documents by `_id`, computes aggregates (`$sum`, `$avg`, `$min`, `$max`)

```js
{$group: {_id: '$customerId', totalAmount: {$sum: '$amount'}}}
```

* Edge case: `_id` can be `null` to group all documents together
* Hidden: `$first` and `$last` rely on document order; needs `$sort` before `$group`

### $project

* Include/exclude fields, create computed fields

```js
{$project: {name: 1, totalAmount: {$multiply: ['$amount', 1.1]}}}
```

* Edge case: Excluding `_id` by default requires `_id: 0`
* Hidden: Computed fields can use `$cond` for conditional logic

```js
{$project: {discounted: {$cond: {if: {$gte: ['$amount', 100]}, then: 10, else: 0}}}}
```

### $unwind

* Deconstruct arrays into multiple documents

```js
{$unwind: '$items'}
```

* Edge case: Empty arrays remove documents; use `preserveNullAndEmptyArrays: true` to keep them
* Hidden: Can unwind nested paths

### $lookup

* Join collections

```js
{$lookup: {from: 'customers', localField: 'customerId', foreignField: '_id', as: 'customerDetails'}}
```

* Edge case: Unmatched documents result in empty array
* Hidden: Use `$unwind` after `$lookup` to simplify array to single object

### $sort, $limit, $skip

* Sorting before limiting or skipping is crucial
* Edge case: Large skips (>10000) are inefficient; use range queries instead

### $facet

* Run multiple pipelines in parallel

```js
{$facet: {stats: [{$group: {_id: null, total: {$sum: '$amount'}}}], recent: [{$sort: {date: -1}}, {$limit: 5}]}}
```

* Edge case: Empty pipeline returns empty arrays

### $bucket / $bucketAuto

* Group numeric data into ranges
* `$bucket` requires explicit boundaries; `$bucketAuto` calculates automatically
* Edge case: Values outside boundaries go to `default` bucket

### $addFields / $set

* Add new computed fields
* Hidden: Can overwrite existing fields

### $replaceRoot / $replaceWith

* Replace root document with nested object
* Edge case: Invalid paths cause errors

### $sortByCount

* Shortcut for counting frequency and sorting descending

```js
{$sortByCount: '$category'}
```

* Edge case: Null/undefined values are counted as a single group

---

## 5. Operators in Aggregation (Expressions)

### Arithmetic Operators

* `$add`, `$subtract`, `$multiply`, `$divide`, `$mod`
* Edge case: `$divide` by zero throws error; `$mod` with zero divisor invalid

### Array Operators

* `$size`, `$arrayElemAt`, `$concatArrays`, `$filter`, `$map`, `$reduce`
* Edge case: `$arrayElemAt` with out-of-bounds index returns `null`

### Comparison Operators

* `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`, `$cmp`
* Hidden: Can use inside `$expr` to compare fields

### Boolean Operators

* `$and`, `$or`, `$not`, `$nor`

### Conditional Operators

* `$cond`, `$ifNull`, `$switch`
* Hidden: `$cond` can be nested

### String Operators

* `$concat`, `$substr`, `$toUpper`, `$toLower`, `$trim`, `$split`
* Edge case: `$substr` negative or out-of-bound indexes

### Date Operators

* `$dateToString`, `$year`, `$month`, `$dayOfMonth`, `$isoWeek`, `$dateAdd`, `$dateSubtract`
* Hidden: Timezone conversion with `$dateToString`

### Set Operators

* `$setUnion`, `$setIntersection`, `$setDifference`, `$setIsSubset`
* Edge case: Null or missing arrays handled as empty arrays

### Misc Operators

* `$type`, `$literal`, `$rand`
* Hidden: `$rand` generates random number per document; useful in sampling

---

## 6. Edge Cases & Hidden Cases

* `$group` with no input documents returns empty array
* `$unwind` empty array removes document unless `preserveNullAndEmptyArrays: true`
* `$lookup` unmatched results are empty arrays
* `$project` computed fields may override existing fields
* `$sort` after `$group` affects `$first` and `$last`
* `$bucket` values outside boundaries must have `default` bucket
* `$match` with `$expr` can compare fields, which is invisible to beginners
* `$cond` nesting complexity can cause errors
* Using `$limit` before `$sort` gives wrong results

---

## 7. Using Aggregation with Mongoose

```js
const mongoose = require('mongoose');
const Order = require('./models/Order');

async function aggregateOrders() {
  await mongoose.connect('mongodb://localhost:27017/myapp_db');

  const pipeline = [
    {$match: {status: 'shipped'}},
    {$unwind: '$items'},
    {$group: {
      _id: '$customerId',
      totalAmount: {$sum: {$multiply: ['$items.price', '$items.quantity']}},
      lastOrder: {$last: '$date'}
    }},
    {$sort: {totalAmount: -1}},
    {$limit: 10}
  ];

  const result = await Order.aggregate(pipeline);
  console.log(result);
}

aggregateOrders().catch(console.error);
```

* Mongoose `Model.aggregate()` takes an array of stages
* Supports all MongoDB aggregation operators
* Returns a promise with results

---

## 8. Real-world Use Cases

* E-commerce: Top 10 customers by revenue
* Analytics: Sales by month, average order value
* Inventory: Items low in stock, aggregated by category
* Social networks: Count posts per user, top liked posts
* IoT: Average sensor readings per hour/day
* Multi-stage pipelines: `$facet` to get multiple analytics in a single query

---

## 9. Performance Considerations

* Use `$match` early to reduce document flow
* Index fields used in `$match` or `$sort`
* Avoid `$unwind` on large arrays without indexing
* `$group` on large datasets can use `$merge` to persist intermediate results
* Use `$project` to exclude unnecessary fields
* Monitor `explain('executionStats')` for performance insights

---

**End of Aggregation Deep Dive**
