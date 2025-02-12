import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const rooms = new Map();

function generateText(wordCount) {
  const words = [
    "the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog",
    "typing", "game", "practice", "speed", "accuracy", "improve"
  ];
  const result = [];
  for (let i = 0; i < wordCount; i++) {
    result.push(words[Math.floor(Math.random() * words.length)]);
  }
  return result.join(" ");
}

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ roomCode, playerName }) => {
    socket.join(roomCode);
    
    if (!rooms.has(roomCode)) {
      rooms.set(roomCode, {
        players: [],
        text: generateText(25)
      });
    }
    
    const room = rooms.get(roomCode);
    room.players.push({
      id: socket.id,
      name: playerName,
      progress: 0,
      wpm: 0,
      accuracy: 100
    });
    
    io.to(roomCode).emit('playerProgress', {
      players: room.players
    });
  });
  
  socket.on('startRace', ({ roomCode }) => {
    const room = rooms.get(roomCode);
    if (room) {
      io.to(roomCode).emit('gameStart', {
        text: room.text
      });
    }
  });
  
  socket.on('updateProgress', ({ roomCode, playerName, progress, wpm, accuracy }) => {
    const room = rooms.get(roomCode);
    if (room) {
      const player = room.players.find(p => p.name === playerName);
      if (player) {
        player.progress = progress;
        player.wpm = wpm;
        player.accuracy = accuracy;
        
        io.to(roomCode).emit('playerProgress', {
          players: room.players
        });
      }
    }
  });
  
  socket.on('sendMessage', ({ roomCode, playerName, message }) => {
    io.to(roomCode).emit('chatMessage', {
      id: Date.now(),
      playerName,
      message
    });
  });
  
  socket.on('disconnect', () => {
    rooms.forEach((room, roomCode) => {
      const playerIndex = room.players.findIndex(p => p.id === socket.id);
      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1);
        io.to(roomCode).emit('playerProgress', {
          players: room.players
        });
      }
    });
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});