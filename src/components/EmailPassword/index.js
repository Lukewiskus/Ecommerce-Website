import React, { useState, useEffect } from 'react';
import "./styles.scss";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordStart, resetUserState } from './../../redux/User/user.actions';

import AutherWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";


const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
})

const EmailPassword = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { resetPasswordSuccess, userErr } = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(resetPasswordSuccess){
            //we need to reset the userState so that they can access the forget 
            //password page again if they need to
            dispatch(resetUserState());
            history.push('/login');
        }
    },
    [resetPasswordSuccess]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length > 0){
            setErrors(userErr);
        }
    },
    [userErr]);
  
    const handleSubmit = e => {
        //prevents from reloading the page
        e.preventDefault();
        dispatch(resetPasswordStart({ email }))
    
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
export default EmailPassword;