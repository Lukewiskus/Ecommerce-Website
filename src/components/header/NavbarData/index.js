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
        icon: <AiIcons.AiFillHome />,
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
        icon: <AiIcons.AiFillHome />,
        className: 'navText'
    },
    {
        title: 'My Account',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
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
        title: 'Manage Store',
        path: '/admin',
        icon: <AiIcons.AiFillHome />,
        className: 'navText'
    },
    {
        title: 'Products',
        path: '/products',
        icon: <AiIcons.AiFillHome />,
        className: 'navText'
    },
]