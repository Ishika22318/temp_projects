export const handleError =  (error,navigate) => {
    if(error.message==="Unauthorized"){
        localStorage.clear()
        navigate("/401")
      }
      else if(error.message==="Not Found"){
        navigate("/404")
      }
      else if(error.message==="Internal Server Error"){
        navigate("/500")
      }else{
        navigate("/500")
      }
  };
  