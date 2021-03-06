import { useAuth } from './../customHooks';
//this is going to return the current user object from the redux store

const WithAuth = props => useAuth(props) && props.children;


//because its wrapped with withRouter, lower level elements will have access
//to the history within react router
export default WithAuth;
