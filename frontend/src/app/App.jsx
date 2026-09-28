import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Root from '../root';
import Login from '../components/Login';
import Dashboard from '../components/dashboard';
import Profile from '../components/dashboard/profile';
import Register from '../components/Register';
import PrivateChat from '../components/chats/PrivateChat';
import Settings from '../components/dashboard/settings';
import AccountSwitcher from '../components/dashboard/settings/accounts';
import UpdateProfile from '../components/dashboard/settings/updateProfile';
import SecurityProfile from '../components/dashboard/settings/securityprofile';

function App() {
  const Querys = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "Dashboard",
          element: <Dashboard />,
          children: [
            {
              index: true,
              path: "profile",
              element: <Profile />
            },
            {
              path:"settings",
              element: <Settings />,
              children: [
                {
                  index: true,
                  path: "accounts",
                  element: <AccountSwitcher />
                },
                {
                  path: "updateProfile",
                  element: <UpdateProfile />
                },
                {
                  path: "Security",
                  element: <SecurityProfile />
                }
              ]
            }
          ]
        },
        {
          path: "chat",
          element:<PrivateChat />
        }
      ]
    }
  ])

  return (
    <QueryClientProvider client={Querys}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
