import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { selectCurrentUser } from "./redux/user/user.selector";
import { createStructuredSelector} from "reselect";
import { connect } from "react-redux";
import {HomePage} from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import './App.css';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/signin-signup/signin-signup.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from "./redux/user/user.actions";
import CheckoutPage from './pages/checkout/chectout.component';

class App extends React.Component {
  unSubscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unSubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          // console.log(snapshot.data());
            setCurrentUser({
                id: snapshot.id,
                ...snapshot.data()
            });
            // console.log(this.state);
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render() {
      return (
        <div>
            <Header/>
            <Switch>  
              <Route exact path='/' component={HomePage} />
              <Route path='/shop' component={ShopPage} />
              {/* <Route path='/signup' component={SignInAndSignUp} /> */}
              <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)} />
              <Route exact path='/checkout' component={CheckoutPage} />
            </Switch>
        </div>
      );
    }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchProps)(App);
