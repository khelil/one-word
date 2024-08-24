import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [background, setBackground] = useState('#FFFFFF');
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchWord();
      fetchedRef.current = true;
    }
  }, []);

  const fetchWord = async () => {
    setIsLoading(true);
    setFadeIn(false);
    try {
      const response = await fetch('https://oneword-backend.onrender.com/api/word-of-the-day');
      const data = await response.json();
      setWord(data.word);
      setDefinition(data.definition);
      setBackground(data.color);
    } catch (error) {
      console.error('Error fetching word:', error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setFadeIn(true), 50); // Slight delay to ensure DOM update
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

  const contentStyle: React.CSSProperties = {
    opacity: fadeIn ? 1 : 0,
    transition: 'opacity 0.5s ease-in',
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
    fontFamily: 'Georgia, serif',
    fontSize: '1rem',
    padding: '10px 20px',
    backgroundColor: isHovered ? '#000' : '#00000016',
    color: isHovered ? '#fff' : '#000',
    border: '2px solid #000',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
  };

  const loaderStyle: React.CSSProperties = {
    fontSize: '3rem',
    marginBottom: '20px',
  };

  const dotStyle: React.CSSProperties = {
    animation: 'blink 1.4s infinite both',
    animationDelay: '0s',
  };

  const Loader = () => (
    <div style={loaderStyle}>
      <span style={dotStyle}>.</span>
      <span style={{...dotStyle, animationDelay: '0.2s'}}>.</span>
      <span style={{...dotStyle, animationDelay: '0.4s'}}>.</span>
    </div>
  );

  return (
    <div style={appStyle}>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={contentStyle}>
          <h1 style={wordStyle}>{word}</h1>
          <p style={definitionStyle}>{definition}</p>
          <button 
            style={buttonStyle} 
            onClick={() => {
              fetchedRef.current = false;
              fetchWord();
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            I know this word
          </button>
        </div>
      )}
    </div>
  );
}

export default App;