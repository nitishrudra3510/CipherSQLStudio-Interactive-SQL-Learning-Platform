# CipherSQLStudio

A comprehensive SQL learning platform that helps students practice SQL queries in a safe, guided environment with AI-powered hints.

## Features

- 📚 **Assignment Management**: Browse and select SQL assignments with varying difficulty levels
- 🔒 **Secure Query Execution**: Only SELECT queries are allowed, preventing data modification
- 💡 **AI-Powered Hints**: Get guided hints without revealing complete solutions
- 🗄️ **Workspace Isolation**: Each user gets their own PostgreSQL schema for safe practice
- 📊 **Real-time Results**: Execute queries and see results instantly
- 🎨 **Modern UI**: Beautiful, responsive interface built with React and SCSS

## Tech Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** for query execution
- **MongoDB** for assignment storage
- **OpenAI API** for hint generation

### Frontend
- **React** with React Router
- **Vite** for fast development
- **SCSS** for styling
- **Axios** for API calls

## Project Structure

```
CipherSQLStudio/
│
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic (DB, LLM)
│   │   ├── utils/           # Utilities (SQL validation, schema management)
│   │   ├── app.js           # Express app configuration
│   │   └── server.js        # Server entry point
│   ├── .env.example         # Environment variables template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── styles/          # SCSS stylesheets
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- MongoDB (or MongoDB Atlas account)
- OpenAI API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
PORT=5000
MONGO_URI=mongodb+srv://<your_mongo_url>
POSTGRES_URL=postgresql://user:password@localhost:5432/ciphersql
OPENAI_API_KEY=your_api_key_here
```

4. Update the `.env` file with your actual credentials:
   - **MONGO_URI**: Your MongoDB connection string
   - **POSTGRES_URL**: Your PostgreSQL connection string
   - **OPENAI_API_KEY**: Your OpenAI API key

5. Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Database Setup

#### PostgreSQL

1. Create a database named `ciphersql`:
```sql
CREATE DATABASE ciphersql;
```

2. The application will automatically create workspace schemas for users when they start assignments.

#### MongoDB

1. Create a database named `ciphersqlstudio`
2. Create a collection named `assignments`
3. Insert sample assignment documents with the following structure:

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

## API Endpoints

### Assignments

- `GET /api/assignments` - Get all assignments
- `GET /api/assignments/:id` - Get assignment by ID
- `POST /api/assignments/initialize` - Initialize workspace for an assignment

### Query Execution

- `POST /api/query/execute` - Execute SQL query
  ```json
  {
    "sql": "SELECT * FROM users"
  }
  ```

### Hints

- `POST /api/hint/generate` - Generate hint for SQL query
  ```json
  {
    "assignmentId": "assignment1",
    "userSQL": "SELECT * FROM users"
  }
  ```

## Security Features

- **SQL Validation**: Only SELECT queries are allowed
- **Blocked Commands**: INSERT, UPDATE, DELETE, DROP, ALTER, TRUNCATE, CREATE are blocked
- **Workspace Isolation**: Each user gets their own PostgreSQL schema
- **Input Sanitization**: SQL queries are sanitized before execution

## Data Flow

```
User
  ↓
React Frontend
  ↓
Express Backend
  ↓
PostgreSQL (Query Execution) / MongoDB (Assignment Data) / OpenAI (Hints)
  ↓
Result Returned to Frontend
```

## Development

### Backend Development

- Use `npm run dev` for development with nodemon (auto-reload)
- Check console logs for connection status and errors

### Frontend Development

- Use `npm run dev` for development with Vite (hot module replacement)
- The frontend proxies API requests to `http://localhost:5000`

## Production Build

### Frontend

```bash
cd frontend
npm run build
```

The build output will be in the `dist` directory.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Backend server port | No (default: 5000) |
| `MONGO_URI` | MongoDB connection string | Yes |
| `POSTGRES_URL` | PostgreSQL connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key for hints | Yes |

## Troubleshooting

### Backend Issues

- **PostgreSQL connection failed**: Check your `POSTGRES_URL` and ensure PostgreSQL is running
- **MongoDB connection failed**: Verify your `MONGO_URI` and network connectivity
- **OpenAI API errors**: Check your API key and account balance

### Frontend Issues

- **API requests failing**: Ensure the backend is running on port 5000
- **CORS errors**: Check that CORS is enabled in the backend (it should be by default)

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

# CipherSQLStudio-Interactive-SQL-Learning-Platform
