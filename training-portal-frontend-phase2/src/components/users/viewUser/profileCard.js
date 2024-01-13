import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PersonIcon from "@mui/icons-material/Person";
import ProfileUserCard from "./profileUserCard";
import { useNavigate } from "react-router-dom";
import PhoneIcon from "../../../assets/icon/PhoneIcon";
import MailIcon from "../../../assets/icon/MailIcon";
import ActiveIcon from "../../../assets/icon/ActiveIcon";
import GreentickIcon from "../../../assets/icon/GreentickIcon";
import Divider from "@mui/material/Divider";
import CrossIcon from "../../../assets/icon/CrossIcon";
import "./profileCardStyles.css";

const useStyles = makeStyles({
  card: {},
  box: {},
  media: {},
  content: {},
  status: {},
  alignrow: {},
  rightborder: {},
  alignMentors: {},
  name: {},
  mentorcard: {},
  gridContainer: {},
  gridItem: {},
  editbutton: {},
  smalltext: {},
  buttonstyle: {},
});

const ProfileCard = ({ profile, mentorList, internList }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const onEditClick = (profile) => {
    navigate(`/edit/${profile.id}`, { state: { userData: profile, mentorList, internList } });
  };

  return (
    <>
      <Box container>
        <Card className={`custom-card ${classes.card}`}>
          <Box className={`custom-box ${classes.box}`}>
            {profile.profilePicture ? (
              <CardMedia className={`custom-media ${classes.media}`} image={profile.profilePicture} title="Profile Photo" />
            ) : (
              <Box className="custom-cardmed">
                <Box className="custom-medcard">
                  {profile.name && profile.name[0].toUpperCase()}
                  {profile.name && profile.name.indexOf(" ") !== -1 && profile.name.split(" ").length > 1 ? profile.name.split(" ")[1][0].toUpperCase() : ""}
                </Box>
              </Box>
            )}

            <CardContent className={`custom-content ${classes.content}`}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h5" className="name-heading">
                  {profile.name}
                </Typography>
                <Button variant="text" type="link" size="large" className={`custom-editbutton ${classes.editbutton}`} onClick={() => onEditClick(profile)}>
                  Edit
                </Button>
              </div>

              <Typography variant="text" className="email-phone">
                <MailIcon />
                {profile.email}
              </Typography>

              <Typography variant="text" className="email-phone">
                <PhoneIcon />
                {profile.contact}
              </Typography>
            </CardContent>
          </Box>

          {/* Displaying the  ACTIVE    , JOB  , JOBROLE , Project Released . */}
          <div className={`custom-status ${classes.status}`}>
            <div className={`custom-alignrow ${classes.alignrow}`}>
              <div>
                <ActiveIcon profile={profile} />
              </div>
              <div className="marginL5">{(profile.status === "true" && "Active") || "Inactive"}</div>
            </div>
            <Divider orientation="vertical" flexItem />
            <div>
              <PersonIcon /> {profile.role}
            </div>
            {/* <Divider orientation="vertical" flexItem /> */}
            {profile.role !== "Admin" ? <Divider orientation="vertical" flexItem /> : null}

            {profile.role === "Intern" || profile.role === "Mentor" ? (
              <div>
                <div className={`custom-buttonstyle ${classes.buttonstyle}`}>{profile.jobRole}</div>
              </div>
            ) : null}
            {/* <Divider orientation="vertical" flexItem /> */}
            {(profile.role !== "Admin" && profile.role !== "Mentor") ? <Divider orientation="vertical" flexItem /> : null}

            {profile.role === "Intern" ? (
              <div className={`custom-alignrow ${classes.alignrow}`}>
                <div className="marginR5">Project Released</div>
                <div>{profile.released === "true" ? <GreentickIcon /> : <CrossIcon />}</div>
              </div>
            ) : null}
          </div>
        </Card>

        <Box container className="margin-mentor-count">
          {profile.role === "Intern" && (
            <div className={`custom-smalltext ${classes.smalltext}`}>
              Showing {profile.assignedMentors.length} Mentor
              {profile.assignedMentors.length > 1 ? "s" : ""}
            </div>
          )}
          {profile.role === "Mentor" && (
            <div className={`custom-smalltext ${classes.smalltext}`}>
              Showing {profile.assignedInterns.length} Intern
              {profile.assignedInterns.length > 1 ? "s" : ""}
            </div>
          )}
        </Box>

        <ProfileUserCard profile={profile} />
      </Box>
    </>
  );
};

export default ProfileCard;
