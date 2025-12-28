import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const sampleAssignments = [
  {
    "_id": "assignment1",
    "title": "Basic SELECT Queries",
    "difficulty": "easy",
    "description": "Learn the fundamentals of SELECT statements",
    "question": "Write a query to select all columns from the 'users' table",
    "sampleTables": [
      {
        "name": "users",
        "schema": "id INTEGER PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), age INTEGER",
        "sampleData": [
          { "id": 1, "name": "John Doe", "email": "john@example.com", "age": 25 },
          { "id": 2, "name": "Jane Smith", "email": "jane@example.com", "age": 30 },
          { "id": 3, "name": "Bob Johnson", "email": "bob@example.com", "age": 35 },
          { "id": 4, "name": "Alice Brown", "email": "alice@example.com", "age": 28 }
        ]
      }
    ]
  },
  {
    "_id": "assignment2",
    "title": "WHERE Clause Filtering",
    "difficulty": "easy",
    "description": "Learn to filter data using WHERE conditions",
    "question": "Write a query to select users who are older than 25 years",
    "sampleTables": [
      {
        "name": "users",
        "schema": "id INTEGER PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), age INTEGER",
        "sampleData": [
          { "id": 1, "name": "John Doe", "email": "john@example.com", "age": 25 },
          { "id": 2, "name": "Jane Smith", "email": "jane@example.com", "age": 30 },
          { "id": 3, "name": "Bob Johnson", "email": "bob@example.com", "age": 35 },
          { "id": 4, "name": "Alice Brown", "email": "alice@example.com", "age": 28 }
        ]
      }
    ]
  },
  {
    "_id": "assignment3",
    "title": "JOIN Operations",
    "difficulty": "medium",
    "description": "Learn to combine data from multiple tables using JOINs",
    "question": "Write a query to get user names along with their order details",
    "sampleTables": [
      {
        "name": "users",
        "schema": "id INTEGER PRIMARY KEY, name VARCHAR(100), email VARCHAR(100)",
        "sampleData": [
          { "id": 1, "name": "John Doe", "email": "john@example.com" },
          { "id": 2, "name": "Jane Smith", "email": "jane@example.com" },
          { "id": 3, "name": "Bob Johnson", "email": "bob@example.com" }
        ]
      },
      {
        "name": "orders",
        "schema": "id INTEGER PRIMARY KEY, user_id INTEGER, product VARCHAR(100), amount DECIMAL(10,2)",
        "sampleData": [
          { "id": 1, "user_id": 1, "product": "Laptop", "amount": 999.99 },
          { "id": 2, "user_id": 2, "product": "Phone", "amount": 599.99 },
          { "id": 3, "user_id": 1, "product": "Mouse", "amount": 29.99 },
          { "id": 4, "user_id": 3, "product": "Keyboard", "amount": 79.99 }
        ]
      }
    ]
  },
  {
    "_id": "assignment4",
    "title": "Aggregate Functions",
    "difficulty": "medium",
    "description": "Learn to use COUNT, SUM, AVG, MIN, MAX functions",
    "question": "Write a query to find the total number of orders and average order amount",
    "sampleTables": [
      {
        "name": "orders",
        "schema": "id INTEGER PRIMARY KEY, user_id INTEGER, product VARCHAR(100), amount DECIMAL(10,2), order_date DATE",
        "sampleData": [
          { "id": 1, "user_id": 1, "product": "Laptop", "amount": 999.99, "order_date": "2024-01-15" },
          { "id": 2, "user_id": 2, "product": "Phone", "amount": 599.99, "order_date": "2024-01-16" },
          { "id": 3, "user_id": 1, "product": "Mouse", "amount": 29.99, "order_date": "2024-01-17" },
          { "id": 4, "user_id": 3, "product": "Keyboard", "amount": 79.99, "order_date": "2024-01-18" },
          { "id": 5, "user_id": 2, "product": "Monitor", "amount": 299.99, "order_date": "2024-01-19" }
        ]
      }
    ]
  },
  {
    "_id": "assignment5",
    "title": "Advanced Filtering",
    "difficulty": "hard",
    "description": "Master complex WHERE conditions with multiple criteria",
    "question": "Find users who have placed orders worth more than $500 and ordered in January 2024",
    "sampleTables": [
      {
        "name": "users",
        "schema": "id INTEGER PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), city VARCHAR(50)",
        "sampleData": [
          { "id": 1, "name": "John Doe", "email": "john@example.com", "city": "New York" },
          { "id": 2, "name": "Jane Smith", "email": "jane@example.com", "city": "Los Angeles" },
          { "id": 3, "name": "Bob Johnson", "email": "bob@example.com", "city": "Chicago" },
          { "id": 4, "name": "Alice Brown", "email": "alice@example.com", "city": "Houston" }
        ]
      },
      {
        "name": "orders",
        "schema": "id INTEGER PRIMARY KEY, user_id INTEGER, product VARCHAR(100), amount DECIMAL(10,2), order_date DATE",
        "sampleData": [
          { "id": 1, "user_id": 1, "product": "Laptop", "amount": 999.99, "order_date": "2024-01-15" },
          { "id": 2, "user_id": 2, "product": "Phone", "amount": 599.99, "order_date": "2024-01-16" },
          { "id": 3, "user_id": 1, "product": "Mouse", "amount": 29.99, "order_date": "2024-01-17" },
          { "id": 4, "user_id": 3, "product": "Keyboard", "amount": 79.99, "order_date": "2024-01-18" },
          { "id": 5, "user_id": 2, "product": "Monitor", "amount": 299.99, "order_date": "2024-01-19" },
          { "id": 6, "user_id": 4, "product": "Tablet", "amount": 799.99, "order_date": "2024-01-20" }
        ]
      }
    ]
  }
];

async function populateDatabase() {
  let client;
  
  try {
    console.log('Connecting to MongoDB...');
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    
    const db = client.db('ciphersqlstudio');
    const collection = db.collection('assignments');
    
    // Clear existing assignments
    console.log('Clearing existing assignments...');
    await collection.deleteMany({});
    
    // Insert sample assignments
    console.log('Inserting sample assignments...');
    const result = await collection.insertMany(sampleAssignments);
    
    console.log(`✅ Successfully inserted ${result.insertedCount} assignments`);
    console.log('Assignment IDs:', Object.values(result.insertedIds));
    
    // Verify the data
    const count = await collection.countDocuments();
    console.log(`📊 Total assignments in database: ${count}`);
    
  } catch (error) {
    console.error('❌ Error populating database:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 MongoDB connection closed');
    }
  }
}

populateDatabase();