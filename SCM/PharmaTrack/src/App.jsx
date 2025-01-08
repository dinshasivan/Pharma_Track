import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Tracking from './pages/Tracking'
import Header from './components/Header';


const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/tracking' element={<Tracking/>}/>
      </Routes>
    </Router>
  )
}

export default App