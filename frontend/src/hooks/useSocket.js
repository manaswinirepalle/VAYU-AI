import { useEffect, useState, useRef } from 'react';

const getWebSocketUrl = () => {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const hostname = window.location.hostname || '127.0.0.1';
  return `${protocol}://${hostname}:8000/ws/aqi`;
};

export function useSocket() {
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const url = getWebSocketUrl();
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      ws.send(JSON.stringify({ type: 'subscribe', message: 'hello' }));
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        setMessage(payload);
      } catch (err) {
        setMessage({ raw: event.data });
      }
    };

    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);

    return () => {
      setConnected(false);
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
  }, []);

  return { connected, message };
}
