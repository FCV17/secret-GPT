const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const apiKey = process.env.OPENAI_API_KEY; // Retrieve the API key from environment variable

app.post('/api/send-message', async (req, res) => {
  const userInput = req.body.text;

  try {
    const endpointURL = 'https://api.openai.com/v1/chat/completions';
    console.log('API endpoint:', endpointURL);

    const response = await fetch(endpointURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}` // Use the apiKey variable
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userInput }
        ]
      })
    });

    console.log('Response:', response.status, response.statusText);
    
    const { choices } = await response.json();

    if (choices && choices.length > 0) {
      const generatedResponse = choices[0].message.content.trim();
      res.json({ response: generatedResponse });
    } else {
      res.status(500).json({ error: 'No response from the OpenAI API' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
