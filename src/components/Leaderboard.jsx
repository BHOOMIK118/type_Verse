import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboardData, setFilter, setMode, setSearchTerm, selectLeaderboard } from '../features/leaderboardSlice';
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/Select";
import { Crown, Clock, ArrowRight } from 'lucide-react';

export default function Leaderboard() {
  const dispatch = useDispatch();
  const { entries, filter, mode, searchTerm, status } = useSelector(selectLeaderboard);
  const [updateTime, setUpdateTime] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchLeaderboardData());
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
      }
    };

    fetchData();

    const timer = setInterval(() => {
      setUpdateTime((prev) => (prev > 0 ? prev - 1 : 2));
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  const filteredData = entries.filter((entry) =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartNewRace = () => {
    console.log('Starting a new race...');
  };

  return (
    <div className='w-3/5 h-full flex mx-auto'>
      <div className="container mx-auto px-4 py-8 bg-gray-900 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Crown className="text-yellow-400 mr-2" />
            <h1 className="text-2xl font-bold">Leaderboard</h1>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-1" size={16} />
            <span>Updates in {updateTime}s</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <Button
            onClick={() => dispatch(setFilter('all-time'))}
            variant={filter === 'all-time' ? 'default' : 'secondary'}
            size="sm"
          >
            All-Time
          </Button>
          <Button
            onClick={() => dispatch(setFilter('daily'))}
            variant={filter === 'daily' ? 'default' : 'secondary'}
            size="sm"
          >
            Daily
          </Button>
          <Select onValueChange={(value) => dispatch(setMode(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Modes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Modes">All Modes</SelectItem>
              <SelectItem value="words">Words</SelectItem>
              <SelectItem value="time">Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="mb-6 bg-gray-800 border-gray-700 text-white"
        />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="p-2 text-left">Rank</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-right">WPM</th>
                <th className="p-2 text-right">Accuracy</th>
                <th className="p-2 text-right">Time</th>
                <th className="p-2 text-right">Mode</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
                <tr key={entry.id} className="border-b border-gray-800">
                  <td className="p-2">
                    {index < 3 ? (
                      <span className={`inline-block w-6 h-6 rounded-full text-center leading-6 ${
                        index === 0 ? 'bg-yellow-400' :
                        index === 1 ? 'bg-gray-400' :
                        'bg-yellow-700'
                      }`}>
                        {index + 1}
                      </span>
                    ) : (
                      index + 1
                    )}
                  </td>
                  <td className="p-2">{entry.name}</td>
                  <td className="p-2 text-right text-blue-400">{entry.wpm}</td>
                  <td className="p-2 text-right text-green-400">{entry.accuracy}%</td>
                  <td className="p-2 text-right">{entry.time}</td>
                  <td className="p-2 text-right">{entry.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button onClick={handleStartNewRace} className="mt-6 bg-green-500 hover:bg-green-600">
          Start New Race
          <ArrowRight className="ml-2" size={16} />
        </Button>
      </div>
    </div>
  );
}