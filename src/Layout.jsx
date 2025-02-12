import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from './features/auth/authSlice';

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged In");
        dispatch(setIsLoggedIn(true));
        navigate('/', { replace: true });
      } else {
        console.log("Logged Out");
        navigate('/profile', { replace: true });
      }
    });
  }, []);

  return (
    <div className='bg-gradient-to-b from-neutral-900 to-black w-full'>
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;