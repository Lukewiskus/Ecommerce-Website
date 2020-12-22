import React from "react";
import Header from '../components/header';
import Footer from './../components/Footer';


const MainLayout = props => {
    return (
        <div>
            <Header />
            <div className="main">
                {props.children}
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;