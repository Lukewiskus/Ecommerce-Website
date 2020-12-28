// we need to make sure they are checked in and have the admin rights assigned to thier account
import { useAdminAuth } from './../customHooks';


const WithAdminAuth = props => useAdminAuth(props) && props.children;

export default WithAdminAuth;