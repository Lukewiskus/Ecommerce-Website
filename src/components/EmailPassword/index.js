import React, { Component } from 'react';
import "./styles.scss";
import { withRouter } from 'react-router-dom';

import AutherWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";

import {auth} from "./../../firebase/utils";

const initialState = {
    email: '',
    errors: []
};

class EmailPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        //updates name to the value entered by user
        const {name,value} = e.target;
        this.setState({
            [name]: value
        })
    }   

    handleSubmit = async (e) => {
        //prevents from reloading the page
        e.preventDefault();

        //integrate with firebase on a submit to send an email to the email entered to attempt to change the password
        try {
            const { email } = this.state;

            const config = {
                //this url is the url the user gets redirected to after redoing their password 
                url: 'http://localhost:3000/login'
            };
            await auth.sendPasswordResetEmail(email, config)
            //.then means the password was reset    
            .then(() => {
                //if successful, redirect to ./login (should probably make a custom page that says check your email)
                    this.props.history.push('./login')
                })
            //.catch means the password was not reset
            .catch(() => {
                const err = ['Email not found. Please try a different Email'];
                this.setState({
                    errors: err
                });
            });
        }
        catch(err){
            //console.log(err);
        }
    }

    render(){
        const{ email, errors } = this.state;

        const configAuthWrapper = {
            headline: "Password Recovery"
        };

        return(
            <AutherWrapper {...configAuthWrapper}>
                <div className="formWrap">
                    <form onSubmit={this.handleSubmit}>
                        <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter Email"
                        onChange={this.handleChange}
                        />
                        {errors.length > 0 && (
                        <ul id="errorMessage" >
                            {errors.map((e,index) => {
                                return (
                                    <li key={index}>
                                    {e}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                        <Button type="submit">
                            Email Password
                        </Button>
                    </form>
                    
                </div>
            </AutherWrapper>
        );
    }
}

//withRouter gives us access to the history stored in reactRouter
export default withRouter(EmailPassword);