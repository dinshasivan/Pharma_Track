import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Tracking from './pages/Tracking'
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import DistributorPage from './pages/DistributorPage';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path="/landing" element={<LandingPage />} /> */}
        <Route path='/tracking' element={<Tracking/>}/>
        {/* <Route path='/distributor' element={<DistributorPage/>}/> */}
      </Routes>
    </Router>
  )
}

export default App