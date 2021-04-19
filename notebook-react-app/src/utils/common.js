  
  // return the token from the session storage
  export const getSessionToken = () => {
    return sessionStorage.getItem('token') || null;
  }
   
  // remove the token and user from the session storage
  export const removeSessionToken = () => {
    sessionStorage.removeItem('token');
  }
   
  // set the token and user from the session storage
  export const setSessionToken = (token) => {
    sessionStorage.setItem('token', token);
  }

  export const capitalize = (text) => {
    var lower = text.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}