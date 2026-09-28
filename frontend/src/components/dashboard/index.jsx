import React from 'react'
import { Outlet } from 'react-router-dom';
import FloatingProfileMenu from '../../core/design/menu';

const Dashboard = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-[#080d14]">

      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/4 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-white/4 blur-3xl" />

      <Outlet />
      <FloatingProfileMenu />

    </div>
  )
}

export default Dashboard