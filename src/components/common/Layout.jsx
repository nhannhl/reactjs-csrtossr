import React from 'react';
import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  const navLink = [
    {
      label: "User",
      path: "/user",
    },
    {
      label: "Post",
      path: "/post",
    },
  ];

  return (
    <div>
      <div>Layout</div>
      <div>
        {navLink.map((item) => (
          <NavLink to={item.path} key={item.path}>{item.label}</NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  )
}

export default Layout