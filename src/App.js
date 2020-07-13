import React from 'react';
import {Route} from 'react-router-dom';
import {HomePage} from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import './App.css';

function App() {
  return (
    <div>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        {/* <HomePage /> */}
    </div>
  );
}

export default App;
