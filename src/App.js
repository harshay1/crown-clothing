import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { connect } from "react-redux";
import {HomePage} from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import './App.css';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/signin-signup/signin-signup.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from "./redux/user/user.actions";

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
      setCurrentUser({userAuth});
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
              <Route path='/signin' component={SignInAndSignUp} />
            </Switch>
        </div>
      );
    }
}

const mapDispatchProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchProps)(App);
