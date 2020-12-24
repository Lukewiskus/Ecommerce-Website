import React, { useState } from 'react';
//useState lets us use a passed in state in our componenent

import './styles.scss';
import Button from "./../forms/Button";
import FormInput from "./../forms/FormInput"
import { signInWithGoogle,auth } from './../../firebase/utils';
import AuthWrapper from './../AuthWrapper';
import { Link } from 'react-router-dom';

const SignIn = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setErrors([]);
    }

    //handleSubmit makes it so the page wont reload on 
    //button click, called in form onSubmit
    const handleSubmit = async e => {
        e.preventDefault();
        
        try {
            await auth.signInWithEmailAndPassword(email, password);
            resetForm();
        }
        catch(e){
            const err = ["Either username or password is incorrect"];
            setErrors(err);
           
    }
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
                    
                    <Button onClick={signInWithGoogle}>
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


export default SignIn;