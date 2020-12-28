//this utitlity function is a boolean function that returns tryue if the user is  an
// admin and false if the user is not
export const checkUserIsAdmin = currentUser => {
    //if there is not current user or if there is no userRoles array
    if(!currentUser || !Array.isArray(currentUser.userRoles)) return;
    const { userRoles } = currentUser;
    
    if(userRoles.includes('admin')) return true;
    return false;
}