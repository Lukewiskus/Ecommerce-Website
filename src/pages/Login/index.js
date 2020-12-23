import React from 'react';
import './styles.scss';
import SignIn from "./../../components/SignIn";
import SignUp from "../../components/SignUp";

const Login = props => {
    return(
        <div>
        <SignIn />
        <SignUp />
        </div>
    );
}
export default Login;