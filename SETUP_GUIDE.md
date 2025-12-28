# CipherSQLStudio - Setup and Run Guide

## Prerequisites

Before running this project, you need to install:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - This will also install npm (Node Package Manager)

2. **PostgreSQL** (v12 or higher)
   - Download from: https://www.postgresql.org/download/
   - Or use a cloud service like Supabase, Railway, etc.

3. **MongoDB** 
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

4. **OpenAI API Key**
   - Get from: https://platform.openai.com/api-keys

## Step 1: Install Node.js Dependencies

### Backend Dependencies
```bash
cd backend
npm install
```

### Frontend Dependencies
```bash
cd frontend
npm install
```

## Step 2: Configure Environment Variables

1. Navigate to the `backend` directory
2. Create a `.env` file (copy from `ENV_SETUP.md` or use the template below)

### Backend .env File Template

Create `backend/.env` with the following content:

```env
PORT=5000
MONGO_URI=mongodb+srv://<your_mongo_url>
POSTGRES_URL=postgresql://user:password@localhost:5432/ciphersql
OPENAI_API_KEY=your_api_key_here
```

**Replace with your actual values:**
- `MONGO_URI`: Your MongoDB connection string
- `POSTGRES_URL`: Your PostgreSQL connection string
- `OPENAI_API_KEY`: Your OpenAI API key

## Step 3: Set Up Databases

### PostgreSQL Setup
1. Create a database named `ciphersql`:
```sql
CREATE DATABASE ciphersql;
```

2. The application will automatically create workspace schemas for users.

### MongoDB Setup
1. Create a database named `ciphersqlstudio`
2. Create a collection named `assignments`
3. Insert sample assignment (see example below)

#### Sample Assignment Document

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
        { "id": 2, "name": "Jane Smith", "email": "jane@example.com" }
      ]
    }
  ]
}
```

## Step 4: Run the Project

### Option A: Run in Separate Terminals

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option B: Run Both (PowerShell)

**Backend (in background):**
```powershell
cd backend; Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"
```

**Frontend:**
```powershell
cd frontend; npm run dev
```

## Step 5: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## Troubleshooting

### Node.js Not Found
- Make sure Node.js is installed
- Restart your terminal after installation
- Check PATH environment variable

### Database Connection Errors
- Verify database credentials in `.env`
- Ensure databases are running
- Check firewall settings

### Port Already in Use
- Change PORT in `.env` for backend
- Change port in `vite.config.js` for frontend

### Module Not Found Errors
- Run `npm install` in both backend and frontend directories
- Delete `node_modules` and `package-lock.json`, then reinstall

## Quick Start Script (Windows PowerShell)

Save this as `start.ps1` in the project root:

```powershell
# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm start"

# Wait a bit
Start-Sleep -Seconds 3

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
```

Then run: `.\start.ps1`

