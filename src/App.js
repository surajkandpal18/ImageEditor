import React from 'react';
import {  ThemeProvider } from '@material-ui/core/styles';
import ImageEditor from './Ui/ImageEditor.js'
import Theme from './Ui/Theme.js'
import './App.css';

function App() {
  return (
   <ThemeProvider theme={Theme}> 
    <div className="App">
      <ImageEditor />
    </div>
    </ThemeProvider>
  );
}

export default App;
