import { auth } from './../../firebase/utils';

//were making this in a seperate file so that we can use a .then.catch i think because
// it may not work in generator functions? 
export const handleResetPasswordAPI = (email) => {
    const config = {
        //this url is the url the user gets redirected to after redoing their password 
        url: 'http://localhost:3000/login'
    };

    return new Promise((resolve, reject) => {
    auth.sendPasswordResetEmail(email, config)
        //.then means the password was reset    
        .then(() => {
            resolve();
        })
        //.catch means the password was not reset
        .catch(() => {
            const err = ['Email not found. Please try a different Email'];
            reject(err);
        })
    });
}