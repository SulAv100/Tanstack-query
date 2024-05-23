// App.jsx

import React from 'react';
import Store from './Components/Slice/Store';
import { Provider } from 'react-redux';
import Cart from './Components/Cart/Cart';

const App = () => {
  return (
    <Provider store={Store}>
      <div className="app">
        {/* <Homepage />  */} 
        <Cart/>
      </div>
      </Provider>
  );
};

export default App;
