// import React, { useState, useEffect } from "react";

// import { styled } from "@mui/material/styles";
// import jwtDecode from "jwt-decode";
// import "./headerstyle.m.css";

// import { Route, BrowserRouter, Switch, Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../../assets/images/header-images/Quantiphi.png";
// import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
// import HelpIcon from "@mui/icons-material/Help";
// import Avatar from "@mui/material/Avatar";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import Logout from "@mui/icons-material/Logout";

// import { AppBar, Typography, useMediaQuery, useTheme, Tab, Tabs, Toolbar } from "@mui/material";
// import DrawerComp from "./Drawer";

// const Header = (props) => {
//   const [currentUserData, setCurrentUserData] = useState("");
//   const [value, setValue] = useState(0);
//   const theme = useTheme();
//   const isMatch = useMediaQuery(theme.breakpoints.down("md"));
//   const navigate = useNavigate();

//   console.log(props.type);
//   const getName = () => {
//     try {
//       const token = localStorage.getItem("token");
//       setCurrentUserData(jwtDecode(token));
//     } catch (err) {
//       localStorage.clear();
//       // navigate("/");
//     }
//   };

//   useEffect(() => {
//     const storedValue = localStorage.getItem("activeTab");
//     if (storedValue !== null) {
//       setValue(parseInt(storedValue));
//     }
//     getName();
//   }, []);

//   const handleTabChange = (event, newValue) => {
//     setValue(newValue);
//     localStorage.setItem("activeTab", newValue);
//   };
//   const handleLogout = async () => {
//     await new Promise((resolve) => {
//       localStorage.clear();
//       props.setIsLoggedIn(false);
//       resolve();
//     });

//     navigate("/");
//     const handleLogout = async () => {
//       await new Promise((resolve) => {
//         localStorage.clear();
//         props.setIsLoggedIn(false);
//         resolve();
//       });

//       navigate("/");
//     };
//     const StyledTab = styled(Tab)({
//       "&.Mui-selected": {
//         color: "#0D4896",
//       },
//       demo: {
//         marginLeft: "80%",
//       },
//       fontSize: "16px",
//       textTransform: "capitalize",
//     });
//     const [anchorEl, setAnchorEl] = useState(null);
//     const open = Boolean(anchorEl);
//     const handleClose = () => {
//       setAnchorEl(null);
//     };
//     return (
//       <React.Fragment>
//         <AppBar sx={{ background: "#FFF" }}>
//           <Toolbar>
//             <img alt="Quantiphi Logo" src={logo} style={{ width: "127px", height: "34px" }} />
//             {isMatch ? (
//               <>
//                 <Typography
//                   sx={{
//                     fontSize: "20px",
//                     paddingLeft: "10px",
//                     color: "#000",
//                     textAlign: "center",
//                   }}
//                 >
//                   Training Portal
//                 </Typography>
//                 <DrawerComp />
//               </>
//             ) : (
//               <>
//                 <Typography style={{ borderLeft: "0.1em solid #D9DAE4", padding: "0.5em" }} sx={{ fontSize: "20px", color: "#000" }}>
//                   Training Portal
//                 </Typography>
//                 {props.type === "Intern" ? (
//                   <>
//                     <Tabs
//                       sx={{ marginLeft: "10px", color: "black", fontSize: "20px" }}
//                       TabIndicatorProps={{
//                         style: {
//                           backgroundColor: "#0D4896",
//                           textColor: "#0D4896",
//                         },
//                       }}
//                       color="secondary"
//                       value={value}
//                       onChange={handleTabChange}
//                     >
//                       <StyledTab component={Link} to={"/learning"} label="My Learning" />
//                       <StyledTab component={Link} to={"/training"} label="Courses" />
//                       <StyledTab component={Link} to={"/report"} label="Report" />
//                     </Tabs>
//                   </>
//                 ) : (
//                   <>
//                     {props.type === "Admin" ? (
//                       <>
//                         <Tabs
//                           sx={{ marginLeft: "10px", color: "black", fontSize: "20px" }}
//                           TabIndicatorProps={{
//                             style: {
//                               backgroundColor: "#0D4896",
//                               textColor: "#0D4896",
//                             },
//                           }}
//                           color="secondary"
//                           value={value}
//                           onChange={handleTabChange}
//                         >
//                           <StyledTab component={Link} to={"/admin"} label="My Board" />
//                           <StyledTab component={Link} to={"/courses"} label="Courses" />
//                           <StyledTab component={Link} to={"/performance"} label="Performance" />
//                           <StyledTab component={Link} to={"/batch"} label="Batch" />
//                           <StyledTab component={Link} to={"/users"} label="Users" />
//                         </Tabs>
//                       </>
//                     ) : (
//                       <></>
//                     )}
//                   </>
//                 )}

