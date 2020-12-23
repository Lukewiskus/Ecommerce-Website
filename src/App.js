import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

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

const initialState = {
  currentUser: null
};

class App extends Component {
  constructor(props){
    super(props);
    this.state= {
      ...initialState
    }
  }

  authListener = null;

componentDidMount(){
  //Once auth state has changed, go into this function
  this.authListener = auth.onAuthStateChanged(async userAuth => {
    //if userAuth is null or not
    if(userAuth) {
      const userRef = await handleUserProfile(userAuth);
      //userRef now has methods that can be used from firebase API
      userRef.onSnapshot(snapshot => {
        this.setState({
          currentUser: {
            //this can set the state with the data logged in the firebase database
            id: snapshot.id,
            //snapshot.data() is a spreader method that returns the stored data which can then be accessed
            ...snapshot.data()
          }
        });
      });
    }
    //this is the else, if there is no user, reset to the inital state of null
    this.setState({
      ...initialState
    });
  });
}

componentWillUnmount(){
  //this will call and return null which will log you out
  this.authListener();
}

  render() {
    //sets the currentUser to the user that is logged in
    const { currentUser } = this.state;
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
          <HomepageLayout currentUser={currentUser}>
            <Homepage />
            </HomepageLayout>
        )} />
        <Route path="/aboutme" render = {() => (
            <MainLayout currentUser={currentUser}>
            <AboutMe />
          </MainLayout>
        )}/>
        <Route path="/gallery" render = {() => (
            <MainLayout currentUser={currentUser}>
            <Gallery />
          </MainLayout>
        )}/>
        <Route path="/contactme" render = {() => (
            <MainLayout currentUser={currentUser}>
            <ContactMe />
          </MainLayout>
        )}/>
        <Route path="/products" render = {() => (
            <MainLayout currentUser={currentUser}>
            <Products/>
          </MainLayout>
        )}/>
        <Route path="/login" 
        //if currentUser exisits, redirect to homepage, i guess ? means exist lol
          render = {() => currentUser ? <Redirect to="/"/> : (
              <MainLayout currentUser={currentUser}>
              <Login/>
            </MainLayout>
        )}/>
        <Route path="/register" 
          render = {() => currentUser ? <Redirect to="/"/> : (
              <MainLayout currentUser={currentUser}>
              <Register/>
            </MainLayout>
        )}/>
        <Route path="/recovery" 
          render = {() => (
              <MainLayout>
              <Recovery />
            </MainLayout>
        )}/>
      </Switch>
    </div>
  );
}
}

export default App;
