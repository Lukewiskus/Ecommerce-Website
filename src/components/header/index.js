import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";
import { Link } from 'react-router-dom';
import { signOutUserStart } from './../../redux/User/user.actions';
import { selectCartItemsCount } from './../../redux/Cart/cart.selectors'; 

const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)
});

const Header = props => {
    const dispatch = useDispatch();
    const { currentUser, totalNumCartItems } = useSelector(mapState);

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
                        <ul>
                           
                            {currentUser && [ 
                            <li>
                                <Link to="products">Products</Link>
                            </li>,
                            <li>
                                <Link exact to="gallery">Gallery</Link>
                            </li>,
                            <li>
                                <Link to="contactme">Contact Me</Link>
                            </li>,
                            <li>
                                <Link to="aboutme">About Me</Link>
                            </li>,
                            <li>
                                <Link to="dashboard">My Account</Link>
                            </li> ,
                            <li>
                                <span onClick={() => signOut()}>
                                LogOut
                                </span>
                            </li>
                            ]}
                             
                        {!currentUser && [
                            <li>
                                <Link to="products">Products</Link>
                            </li>,
                            <li>
                                    <Link to="gallery">Gallery</Link>
                            </li>,
                            <li>
                                <Link to="contactme">Contact Me</Link>
                            </li>,
                            <li>
                                <Link to="aboutme">About Me</Link>
                            </li>, 
                            <li>
                                <Link to="login"> Login</Link>
                            </li>
                            ]}
                            <li>
                                <Link to="/cart">
                                    Cart ({totalNumCartItems})
                                </Link>
                            </li>
                            </ul>
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

