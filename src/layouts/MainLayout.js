import React from 'react';
import Header from '../components/header';
import './mainstyles.scss'

const MainLayout = props => {
    return (
        //the{..props} passes the props to the header, and right now its passing
        <div>
            <Header {...props}/>
            <div className="main">
                {props.children}
            </div>
            {/* <div className="footer">
                <Footer />
            </div> */}
        </div>
    );
};

export default MainLayout;