import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client Connected");
  ws.on("error", (err) => {
    console.error(`Websocket error: ${err}`);
  });
  ws.on("message", (message) => {
    const msg = message.toString();
    if (msg === "ping") {
      ws.send("pong");
    } else {
      ws.send(`You said: ${msg}`);
    }
  });
  ws.send("contected");
});
