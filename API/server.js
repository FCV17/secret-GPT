const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Port number for your API

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Endpoint to receive the player's message from the game
app.post('/api/send-message', async (req, res) => {
  const userInput = req.body.text; // Get the text input from the request body

  try {
    // Replace the fixed response with the user input echoed back
    const generatedResponse = userInput;

    // Send the generated response back to the game
    res.json({ response: generatedResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
