import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

function App() {
  const [msg, setMsg] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const location = useLocation();

  useEffect(() => {
    // Get the code from URL parameters
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    // Set up WebSocket connection
    const ws = new WebSocket('ws://localhost:9000');

    // Connection opened
    ws.onopen = () => {
      setConnectionStatus('Connected');
      console.log("Connected to WebSocket server");
    };

    // Handle incoming WebSocket messages
    ws.onmessage = (event) => {
      let receivedMsg = '';
      try {
        // Parse the incoming JSON message
        const data = JSON.parse(event.data);

        // Extract the message field
        receivedMsg = data.message;

        // Check if the received message matches the code from URL
        if (receivedMsg === code) {
          setMsg(`Display: ${receivedMsg}`);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    // Handle connection errors
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus('Error: Unable to connect');
    };

    // Connection closed
    ws.onclose = (event) => {
      console.warn("WebSocket connection closed:", event);
      setConnectionStatus('Disconnected');
    };

    // Clean up WebSocket on component unmount
    return () => {
      ws.close();
    };
  }, [location.search]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{msg || 'Waiting for message...'}</h1>
        <p>{connectionStatus}</p> {/* Display the connection status */}
      </header>
    </div>
  );
}

export default App;
