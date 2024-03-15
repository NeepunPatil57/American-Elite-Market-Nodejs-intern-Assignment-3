import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Components/Pages/Home'
import SecretPage from './Components/Pages/SecretPage'
import Profile from './Components/Pages/profile'

export default function App () {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/secret" element={<SecretPage />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  )
}

