import React, { useState } from "react";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Sign In and Sign Up

  const toggleForm = () => setIsSignUp(!isSignUp);

  return (
    <div className="flex w-screen items-center justify-center min-h-screen bg-gradient-to-b from-neutral-900 to-black">
      <div className="bg-[#1c1c1c] p-8 rounded-lg shadow-md max-w-sm w-full">
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          Welcome to TypeFast
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Sign in to your account or create a new one
        </p>

        {/* Toggle Buttons */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setIsSignUp(false)}
            className={`w-1/2 py-2 ${
              !isSignUp ? "text-white bg-gray-800" : "text-gray-400 hover:text-white hover:bg-gray-700"
            } border-r border-gray-700 focus:outline-none`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`w-1/2 py-2 ${
              isSignUp ? "text-white bg-gray-800" : "text-gray-400 hover:text-white hover:bg-gray-700"
            } focus:outline-none`}
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
                  id="name"
                  type="text"
                  placeholder="John Doe"
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
                id="email"
                type="email"
                placeholder="john@gmail.com"
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
                id="password"
                type="password"
                placeholder="********"
                className="bg-transparent w-full text-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <button
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
  );
};

export default Login;
