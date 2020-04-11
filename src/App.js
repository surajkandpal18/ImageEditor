import React from 'react';
import {  ThemeProvider } from '@material-ui/core/styles';
import ImageEditor from './Ui/ImageEditor.js'
import './App.css';

function App() {
  return (
   <ThemeProvider> 
    <div className="App">
      <ImageEditor />
    </div>
    </ThemeProvider>
  );
}

export default App;
