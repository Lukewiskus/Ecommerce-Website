import React from 'react';
import "./styles.scss";
import { Link } from 'react-router-dom';
import { auth } from './../../firebase/utils';

const Header = props => {
    const { currentUser } = props;

    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                    <h1>Logo</h1>
                    </Link>
                </div>

                <div className="rightSide-Wrapper">    
                        {currentUser && (
                            <ul>
                                <li>
                                    <Link to="products">Products</Link>
                                </li>
                                <li>
                                     <Link to="gallery">Gallery</Link>
                                </li>
                                <li>
                                    <Link to="contactme">Contact Me</Link>
                                </li>
                                <li>
                                    <Link to="aboutme">About Me</Link>
                                </li> 
                                <li>
                                    <span onClick={() => auth.signOut()}>
                                    LogOut
                                    </span>
                                </li>
                            </ul>
                        )}
                        {!currentUser && (
                        <ul>
                            <li>
                                    <Link to="products">Products</Link>
                                </li>
                                <li>
                                     <Link to="gallery">Gallery</Link>
                                </li>
                                <li>
                                    <Link to="contactme">Contact Me</Link>
                                </li>
                                <li>
                                    <Link to="aboutme">About Me</Link>
                                </li> 
                            <li>
                                <Link to="login"> Login</Link>
                            </li>
                            </ul>
                        )}
                </div>
            </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null
};

export default Header;
