import React from 'react';
import {Switch, Route} from 'react-router-dom';

//layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';


//pages
import './default.scss';
import Homepage from "./pages/Homepage";
import Registration from './pages/Registration';
import AboutMe from './pages/AboutMe';
import ContactMe from './pages/ContactMe';
import Gallery from './pages/Gallery';
import Products from './pages/Products';
// import Products from './pages/Products';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
          <HomepageLayout>
            <Homepage />
            </HomepageLayout>
        )} />
        <Route path="/registration" render = {() => (
          <MainLayout>
            <Registration />
          </MainLayout>
        )}/>
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
      </Switch>
    </div>
  );
}

export default App;
