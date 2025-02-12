import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from "react-redux"; 
import store from "./features/store";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from "./Layout";
import Home from "./components/Home";
import TypingGame from "./components/TypingGame";
import Multiplayer from "./components/Multiplayer";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";
import GameRoom from "./components/GameRoom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='typingtext' element={<TypingGame />} /> 
      <Route path='multiplayer' element={<Multiplayer />} />
      <Route path='leaderboard' element={<Leaderboard />} />
      <Route path='profile' element={<Profile />} />
      <Route path="/game-room/:roomCode" element={<GameRoom />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);