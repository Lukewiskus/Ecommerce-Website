import React, { useState } from 'react';
import "./styles.scss";
import { withRouter } from 'react-router-dom';

import AutherWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";

import {auth} from "./../../firebase/utils";

const EmailPassword = props => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

  
    const handleSubmit = async (e) => {
        //prevents from reloading the page
        e.preventDefault();

        //integrate with firebase on a submit to send an email to the email entered to attempt to change the password
        try {
            
            const config = {
                //this url is the url the user gets redirected to after redoing their password 
                url: 'http://localhost:3000/login'
            };
            await auth.sendPasswordResetEmail(email, config)
            //.then means the password was reset    
            .then(() => {
                //if successful, redirect to ./login (should probably make a custom page that says check your email)
                    props.history.push('./login')
                })
            //.catch means the password was not reset
            .catch(() => {
                const err = ['Email not found. Please try a different Email'];
                setErrors(err);
            });
        }
        catch(err){
            //console.log(err);
        }
    }




        const configAuthWrapper = {
            headline: "Password Recovery"
        };

        return(
            <AutherWrapper {...configAuthWrapper}>
                <div className="formWrap">
                    <form onSubmit={handleSubmit}>
                        <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter Email"
                        handleChange={e => setEmail(e.target.value)}
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

//withRouter gives us access to the history stored in reactRouter
export default withRouter(EmailPassword);