const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;

const words = require('./words');
const colors = require('./colors');

app.use(cors());

app.get('/api/word-of-the-day', async (req, res) => {
  try {
    let randomIndex, randomWord, randomColor, definition;
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      randomIndex = Math.floor(Math.random() * words.length);
      randomWord = words[randomIndex];
      randomColor = colors[randomIndex];

      try {
        // Fetch the definition from the Free Dictionary API
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
        definition = response.data[0].meanings[0].definitions[0].definition;
        break; // Exit the loop if we successfully get a definition
      } catch (error) {
        if (error.response && error.response.status === 404) {
          attempts++;
          console.log(`No definition found for "${randomWord}". Trying another word...`);
        } else {
          throw error; // Rethrow other errors
        }
      }
    }

    if (!definition) {
      // If we couldn't find a definition after maxAttempts, send a fallback response
      res.json({ word: randomWord, definition: "Definition not available", color: randomColor });
    } else {
      res.json({ word: randomWord, definition, color: randomColor });
    }
  } catch (error) {
    console.error('Error fetching word:', error);
    res.status(500).json({ error: 'Failed to fetch word' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});