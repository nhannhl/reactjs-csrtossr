import { useState } from 'react'
import Layout from './components/common/Layout'
import routes from './config/routes'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.component}
            />
          ))}
        </Route>
      </Routes>
    // </BrowserRouter>
  )
}

export default App
