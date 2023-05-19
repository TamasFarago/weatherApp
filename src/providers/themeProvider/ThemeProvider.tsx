import React from 'react';
import {PropsWithChildren} from 'react';
import {ThemeProvider} from 'styled-components/native';
import theme from './theme';
import {StatusBar, Platform} from 'react-native';

const Provider = ({children}: PropsWithChildren<{}>) => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
      />
      {children}
    </ThemeProvider>
  );
};

export default Provider;
