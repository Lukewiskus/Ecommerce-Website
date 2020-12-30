import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux';
import { store, persistor } from './redux/createStore';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';


//Provider passes store={store} to the whole application making it so you dont have to pass things down through props all the time
//PresistGate presists data like cart data so you can leave the
//website and still have your cart when you return
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

