import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Provider from './Context/AppStateProvider';
import Router from './components/Router';

const App = () => (
  <MuiThemeProvider>
    <Provider>
      <Router />
    </Provider>
  </MuiThemeProvider>
)

export default App;