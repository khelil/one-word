import React, { useState, useEffect } from 'react';

function App() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [background, setBackground] = useState('#FFFFFF');

  useEffect(() => {
    fetchWord();
  }, []);

  const fetchWord = async () => {
    try {
      const response = await fetch('https://oneword-backend.onrender.com/api/word-of-the-day');
      const data = await response.json();
      setWord(data.word);
      setDefinition(data.definition);
      setBackground(data.color);
    } catch (error) {
      console.error('Error fetching word:', error);
    }
  };

  const appStyle: React.CSSProperties = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Georgia, serif',
    backgroundColor: background,
    transition: 'background-color 0.5s ease',
    textAlign: 'center',
    padding: '20px',
  };

  const wordStyle: React.CSSProperties = {
    fontSize: '3.5rem',
    marginBottom: '10px',
    textTransform: 'capitalize',
  };

  const definitionStyle: React.CSSProperties = {
    fontSize: '1.7rem',
    maxWidth: '600px',
    marginBottom: '80px',
  };

  const buttonStyle: React.CSSProperties = {
    fontSize: '1rem',
    padding: '10px 20px',
    backgroundColor: '#00000016',
    color: '#000',
    border: '2px solid #000',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  return (
    <div style={appStyle}>
      <h1 style={wordStyle}>{word}</h1>
      <p style={definitionStyle}>{definition}</p>
      <button style={buttonStyle} onClick={fetchWord}>Get new word</button>
    </div>
  );
}

export default App;