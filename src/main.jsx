import React from "react";
import ReactDOM from 'react-dom/client'; // Fixed ReactDom to ReactDOM
import './index.css';
import { Provider } from "react-redux"; 
import store from "./features/store"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from "./Layout";
import Home from "./components/Home";
import TypingText from "./components/typingText";
import Multiplayer from "./components/Multiplayer";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='typingtext' element={<TypingText />} /> 
      <Route path='multiplayer' element={<Multiplayer />} />
      <Route path='leaderboard' element={<Leaderboard />} />
      <Route path='profile' element={<Profile />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);
