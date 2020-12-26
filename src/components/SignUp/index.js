import React, { useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser, signInWithGoogle, resetAllAuthForms } from "./../../redux/User/user.actions";
import './styles.scss';
import Button from "./../forms/Button";
import FormInput from "./../forms/FormInput";
import AuthWrapper from './../AuthWrapper';

const mapState = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
})

const SignUp = props => {
    const dispatch = useDispatch();
    const { signUpSuccess, signUpError} = useSelector(mapState);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(signUpSuccess){
            reset();
            dispatch(resetAllAuthForms());
            props.history.push('/');
        }
    }, [signUpSuccess]);

    useEffect(() => {
        if(Array.isArray(signUpError) && signUpError.length > 0){
            setErrors(signUpError);
        }
    }, [signUpError]);

    //Handle change takes in name and value, and on each change, value gets updated, and dispalyed on the screen
    
    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]); 
    }

     const handleFormSubmit = async event => {
        event.preventDefault();
        dispatch(signUpUser({
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

                        <Button onClick={signInWithGoogle}>
                            Sign Up With Google
                        </Button>
                    </form>
                </div>
                
            </AuthWrapper>
    );
}

export default withRouter(SignUp);