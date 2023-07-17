const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/send-message', async (req, res) => {
  const userInput = req.body.text;

  try {
    const fetch = require('node-fetch'); // Use dynamic import instead of require
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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' // Replace with your OpenAI API key
      },
      body: JSON.stringify({
        prompt: userInput,
        max_tokens: 50,
        temperature: 0.7,
        n: 1,
        stop: ['\n']
      })
    });

    const { choices } = await response.json();
    const generatedResponse = choices[0].text.trim();

    res.json({ response: generatedResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
