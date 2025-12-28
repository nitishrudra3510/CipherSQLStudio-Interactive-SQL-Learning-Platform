# How to Run CipherSQLStudio

## ⚠️ IMPORTANT: Install Node.js First!

You need Node.js installed to run this project. Download from: https://nodejs.org/

After installing Node.js, **restart your terminal/PowerShell** and follow these steps:

## Quick Start (After Node.js is Installed)

### Step 1: Install Dependencies

**Backend:**
```powershell
cd backend
npm install
```

**Frontend:**
```powershell
cd frontend
npm install
```

### Step 2: Configure Environment

Edit `backend/.env` file with your actual credentials:

```env
PORT=5000
MONGO_URI=mongodb+srv://your_actual_mongo_connection_string
POSTGRES_URL=postgresql://user:password@localhost:5432/ciphersql
OPENAI_API_KEY=sk-your_actual_openai_api_key
```

### Step 3: Set Up Databases

**PostgreSQL:**
1. Install PostgreSQL or use a cloud service
2. Create database: `CREATE DATABASE ciphersql;`
3. Update `POSTGRES_URL` in `.env`

**MongoDB:**
1. Install MongoDB or use MongoDB Atlas
2. Create database `ciphersqlstudio`
3. Create collection `assignments`
4. Add sample assignment (see below)
5. Update `MONGO_URI` in `.env`

### Step 4: Add Sample Assignment to MongoDB

Use MongoDB Compass or mongo shell to insert:

```json
{
  "_id": "assignment1",
  "title": "Basic SELECT Queries",
  "difficulty": "easy",
  "description": "Learn the fundamentals of SELECT statements",
  "question": "Write a query to select all columns from the 'users' table",
  "sampleTables": [
    {
      "name": "users",
      "schema": "id INTEGER PRIMARY KEY, name VARCHAR(100), email VARCHAR(100)",
      "sampleData": [
        { "id": 1, "name": "John Doe", "email": "john@example.com" },
        { "id": 2, "name": "Jane Smith", "email": "jane@example.com" },
        { "id": 3, "name": "Bob Johnson", "email": "bob@example.com" }
      ]
    }
  ]
}
```

### Step 5: Run the Project

**Terminal 1 - Backend:**
```powershell
cd backend
npm start
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

### Step 6: Access the Application

- 🌐 **Frontend**: http://localhost:3000
- 🔌 **Backend API**: http://localhost:5000
- ❤️ **Health Check**: http://localhost:5000/health

## Testing SQL Queries

Once the app is running:

1. Go to http://localhost:3000
2. Click on an assignment
3. The workspace will be initialized with sample tables
4. Write SQL queries in the editor, for example:
   - `SELECT * FROM users;`
   - `SELECT name, email FROM users WHERE id > 1;`
   - `SELECT COUNT(*) FROM users;`
5. Click "Execute Query" to see results

## Troubleshooting

**Node.js not found:**
- Install Node.js from https://nodejs.org/
- Restart terminal after installation
- Verify with: `node --version`

**Database connection errors:**
- Check `.env` file has correct credentials
- Ensure databases are running
- Test PostgreSQL: `psql -U postgres -d ciphersql`
- Test MongoDB connection string

**Port already in use:**
- Change PORT in `backend/.env`
- Or kill process using port 5000/3000

