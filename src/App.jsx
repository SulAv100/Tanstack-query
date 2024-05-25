// App.jsx

import React from 'react';
import Store from './Components/Slice/Store';
import { Provider } from 'react-redux';
import Cart from './Components/Cart/Cart';
import State from './Components/UseState/State';
import UserData from './Components/StateExample/UserData';
import Tanstack from './Components/TanStack/Tanstack';
import PostForm from './Components/PostForm/PostForm';

const App = () => {
  return (
    <Provider store={Store}>
      <div className="app">
        {/* <Homepage />  */} 
        {/* <Cart/> */}
        <State/>
        {/* <Tanstack/> */}
        {/* <PostForm/> */}
      </div>

      {/* <UserData/> */}
      </Provider>
  );
};

export default App;
