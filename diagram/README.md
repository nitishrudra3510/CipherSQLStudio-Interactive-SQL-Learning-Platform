# Data Flow Diagram

This directory is intended to contain the data flow diagram for CipherSQLStudio.

## Data Flow Overview

```
User
  ↓
React Frontend (Port 3000)
  ↓
Express Backend (Port 5000)
  ↓
├── PostgreSQL (Query Execution)
│   └── Workspace Schema: workspace_userId
│
├── MongoDB (Assignment Data)
│   └── Database: ciphersqlstudio
│   └── Collection: assignments
│
└── OpenAI API (Hint Generation)
    └── GPT-4 Model
```

## Hint Generation Flow

```
User → Backend → OpenAI API → Hint → UI
```

## Query Execution Flow

1. User submits SQL query
2. Backend validates query (SELECT only)
3. Backend sanitizes query
4. Backend sets workspace schema
5. PostgreSQL executes query
6. Results returned to frontend
7. Results displayed in table

