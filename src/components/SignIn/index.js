import React, { Component } from 'react';
import './styles.scss';
import Button from "./../forms/Button";
import FormInput from "./../forms/FormInput"
import { signInWithGoogle,auth } from './../../firebase/utils';


const initialState = {
    email: '',
    password: '',

}

class SignIn extends Component {

    constructor(props){
        super(props);
        this.state = {
            ...initialState
        };
        //calls handle change so the text box can be updated
        this.handleChange = this.handleChange.bind(this);
    }

    //handle change allows for the text box to be updated
    handleChange(e) {
        const { name, value} = e.target;
        this.setState({
            [name]: value
        });
    }


    //handleSubmit makes it so the page wont reload on 
    //button click, called in form onSubmit
    handleSubmit = async e => {
        e.preventDefault();

        const { email, password } = this.state;
        
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                ...initialState
            });
        }
        catch(err){
            //console.log(err);
        }

    }
    render() {
        const { email, password} = this.state
        return(
        <div className="signin">
            <div className='wrap'>
                <h2>Login in</h2>
            <div className ="formWrap">
                <form onSubmit={this.handleSubmit}>
                    <div className="socialSignIn">
                        <div className="row">
                        <FormInput 
                        type="email"
                        name="email"
                        value= {email}
                        placeholder="Enter Email"
                        handleChange={this.handleChange}
                    />
                    <FormInput 
                        type="password"
                        name="password"
                        value= { password }
                        placeholder="Enter Password"
                        handleChange={this.handleChange}
                    />

                    <Button type="submit">
                        LogIn
                    </Button>
                    <h1> or </h1>
                            <Button onClick={signInWithGoogle}>
                                Sign In With Google
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

export default SignIn;