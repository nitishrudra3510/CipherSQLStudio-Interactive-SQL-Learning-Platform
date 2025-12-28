# Environment Variables Setup

Create a `.env` file in the `backend` directory with the following variables:

```
PORT=5000
MONGO_URI=mongodb+srv://<your_mongo_url>
POSTGRES_URL=postgresql://user:password@localhost:5432/ciphersql
OPENAI_API_KEY=your_api_key_here
```

## Variable Descriptions

- **PORT**: Backend server port (default: 5000)
- **MONGO_URI**: MongoDB connection string (required)
- **POSTGRES_URL**: PostgreSQL connection string (required)
- **OPENAI_API_KEY**: OpenAI API key for hint generation (required)

## Example Values

```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ciphersqlstudio?retryWrites=true&w=majority
POSTGRES_URL=postgresql://postgres:password@localhost:5432/ciphersql
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

