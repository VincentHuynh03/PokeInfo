import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Main from './Pages/main';
import PokeDetails from './Pages/pokeDetails';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pokemon/:name" element={<PokeDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
