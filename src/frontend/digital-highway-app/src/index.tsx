import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from '@emotion/react';
import { highwayTheme } from './theme';

const HighwayApp = () => {  
  return (
      <React.StrictMode>
        <ThemeProvider theme={highwayTheme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
  )
}

const container = document.getElementById('root');
var root = createRoot(container!);
root.render(<HighwayApp />);