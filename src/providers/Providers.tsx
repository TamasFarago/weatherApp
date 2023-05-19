import React, {PropsWithChildren} from 'react';
import ReduxProvider from './reduxProvider/ReduxProvider';
import {default as ThemeProvider} from './themeProvider';

const Providers = ({children}: PropsWithChildren<{}>) => {
  return (
    <ReduxProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ReduxProvider>
  );
};

export default Providers;
