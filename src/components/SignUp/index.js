import React, { Component } from 'react';
import './styles.scss';
import Button from "./../forms/Button";
import FormInput from "./../forms/FormInput";
import { signInWithGoogle, auth, handleUserProfile } from '../../firebase/utils';


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
            const err = ['Passwords do not match'];
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
    return(
        <div className="signup">
            <div className='wrap'>
                <h2>Don't Have an acount? Create one!</h2>

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

            <div className ="formWrap">
                <form onSubmit={this.handleFormSubmit}>
                    <div className="socialSignIn">
                        <div className="signUpItems">
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

                            <h1>or</h1>

                            <Button onClick={signInWithGoogle}>
                                Sign Up With Google
                            </Button>

                        </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
}
}

export default SignUp;