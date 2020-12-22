import React from 'react';
import "./syles.scss";
import { Link } from 'react-router-dom';

const Header = props => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                    <h1>Logo</h1>
                    </Link>
                </div>

                <div className="rightSide-Wrapper">
                    <Link to="/">Home  </Link>
                    <Link to="registration">Register  </Link>
                    <Link to="products">Products  </Link>
                    <Link to="gallery">Gallery  </Link>
                    <Link to="contactme">Contact Me  </Link>
                    <Link to="aboutme">About Me  </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;