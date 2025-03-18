import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar/>
    </div>
    
  );
}

export default App;
