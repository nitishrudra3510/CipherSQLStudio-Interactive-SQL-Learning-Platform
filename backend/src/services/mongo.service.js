import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let client = null;
let db = null;

export const connectMongo = async () => {
  if (client) {
    return client;
  }

  try {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    db = client.db('ciphersqlstudio');
    console.log('Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const getDatabase = async () => {
  if (!db) {
    await connectMongo();
  }
  return db;
};

export const getAssignment = async (assignmentId) => {
  try {
    const database = await getDatabase();
    const collection = database.collection('assignments');

    const assignment = await collection.findOne({ _id: assignmentId });

    if (!assignment) {
      return null;
    }

    return {
      id: assignment._id,
      title: assignment.title,
      difficulty: assignment.difficulty,
      description: assignment.description,
      question: assignment.question,
      sampleTables: assignment.sampleTables || []
    };
  } catch (error) {
    console.error('Error fetching assignment:', error);
    throw error;
  }
};

export const getAllAssignments = async () => {
  try {
    const database = await getDatabase();
    const collection = database.collection('assignments');

    const assignments = await collection.find({}).toArray();

    return assignments.map(assignment => ({
      id: assignment._id,
      title: assignment.title,
      difficulty: assignment.difficulty,
      description: assignment.description,
      question: assignment.question,
      sampleTables: assignment.sampleTables || []
    }));
  } catch (error) {
    console.error('Error fetching assignments:', error);
    throw error;
  }
};

export const closeMongo = async () => {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
};
