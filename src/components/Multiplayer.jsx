import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Multiplayer = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const [wordCount, setWordCount] = useState('25');
  const [roomCode, setRoomCode] = useState('');
  const [publicRooms, setPublicRooms] = useState([]);

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateRoom = () => {
    if (!roomName) {
      alert('Please enter a room name');
      return;
    }

    const newRoomCode = generateRoomCode();
    const newRoom = {
      code: newRoomCode,
      name: roomName,
      wordCount,
      players: 1
    };

    setPublicRooms([...publicRooms, newRoom]);
    navigate(`/game-room/${newRoomCode}`, {
      state: {
        roomName,
        wordCount,
        roomCode: newRoomCode
      }
    });
  };

  const handleJoinRoom = () => {
    const room = publicRooms.find(r => r.code === roomCode);
    if (room) {
      navigate(`/game-room/${roomCode}`, {
        state: {
          roomName: room.name,
          wordCount: room.wordCount,
          roomCode
        }
      });
    } else {
      alert('Room not found!');
    }
  };

  return (
    <div className='w-2/3 flex m-auto items-center justify-center h-screen'>
      <div className="bg-gradient-to-b from-neutral-900 to-black w-full">
        <h1 className="text-3xl font-mono text-gray-200 mb-8">Multiplayer Arena</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Create Room Section */}
          <div className="bg-neutral-900 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-emerald-400 text-2xl">+</span>
              <h2 className="text-gray-200 text-xl font-mono">Create Room</h2>
            </div>

            <div className='flex gap-6'>
              <input
                type="text"
                placeholder="Test Room"
                className="w-full bg-gray-900 text-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />

              <select
                className="w-full bg-gray-900 text-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={wordCount}
                onChange={(e) => setWordCount(e.target.value)}
              >
                <option value="25">25 words</option>
                <option value="50">50 words</option>
                <option value="100">100 words</option>
              </select>
            </div>

            <button
              onClick={handleCreateRoom}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium p-3 rounded-md transition-colors"
            >
              + Create Room
            </button>
          </div>

          {/* Join Room Section */}
          <div className="bg-neutral-900 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-blue-400 text-2xl">→</span>
              <h2 className="text-gray-200 text-xl font-mono">Join Room</h2>
            </div>

            <input
              type="text"
              placeholder="Room Code"
              className="w-full bg-gray-900 text-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />

            <button
              onClick={handleJoinRoom}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium p-3 rounded-md transition-colors"
            >
              → Join Room
            </button>
          </div>
        </div>

        {/* Public Rooms Section */}
        <div className="mt-8 bg-neutral-900 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-purple-400 text-2xl">#</span>
            <h2 className="text-gray-200 text-xl font-mono">Public Rooms</h2>
          </div>

          {publicRooms.length === 0 ? (
            <p className="text-gray-500 text-center">No public rooms available</p>
          ) : (
            <div className="grid gap-4">
              {publicRooms.map((room) => (
                <div
                  key={room.code}
                  className="bg-gray-900 p-4 rounded-md flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-gray-200 font-mono">{room.name}</h3>
                    <p className="text-gray-400 text-sm">Room Code: {room.code}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{room.players} players</span>
                    <button
                      onClick={() => setRoomCode(room.code)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Multiplayer;