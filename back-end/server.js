// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAIService = require('./OpenAIService'); // Importe a classe

const app = express();

app.use(bodyParser.json());
app.use(cors());

const apiKey = 'SUA_CHAVE_DE_API_DA_OPENAI';
const openaiService = new OpenAIService(apiKey); // Instancie a classe

app.post('/api/send-message', async (req, res) => {
  const message = req.body.message;

  try {
    const responseFromOpenAI = await openaiService.sendMessageToOpenAI(message);
    res.json(responseFromOpenAI);
  } catch (error) {
    console.error('Error sending message to OpenAI:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
