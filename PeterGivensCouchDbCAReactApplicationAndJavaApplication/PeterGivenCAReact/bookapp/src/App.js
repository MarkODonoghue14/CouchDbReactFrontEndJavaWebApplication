import React from 'react';
import './App.css';
import AddBookComponent from './components/AddBookComponent';
import NavBarComponent from './components/NavBarComponent';
import FooterComponent from './components/FooterComponent';
import BookTableComponent from './components/BookTableComponent';




function App() {
  return (
    <div className="App">
      <NavBarComponent/>
      <AddBookComponent/>
      <BookTableComponent/>
      <FooterComponent/>
    </div>
  );
}

export default App;

