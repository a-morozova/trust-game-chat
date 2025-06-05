const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {
  try {
    const messages = req.body.messages;

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: messages,
    });

    res.json(chatResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error communicating with OpenAI.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
