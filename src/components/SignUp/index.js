import React, { Component } from 'react';
import './styles.scss';
import Button from "./../forms/Button";
import FormInput from "./../forms/FormInput";
import { signInWithGoogle, auth, handleUserProfile } from '../../firebase/utils';
import AuthWrapper from './../AuthWrapper';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
};

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };

        this.handleChange = this.handleChange.bind(this);
    }
    //Handle change takes in name and value, and on each change, value gets updated, and dispalyed on the screen
    handleChange(e) {
        const { name,value } = e.target;

        this.setState({
            [name]: value
        });
     }
     handleFormSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            const err = ['PASSWORDS DO NOT MATCH'];
            this.setState({
                errors: err
            })
            return;
        }
        
        try {
            const { user} = await auth.createUserWithEmailAndPassword(email,password);
            
            await handleUserProfile(user, { displayName });

            this.setState({
                ...initialState
            })

        }
        catch(err) {
            //console.log(err);
        }

    }
    render() {
        const { displayName, email, password, confirmPassword, errors } = this.state;
        const configAuthWrapper = {
            headline: 'No account? sign up here'
        };
        return(
        
        <AuthWrapper {...configAuthWrapper}>
            <div className ="formWrap">
                <form onSubmit={this.handleFormSubmit}>
                        <FormInput 
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder= "Enter Name"
                        onChange={this.handleChange} />

                        <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder= "Enter email"
                        onChange={this.handleChange} />

                        <FormInput 
                        type="password"
                        name="password"
                        value={password}
                        placeholder= "Enter Password"
                        onChange={this.handleChange} />

                        <FormInput 
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder= "Confirm Password"
                        onChange={this.handleChange} />

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
}

export default SignUp;