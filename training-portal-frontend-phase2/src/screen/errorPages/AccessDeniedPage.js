import React from "react";
import AccessDenied from "../../components/errorPages/AccessDenied";
const AccessDeniedPage = (props) => {
    return <AccessDenied setIsLoggedIn={props.setIsLoggedIn} / >
}
export default AccessDeniedPage