import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const GameRoom = () => {
  const location = useLocation();
  const { roomCode } = useParams();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [typists, setTypists] = useState([
    { id: 1, name: 'Player 1', avatar: 'P' },
    { id: 2, name: 'Player 2', avatar: 'N' }
  ]);

  const { roomName, wordCount } = location.state || {};

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setChat([...chat, { id: Date.now(), user: 'Player 1', message }]);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* Room Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-mono text-gray-200">
            {roomName} | T {wordCount} words
          </h1>
          <p className="text-gray-400 font-mono text-sm">
            # Room Code: {roomCode}{' '}
            <button className="text-emerald-400 hover:text-emerald-500">
              📋
            </button>
          </p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md transition-colors">
          Start Race
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Chat Section */}
        <div className="md:col-span-2 bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-emerald-400">💬</span>
            <h2 className="text-gray-200 font-mono">Chat</h2>
          </div>

          <div className="h-96 overflow-y-auto mb-4 space-y-4">
            {chat.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <div className="bg-emerald-500 w-8 h-8 rounded-full flex items-center justify-center text-white">
                  {msg.user[0]}
                </div>
                <div>
                  <p className="text-gray-300 font-medium">{msg.user}</p>
                  <p className="text-gray-400">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-gray-900 text-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 rounded-md transition-colors"
            >
              →
            </button>
          </form>
        </div>

        {/* Typists Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-blue-400">👥</span>
            <h2 className="text-gray-200 font-mono">
              Typists ({typists.length})
            </h2>
          </div>

          <div className="space-y-4">
            {typists.map((typist) => (
              <div
                key={typist.id}
                className="flex items-center gap-3"
              >
                <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-white">
                  {typist.avatar}
                </div>
                <p className="text-gray-300">{typist.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRoom;