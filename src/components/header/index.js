import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "./styles.scss";
import { Link } from 'react-router-dom';
import { auth, handleUserProfile } from './../../firebase/utils';


const Header = props => {
    const { currentUser } = props;
    const [displayName, setDisplayName] = useState('');

      
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
                                     <Link to="dashboard">My Account</Link>
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

const mapStateToProps = ({ user }) => ({
    //the user function was defined in root Reducer, passed down in provider
    //because of the code, it will be null if nothing, but will be the user if there is a user:)
    currentUser: user.currentUser 
});

//the connect func was imported, and it calls the function we wrote above and thats how it functionally
//goes through the code
export default connect(mapStateToProps, null)(Header);

