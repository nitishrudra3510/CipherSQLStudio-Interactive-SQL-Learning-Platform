import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateHint = async (question, userSQL) => {
  try {
    // Check if we have a valid OpenAI API key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      // Return mock hints based on the question content
      return generateMockHint(question, userSQL);
    }

    const systemPrompt = `You are a SQL tutor.

Your job is to help the user by giving a HINT only.
Do NOT provide the full SQL query.
Do NOT write exact syntax.
Explain the logic and approach in simple steps.
Guide the user toward the correct solution without revealing it.

If the user is close, give small directional hints.
If the user is far, explain concepts like SELECT, WHERE, GROUP BY, JOIN, etc.

You are an assistant inside a SQL learning platform.
Your role is to guide learners, not solve problems.
Focus on teaching concepts, not giving final answers.
Always encourage learning by reasoning.`;

    const userPrompt = `User Question:
${question}

User's SQL Attempt:
${userSQL || '(No attempt yet)'}

Please provide a helpful hint to guide the user toward the solution.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating hint:', error);
    // Fallback to mock hint if OpenAI fails
    return generateMockHint(question, userSQL);
  }
};

const generateMockHint = (question, userSQL) => {
  const hints = {
    'select all columns': {
      noAttempt: "💡 **Getting Started**: Think about which SQL keyword is used to retrieve data from a database. You'll need to specify what columns you want and from which table.",
      withAttempt: "🎯 **Good start!** You're on the right track. Remember that '*' is a wildcard that represents 'all columns'. Don't forget the table name after FROM."
    },
    'where': {
      noAttempt: "💡 **Filtering Data**: You need to add a condition to filter your results. Think about which SQL clause is used to specify conditions that rows must meet.",
      withAttempt: "🎯 **Almost there!** You're using the right approach. Check your condition syntax - make sure you're comparing the right column with the right value."
    },
    'join': {
      noAttempt: "💡 **Combining Tables**: When you need data from multiple tables, you need to connect them. Think about what these tables have in common - usually an ID field.",
      withAttempt: "🎯 **Good thinking!** You're working with multiple tables. Make sure you specify how the tables are related (which columns match between them)."
    },
    'count': {
      noAttempt: "💡 **Counting Records**: You need to use an aggregate function to count things. Think about which SQL function counts the number of rows.",
      withAttempt: "🎯 **Nice work!** You're using aggregate functions. Remember that COUNT(*) counts all rows, while COUNT(column) counts non-null values in that column."
    },
    'aggregate': {
      noAttempt: "💡 **Mathematical Operations**: You need functions that perform calculations on groups of rows. Think about functions like COUNT, SUM, AVG, MIN, MAX.",
      withAttempt: "🎯 **Excellent!** You're using aggregate functions correctly. Make sure you're selecting the right combination of functions for the question."
    }
  };

  // Determine hint type based on question content
  let hintType = 'select all columns';
  const questionLower = question.toLowerCase();
  
  if (questionLower.includes('where') || questionLower.includes('older') || questionLower.includes('filter')) {
    hintType = 'where';
  } else if (questionLower.includes('join') || questionLower.includes('combine') || questionLower.includes('along with')) {
    hintType = 'join';
  } else if (questionLower.includes('count') || questionLower.includes('number of')) {
    hintType = 'count';
  } else if (questionLower.includes('sum') || questionLower.includes('avg') || questionLower.includes('total') || questionLower.includes('average')) {
    hintType = 'aggregate';
  }

  const hasAttempt = userSQL && userSQL.trim().length > 0;
  const selectedHints = hints[hintType];
  
  return hasAttempt ? selectedHints.withAttempt : selectedHints.noAttempt;
};
