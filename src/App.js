import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import Routes from './Routes';
import store, { history } from './redux/store';
import './styles/styles.scss';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className='App'>
          <BrowserRouter>
            <div id='app-inner' style={{ height: '100%' }}>
              <Routes />
            </div>
          </BrowserRouter>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
