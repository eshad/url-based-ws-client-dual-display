# WebSocket Client Display

This project is a simple React app that displays messages received over a WebSocket connection. The message displayed is determined by a URL parameter (`code`) and the message content from the WebSocket server.

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/websocket-client-display.git
   cd websocket-client-display
2. **Install dependencies:**
3. ```bash
   npm install
   npm start
4. **URL Format:**
  ```bash
http://localhost:3000/?code=A
```

5. **Json format**
   ```bash
   {"commandStr": "broadcast",  "message": "A"}

