import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';


// const signOut = () => {
//     dispatch(signOutUserStart());
// }
export const navBarDataSignedOut = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        className: 'navText'
    },
    {
        title: 'Products',
        path: '/products',
        icon: <AiIcons.AiFillShopping />,
        className: 'navText'
    },
    {
        title: 'Login',
        path: '/login',
        icon: <AiIcons.AiFillHome />,
        className: 'navText'
    },

]

export const navBarDataSignedIn = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        className: 'navText'
    },
    {
        title: 'Products',
        path: '/products',
        icon: <AiIcons.AiFillShopping />,
        className: 'navText'
    },
    {
        title: 'My Account',
        path: '/dashboard',
        icon: <FaIcons.FaUserAlt />,
        className: 'navText'
    },
]

export const navBarDataAuth = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        className: 'navText'
    },
    {
        title: 'Products',
        path: '/products',
        icon: <AiIcons.AiFillShopping />,
        className: 'navText'
    },
    {
        title: 'Manage Store',
        path: '/admin',
        icon: <FaIcons.FaUserEdit />,
        className: 'navText'
    },
    
    {
        title: 'My Account',
        path: '/dashboard',
        icon: <FaIcons.FaUserAlt />,
        className: 'navText'
    }
]