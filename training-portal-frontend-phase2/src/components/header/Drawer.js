import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  Button,
  IconButton,
  List,
  Divider,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../assets/images/header-images/Quantiphi.png";

const DrawerComp = () => {
  const navigate = useNavigate();

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    return navigate("/");
  };

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        data-testid="presentation"
        onClose={() => setOpenDrawer(false)}
      >
        <List sx={{ width: "100vw" }}>
          <div>
            <div>
              <img
                src={logo}
                alt="Quantiphi"
                style={{
                  marginTop: "2px",
                  marginLeft: "10px",
                  width: "127px",
                  height: "34px",
                }}
              />
            </div>
            <div>
              <IconButton
                sx={{ float: "right" }}
                onClick={() => setOpenDrawer(false)}
                aria-label="Close drawer"
                data-testid="close-icon"
              ></IconButton>
            </div>
          </div>
          <ListItemButton component={Link} to="/learning">
            <ListItem
              onClick={() => setOpenDrawer(false)}
              aria-label="My Learning"
              data-testid="learning"
            >
              <ListItemIcon>
                <ListItemText primary="My Learning" />
              </ListItemIcon>
            </ListItem>
          </ListItemButton>
          <Divider />
          <ListItemButton component={Link} to="/courses">
            <ListItem
              onClick={() => setOpenDrawer(false)}
              aria-label="Courses"
              data-testid="Courses"
            >
              <ListItemIcon>
                <ListItemText primary="Courses" />
              </ListItemIcon>
            </ListItem>
          </ListItemButton>
          <Divider />
          <ListItemButton component={Link} to="/training">
            <ListItem
              onClick={() => setOpenDrawer(false)}
              aria-label="Training"
              data-testid="training"
            >
              <ListItemIcon>
                <ListItemText primary="Training" />
              </ListItemIcon>
            </ListItem>
          </ListItemButton>
          <Divider />
          <ListItemButton component={Link} to="/report">
            <ListItem
              data-testid="report"
              onClick={() => setOpenDrawer(false)}
              aria-label="Report"
            >
              <ListItemIcon>
                <ListItemText primary="Report" />
              </ListItemIcon>
            </ListItem>
          </ListItemButton>
          <Divider />
          {/* <ListItemButton component={Link} to="/cloud">
            <ListItem
              onClick={() => setOpenDrawer(false)}
              aria-label="Cloud Request"
            >
              <ListItemIcon>
                <ListItemText primary="Cloud Request" />
              </ListItemIcon>
            </ListItem>
          </ListItemButton> */}
          <Divider />
          <Button
            sx={{ bottom: "8vh", right: "40vw", position: "fixed" }}
            variant="outlined"
            data-testid="logout"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "black", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
        aria-label="Open drawer"
        data-testid="open-drawer"
      >
        <MenuIcon color="black" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
