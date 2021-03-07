import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/views/navbar';
import LoginPage from './components/views/login';
import HomePage from './components/views/home.js';
import productDetails from './components/views/productDetails';
import cart from './components/views/cart';
import RegisterPage from './components/views/register';
import shippingAddress from './components/views/shippingAddress';
import reviewOrder from './components/views/reviewOrder';
import paymentMethod from './components/views/paymentMethod';
import addProduct from './components/views/addProduct';
import allOrder from './components/views/myOrders';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <Route exact path="/register" component={RegisterPage}></Route>
          <Route exact path='/logout' component={LoginPage}></Route>
          <Route exact path="/product/:id" component={productDetails}></Route>
          <Route exact path="/cart" component={cart}></Route>
          <Route exact path="/shipping" component={shippingAddress}></Route>
          <Route exact path="/revieworder" component={reviewOrder}></Route>
          <Route exact path="/paymentmethod" component={paymentMethod}></Route>
          <Route exact path='/:userid/addproduct' component={addProduct}></Route>
         <Route exact path='/allorder' component={allOrder}></Route>
        </Switch>
    </Router>
  
    </div>
  );
}

export default App;
