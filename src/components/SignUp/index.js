import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import './styles.scss';
import Button from "./../forms/Button";
import FormInput from "./../forms/FormInput";
import AuthWrapper from './../AuthWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllAuthForms, signUpUserStart, googleSignInStart } from '../../redux/User/user.actions';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
});

const SignUp = props => {
    const { currentUser, userErr } = useSelector(mapState);
    const history = useHistory();
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(currentUser) {
            reset();
            history.push('/');
        }
    }, [currentUser]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
        }
    }, [userErr]);
    //Handle change takes in name and value, and on each change, value gets updated, and dispalyed on the screen
    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    }

    const handleGoogleSignIn = () => {
        dispatch(googleSignInStart())
    }

     const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword
        }));
    }
        
    const configAuthWrapper = {
        headline: 'No account? sign up here'
    };


    return(
        <AuthWrapper {...configAuthWrapper}>
            <div className ="formWrap">
                <form onSubmit={handleFormSubmit}>
                        <FormInput 
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder= "Enter Name"
                        handleChange={e => setDisplayName(e.target.value)} />

                        <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder= "Enter email"
                        handleChange={e => setEmail(e.target.value)} />

                        <FormInput 
                        type="password"
                        name="password"
                        value={password}
                        placeholder= "Enter Password"
                        handleChange={e => setPassword(e.target.value)} />

                        <FormInput 
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder= "Confirm Password"
                        handleChange={e => setConfirmPassword(e.target.value)} />

                        <Button type="Submit">
                            Sign Up
                        </Button>
                        {errors.length > 0 && (
                        <ul>
                            {errors.map((err,index) => {
                                return (
                                    <li key={index}>
                                        {err}
                                    </li>
                                    );    
                                })}
                            </ul>
                        )}
                        <h1>or</h1>

                        <Button onClick={handleGoogleSignIn}>
                            Sign Up With Google
                        </Button>
                    </form>
                </div>
            </AuthWrapper>
    );
}

//wrapping it withRouter gives us access to props.history
export default SignUp;