//                 <NotificationsRoundedIcon
//                   className="demo"
//                   sx={{
//                     transform: "scale(2)",
//                     color: "#000",
//                     height: "15px",
//                     width: "14px",
//                     marginLeft: "auto !important",
//                   }}
//                 />
//                 <Typography
//                   sx={{
//                     fontSize: "16px",
//                     color: "#000",
//                     marginLeft: "15px !important",
//                   }}
//                 >
//                   {currentUserData.name}
//                 </Typography>
//                 <Tooltip title="Logout">
//                   <IconButton
//                     onClick={handleLogout}
//                     data-testid="logout-button"
//                     size="small"
//                     sx={{ ml: 2 }}
//                     aria-controls={open ? "account-menu" : undefined}
//                     aria-haspopup="true"
//                     aria-expanded={open ? "true" : undefined}
//                   >
//                     <Avatar sx={{ width: 32, height: 32 }}></Avatar>
//                   </IconButton>
//                 </Tooltip>
//                 <Menu
//                   anchorEl={anchorEl}
//                   id="account-menu"
//                   open={open}
//                   onClose={handleClose}
//                   onClick={handleClose}
//                   PaperProps={{
//                     elevation: 0,
//                     sx: {
//                       overflow: "visible",
//                       filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//                       mt: 1.5,
//                       "& .MuiAvatar-root": {
//                         width: 32,
//                         height: 32,
//                         ml: -0.5,
//                         mr: 1,
//                       },
//                       "&:before": {
//                         content: '""',
//                         display: "block",
//                         position: "absolute",
//                         top: 0,
//                         right: 14,
//                         width: 10,
//                         height: 10,
//                         bgcolor: "background.paper",
//                         transform: "translateY(-50%) rotate(45deg)",
//                         zIndex: 0,
//                       },
//                     },
//                   }}
//                   transformOrigin={{ horizontal: "right", vertical: "top" }}
//                   anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//                 >
//                   <MenuItem onClick={handleClose}>
//                     <ListItemIcon>
//                       <Logout fontSize="small" />
//                     </ListItemIcon>
//                     Logout
//                   </MenuItem>
//                 </Menu>
//                 <HelpIcon
//                   sx={{
//                     transform: "scale(2)",
//                     color: "#000",
//                     height: "15px",
//                     width: "14px",
//                     marginLeft: "15px",
//                   }}
//                 />
//               </>
//             )}
//           </Toolbar>
//         </AppBar>
//       </React.Fragment>
//     );
//   };
// };
// export default Header;

import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import jwtDecode from "jwt-decode";
import "./headerstyle.m.css";
import { Route, BrowserRouter, Switch, Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/header-images/Quantiphi.png";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import HelpIcon from "@mui/icons-material/Help";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { AppBar, Typography, useMediaQuery, useTheme, Tab, Tabs, Toolbar } from "@mui/material";
import DrawerComp from "./Drawer";

const Header = (props) => {
  const [currentUserData, setCurrentUserData] = useState("");
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  // console.log(props.type);

  const getName = () => {
    try {
      const token = localStorage.getItem("token");
      setCurrentUserData(jwtDecode(token));
    } catch (err) {
      localStorage.clear();
      // navigate("/");
    }
  };

  useEffect(() => {
    const storedValue = localStorage.getItem("activeTab");
    if (storedValue !== null) {
      setValue(parseInt(storedValue));
    }
    getName();
  }, []);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("activeTab", newValue);
  };

  const handleLogout = async () => {
    await new Promise((resolve) => {
      localStorage.clear();
      props.setIsLoggedIn(false);
      resolve();
    });

    navigate("/");
  };

  const StyledTab = styled(Tab)({
    "&.Mui-selected": {
      color: "#0D4896",
    },
    demo: {
      marginLeft: "80%",
    },
    fontSize: "16px",
    textTransform: "capitalize",
  });

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#FFF" }}>
        <Toolbar>
          <img alt="Quantiphi Logo" src={logo} style={{ width: "127px", height: "34px" }} />
          {isMatch ? (
            <>
              <Typography
                sx={{
                  fontSize: "20px",
                  paddingLeft: "10px",
                  color: "#000",
                  textAlign: "center",
                }}
              >
                Training Portal
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Typography style={{ borderLeft: "0.1em solid #D9DAE4", padding: "0.5em" }} sx={{ fontSize: "20px", color: "#000" }}>
                Training Portal
              </Typography>
              {props.type === "Intern" ? (
                <>
                  <Tabs
                    sx={{ marginLeft: "10px", color: "black", fontSize: "20px" }}
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: "#0D4896",
                        textColor: "#0D4896",
                      },
                    }}
                    color="secondary"
                    value={value}
                    onChange={handleTabChange}
                  >
                    <StyledTab component={Link} to={"/learning"} label="My Learning" />
                    <StyledTab component={Link} to={"/training"} label="Courses" />
                    <StyledTab component={Link} to={"/report"} label="Report" />
                  </Tabs>
                </>
              ) : (
                <>
                  {props.type === "Admin" ? (
                    <>
                      <Tabs
                        sx={{ marginLeft: "10px", color: "black", fontSize: "20px" }}
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: "#0D4896",
                            textColor: "#0D4896",
                          },
                        }}
                        color="secondary"
                        value={value}
                        onChange={handleTabChange}
                      >
                        <StyledTab component={Link} to={"/admin"} label="My Board" />
                        <StyledTab component={Link} to={"/courses"} label="Courses" />
                        <StyledTab component={Link} to={"/performance"} label="Performance" />
                        <StyledTab component={Link} to={"/batch"} label="Batch" />
                        <StyledTab component={Link} to={"/users"} label="Users" />
                      </Tabs>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}

              <NotificationsRoundedIcon
                className="demo"
                sx={{
                  transform: "scale(2)",
                  color: "#000",
                  height: "15px",
                  width: "14px",
                  marginLeft: "auto !important",
                }}
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#000",
                  marginLeft: "15px !important",
                }}
              >
                {currentUserData.name}
              </Typography>
              <Tooltip title="Logout">
                <IconButton
                  onClick={handleLogout}
                  data-testid="logout-button"
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
              <HelpIcon
                sx={{
                  transform: "scale(2)",
                  color: "#000",
                  height: "15px",
                  width: "14px",
                  marginLeft: "15px",
                }}
              />
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
