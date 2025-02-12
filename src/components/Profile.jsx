import React, { useState } from "react";
import { login, signup } from "../firebase";
import { useSelector } from "react-redux";

const Login = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const transactions = [
    { date: '21.06.2020 - 14:55', method: 'Bitcoin', percentage: '55%', amount: '$1,541.14', status: 'In process' },
    { date: '21.06.2020 - 14:55', method: 'Bitcoin', percentage: '55%', amount: '$1,541.14', status: 'Successful' },
    { date: '21.06.2020 - 14:55', method: 'Bitcoin', percentage: '55%', amount: '$1,541.14', status: 'Successful' },
    { date: '21.06.2020 - 14:55', method: 'Bitcoin', percentage: '55%', amount: '$1,541.14', status: 'Failure' },
    { date: '21.06.2020 - 14:55', method: 'Bitcoin', percentage: '55%', amount: '$1,541.14', status: 'Successful' },
    { date: '21.06.2020 - 14:55', method: 'Bitcoin', percentage: '55%', amount: '$1,541.14', status: 'In process' },
  ];

  const user_auth = async (event) => {
    event.preventDefault();
    if (!isSignUp) {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
  };

  return (
    isLoggedIn ? (
      <div className="w-11/12 flex items-center justify-center mx-auto">
        <div className="min-h-screen bg-gradient-to-b from-neutral-900 text-gray-100 p-6">
          {/* Header Section */}
          <div className="flex items-center gap-2 mb-8">
            <span className="text-gray-400">Welcome, <span className="text-emerald-400 font-bold">Alex</span> </span>
          </div>

          {/* Profile Section */}
          <div className="flex items-start gap-4 mb-8">
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-11%20025651-CuqPAwtfUSotM2H9saWGUAl2cLFqKK.png"
                alt="Profile"
                className="w-24 h-24 rounded-xl"
              />
              <button className="absolute -right-2 -bottom-2 bg-gray-700 p-2 rounded-full">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-300">
                  <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </button>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">ALEX</h2>
                <span className="text-orange-500">$2,573.25</span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Level 29</span>
                  <span>2999 / 3000</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-2">Pool fund</div>
              <div className="text-xl font-bold">$567.14</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-2">Supplied</div>
              <div className="text-xl font-bold">$10,541.14</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-2">Running Won</div>
              <div className="text-xl font-bold">1546</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-2">Total Profit</div>
              <div className="text-xl font-bold text-orange-500">$5,187.14</div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-6 mb-6 border-b border-gray-800">
            <button className="px-4 py-2 text-orange-500 border-b-2 border-orange-500">Transactions</button>
            <button className="px-4 py-2 text-gray-400">Payments</button>
            <button className="px-4 py-2 text-gray-400">Withdraws</button>
            <button className="px-4 py-2 text-gray-400">Jackpot</button>
            <button className="px-4 py-2 text-gray-400">Coolflip</button>
          </div>

          {/* Transactions Table */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm">
                  <th className="text-left p-4">Date & Time</th>
                  <th className="text-left p-4">Method</th>
                  <th className="text-left p-4">Withdrawn</th>
                  <th className="text-left p-4">You receive</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="p-4">{transaction.date}</td>
                    <td className="p-4">{transaction.method}</td>
                    <td className="p-4 text-orange-500">{transaction.percentage}</td>
                    <td className="p-4">{transaction.amount}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center ${
                        transaction.status === 'Successful' ? 'text-green-500' :
                        transaction.status === 'Failure' ? 'text-red-500' :
                        'text-gray-400'
                      }`}>
                        {transaction.status === 'Successful' && '✓ '}
                        {transaction.status === 'Failure' && '✕ '}
                        {transaction.status === 'In process' && '○ '}
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 border-t border-gray-700 flex justify-between text-gray-400">
              <span>Total transactions</span>
              <span>506</span>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <div className="flex w-screen items-center justify-center min-h-screen bg-gradient-to-b from-neutral-900 to-black">
          <div className="bg-[#1c1c1c] p-8 rounded-lg shadow-md max-w-sm w-full">
            <h1 className="text-2xl font-bold text-white text-center mb-4">
              Welcome to <span className="text-emerald-400">T</span>ype<span className="text-emerald-400">V</span>er
              <span className="text-emerald-400">S</span>e
            </h1>
            <p className="text-gray-400 text-center mb-6">
              Sign in to your account or create a new one
            </p>

            {/* Toggle Buttons */}
            <div className="flex border-b border-gray-700 mb-6">
              <button
                onClick={() => setIsSignUp(false)}
                className={`w-1/2 py-2 ${!isSignUp ? "text-white bg-gray-800" : "text-gray-400 hover:text-white hover:bg-gray-700"} border-r border-gray-700 focus:outline-none`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`w-1/2 py-2 ${isSignUp ? "text-white bg-gray-800" : "text-gray-400 hover:text-white hover:bg-gray-700"} focus:outline-none`}
              >
                Sign Up
              </button>
            </div>

            {/* Conditional Form Rendering */}
            <form className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="sr-only" htmlFor="name">
                    Name
                  </label>
                  <div className="flex items-center border border-gray-700 rounded-md px-3 py-2 bg-[#2b2b2b]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14m-7-7v14"
                      />
                    </svg>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="name"
                      type="text"
                      placeholder="Name"
                      className="bg-transparent w-full text-gray-300 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <div className="flex items-center border border-gray-700 rounded-md px-3 py-2 bg-[#2b2b2b]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12l-4-4m0 0l-4 4m4-4v12"
                    />
                  </svg>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="bg-transparent w-full text-gray-300 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="password">
                  Password
                </label>
                <div className="flex items-center border border-gray-700 rounded-md px-3 py-2 bg-[#2b2b2b]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 11v3m0 0v3m0-3H9m3 0h3"
                    />
                  </svg>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    placeholder="********"
                    className="bg-transparent w-full text-gray-300 focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={user_auth}
                type="submit"
                className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-center font-medium focus:outline-none transition"
              >
                {isSignUp ? "Sign Up →" : "Sign In →"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button className="w-full flex items-center justify-center py-2 text-gray-300 border border-gray-700 rounded-md hover:bg-gray-700 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M16 13.17V10H8v2h3v1H8v2h3v2H8v2h8v-2h-3v-2h3v-2h-3v-1h3z"
                    clipRule="evenodd"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Login;