import React, { useState } from 'react';
import './SentimentAnalysis.css'

const SentimentAnalysis: React.FC = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleAnalyzeSentiment = async () => {
    setIsLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text })
    };

    try {
      const response = await fetch('https://sentiment-ai-tool-piowb3dr3q-ey.a.run.app/sentiment/', requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSentiment(data.sentiment);
    } catch (error) {
      console.error("There was an error!", error);
      setSentiment('Error analyzing sentiment');
    }
    setIsLoading(false);
  };

  return (
<div className='sentiment-card'>
      <h1 className='bold-text'>Sentiment Analysis</h1>
      <textarea className='sentiment-textarea madefor-text' value={text} onChange={handleTextChange} disabled={isLoading} />
      <button className='analyze-button madefor-text' onClick={handleAnalyzeSentiment} disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
      </button>
      <p className='madefor-text'>Sentiment: {sentiment}</p>
    </div>
  );
};

export default SentimentAnalysis;