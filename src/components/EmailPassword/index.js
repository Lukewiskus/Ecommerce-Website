import React, { useState, useEffect } from 'react';
import "./styles.scss";
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, resetAllAuthForms } from './../../redux/User/user.actions';

import AutherWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";


const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
})

const EmailPassword = props => {
    const dispatch = useDispatch();
    const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(resetPasswordSuccess){
            dispatch(resetAllAuthForms());
            props.history.push('/login');
        }
    },
    [resetPasswordSuccess]);
    useEffect(() => {
        if(Array.isArray(resetPasswordError) && resetPasswordError.length > 0){
            setErrors(resetPasswordError);
        }
    },
    [resetPasswordError]);
  
    const handleSubmit = e => {
        //prevents from reloading the page
        e.preventDefault();
        dispatch(resetPassword({ email }))
    
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