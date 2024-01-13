import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import  secureLocalStorage  from  "react-secure-storage";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const checkUserToken = () => {
    const userToken = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (role === "Intern") {
      props.setIsLoggedIn(true);
    } else if (!userToken || userToken === "undefined" || !role || role !== "Intern") {
      localStorage.clear();
      props.setIsLoggedIn(false);
      return navigate("/");
    }

    props.setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [props.isLoggedIn]);
  return <>{props.isLoggedIn ? props.children : null}</>;
};
export default ProtectedRoute;
