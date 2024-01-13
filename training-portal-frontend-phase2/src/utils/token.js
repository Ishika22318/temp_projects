


import jwtDecode from "jwt-decode";
 
const token = localStorage.getItem('token');

export const getEmailFromToken = () => {
  const decodedToken=jwtDecode(token);
  if (decodedToken) {
    return decodedToken.email;
  }
  return null; 
};

export const getToken = () => {
  return token;
};
