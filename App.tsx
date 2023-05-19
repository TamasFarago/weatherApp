import React from 'react';
import Providers from './src/providers/Providers';
import Weather from './src/screens/weather/Weather';

const App = () => {
  return (
    <Providers>
      <Weather />
    </Providers>
  );
};

export default App;
