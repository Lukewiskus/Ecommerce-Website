import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions';
//layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';


//pages
import './default.scss';
import Homepage from "./pages/Homepage";
import AboutMe from './pages/AboutMe';
import ContactMe from './pages/ContactMe';
import Gallery from './pages/Gallery';
import Products from './pages/Products';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Register from './pages/Register';
// import Products from './pages/Products';

class App extends Component {
  authListener = null;

componentDidMount(){
  const { setCurrentUser } = this.props;

  //Once auth state has changed, go into this function
  this.authListener = auth.onAuthStateChanged(async userAuth => {
    //if userAuth is null or not
    if(userAuth) {
      const userRef = await handleUserProfile(userAuth);
      //userRef now has methods that can be used from firebase API
      userRef.onSnapshot(snapshot => {
        setCurrentUser({
          id: snapshot.id,
          ...snapshot.data()
        });
      })
    }
    //userAuth returns null if no user is logged in, which will set the current user to null
    setCurrentUser(userAuth);
  });
}

componentWillUnmount(){
  //this will call and return null which will log you out
  this.authListener();
}

  render() {
    //sets the currentUser to the user that is logged in
    const { currentUser } = this.props;
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
          <HomepageLayout>
            <Homepage />
            </HomepageLayout>
        )} />
        <Route path="/aboutme" render = {() => (
            <MainLayout>
            <AboutMe />
          </MainLayout>
        )}/>
        <Route path="/gallery" render = {() => (
            <MainLayout>
            <Gallery />
          </MainLayout>
        )}/>
        <Route path="/contactme" render = {() => (
            <MainLayout>
            <ContactMe />
          </MainLayout>
        )}/>
        <Route path="/products" render = {() => (
            <MainLayout>
            <Products/>
          </MainLayout>
        )}/>
        
        <Route path="/register" 
          render = {() => currentUser ? <Redirect to="/"/> : (
              <MainLayout>
              <Register/>
            </MainLayout>
        )}/>
        <Route path="/recovery" 
          render = {() => (
              <MainLayout>
              <Recovery />
            </MainLayout>
        )}/>
        <Route path="/login" 
        //if currentUser exisits, redirect to homepage, i guess ? means exist lol
          render = {() => currentUser ? <Redirect to="/"/> : (
              <MainLayout>
              <Login/>
            </MainLayout>
        )}/>
      </Switch>
    </div>
  );
}
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
