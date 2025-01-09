import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
function Layout() {
 

  return (
    <div className='bg-gradient-to-b from-neutral-900 to-black w-full' >
      <Navigation/>
      <Outlet />
      <Footer/>
    </div>
  )
}

export default Layout
