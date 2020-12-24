import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions';

//high order component
//WithAuth can restrict access to pages based on being logged in or not
import WithAuth from './hoc/withAuth';

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
import Dashboard from './pages/Dashboard';
// import Products from './pages/Products';

const App = props =>  {
  const { setCurrentUser, currentUser } = props;

  useEffect(() => {
  //a function to see what happens on an on statechange 
  const authListener = auth.onAuthStateChanged(async userAuth => {
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


    return () => {
      authListener();
    }
  }, []);

    //sets the currentUser to the user that is logged in

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
        <Route path="/dashboard" 
          render = {() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
        )}/>
      </Switch>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
