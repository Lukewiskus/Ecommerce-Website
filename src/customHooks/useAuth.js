//all custom hooks should be prefixed with use
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//this custom hook will be used to


//deconstructed the currentUser
const mapState = ({ user }) => ({
    currentUser: user.currentUser
});


//we want to use the UseEffect react hook, and if the current user is
// null, that means the user is not logged in, so if they are not logged in, they
// need to be redirected, which is what this hook does
const useAuth = props => {
    const { currentUser } = useSelector(mapState);
    const history = useHistory();

    useEffect(() => {
        //if current user is null, then redirect user to log in page
        if(!currentUser) {
            //this redirects the user to the login page if they are trying to access a page without they shouldnt
            history.push('/login');
        }
    }, [currentUser]);
    
    return currentUser;
};

export default useAuth;

