import React from 'react';
import {Provider} from 'react-redux';
import {createMuiTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import theme from './theme';
import Routes from './Routes';
import store, {getHistory} from './store';

function App() {
  const muiTheme = createMuiTheme(theme);

  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={muiTheme}>
        <Provider store={store}>
          <Routes history={getHistory()}/>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
