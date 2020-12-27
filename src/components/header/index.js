import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";
import { Link } from 'react-router-dom';
import { signOutUserStart } from './../../redux/User/user.actions';

const mapState = ({ user }) => ({
    currentUser: user.currentUser 
});

const Header = props => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState);
    const [displayName, setDisplayName] = useState('');

    const signOut = () => {
        dispatch(signOutUserStart());
    }
      
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
                                    <span onClick={() => signOut()}>
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


//the connect func was imported, and it calls the function we wrote above and thats how it functionally
//goes through the code
export default Header;

