# Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js installed (v18+)
- ✅ PostgreSQL running
- ✅ MongoDB running (or MongoDB Atlas account)
- ✅ OpenAI API key

## Installation & Run

### Method 1: Using PowerShell Script (Recommended for Windows)

1. Open PowerShell in the project root directory
2. Run the start script:
```powershell
.\start.ps1
```

### Method 2: Manual Setup

#### 1. Install Dependencies

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

#### 2. Configure Environment

Create `backend/.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://your_mongo_connection_string
POSTGRES_URL=postgresql://user:password@localhost:5432/ciphersql
OPENAI_API_KEY=sk-your-openai-api-key
```

#### 3. Start Servers

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

## Access Application

- 🌐 Frontend: http://localhost:3000
- 🔌 Backend API: http://localhost:5000
- ❤️ Health Check: http://localhost:5000/health

## Next Steps

1. Set up your databases (PostgreSQL and MongoDB)
2. Add sample assignments to MongoDB
3. Start learning SQL! 🚀

For detailed setup instructions, see `SETUP_GUIDE.md`

