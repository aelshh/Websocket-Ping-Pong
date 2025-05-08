import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const messageRef = useRef<HTMLInputElement>(null);

  function sendMessage() {
    if (socket && messageRef.current) {
      const message = messageRef.current.value;
      socket.send(message);
    }
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onmessage = (ev: MessageEvent) => {
      alert(ev.data);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <div>
        <input type="message" ref={messageRef} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
}

export default App;
