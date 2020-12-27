import React, { useState, useEffect } from 'react';
//useState lets us use a passed in state in our componenent

import { useDispatch, useSelector } from 'react-redux';
import { emailSignInStart, googleSignInStart} from './../../redux/User/user.actions';

import './styles.scss';
import Button from "./../forms/Button";
import FormInput from "./../forms/FormInput"
import AuthWrapper from './../AuthWrapper';
import { Link, useHistory } from 'react-router-dom';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    signInWithGoogle: user.signInWithGoogle
})

const SignIn = props => {
    //definting dispatch to use useDispatch as a function
    const history = useHistory();
    const { currentUser } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    //if that thing called in the [] changes, then use effect code is run with the payload
    // of whats in the []
    useEffect(() => {
        if(currentUser) {
            resetForm();
            history.push('/');
        }
    }, [currentUser]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setErrors([]);
    }

    //handleSubmit makes it so the page wont reload on 
    //button click, called in form onSubmit
    const handleSubmit = e => {
        //prevents page reload after hitting the submit button
        e.preventDefault();
        dispatch(emailSignInStart({ email, password}));
    }
    
    const handleGoogleSignIn = () => {
        dispatch(googleSignInStart())
    }

        const configAuthWrapper = {
            headline: 'Login'
        };

        return(
        <AuthWrapper {...configAuthWrapper}>
            <div className ="formWrap">
                <form onSubmit={handleSubmit}>
                <FormInput 
                        type="email"
                        name="email"
                        value= {email}
                        placeholder="Enter Email"
                        handleChange={e => setEmail(e.target.value)}
                    />
                    <FormInput 
                        type="password"
                        name="password"
                        value= { password }
                        placeholder="Enter Password"
                        handleChange={e => setPassword(e.target.value)}
                    />
                    {errors.length > 0 && (
                        <ul  >
                            {errors.map((err,index) => {
                                return (
                                    <li id="errorMessage" key={e => setErrors(e.target.value)}>
                                        {err}
                                    </li>
                                    );    
                                })}
                            </ul>
                        )}
                    <Link id="forgotPassword" to="/recovery">
                        Forgot Password?
                    </Link>
                    <Button type="submit">
                        LogIn
                    </Button>
                    
                    <Button onClick={handleGoogleSignIn}>
                        Sign In With Goole
                    </Button>
                    <h1>Or</h1>
                    <div className="socialSignIn">
                    <Link id="register" to="/register">
                        Sign up
                    </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
}

//tutorial has this wrapping in withRouter, but that errors out on me so idk, still works
export default SignIn;