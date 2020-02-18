import React from 'react';
import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx'
import ShopPage from './pages/shop/shop.component.jsx'
import Header from './components/header/header.component.jsx'
import SignInAndSignApp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'
import { withRouter } from 'react-router-dom'

// firebasee auth dependencies
import { auth } from './firebase/firebase.utils.js'
import { createUserProfileDocument } from './firebase/firebase.utils.js'

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {

    const { currentUser, history } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          currentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
          history.push(`/`)
        });
      }
      currentUser(userAuth)
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignApp} />
        </Switch>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  currentUser: user => dispatch(setCurrentUser(user))
});


export default connect(null, mapDispatchToProps)(withRouter(App));
