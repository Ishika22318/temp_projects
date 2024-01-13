import React, { useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { Paper, Divider, Button, Box } from "@mui/material";
import UsersHeader from "../../components/users/userHomeScreen/usersHeading";
import CommonFields from "../../components/users/editScreen/commonFields";
import InternFields from "../../components/users/editScreen/internFields";
import MentorFields from "../../components/users/editScreen/mentorFields";
import AdminFields from "../../components/users/editScreen/adminFields";
import { updateUserData } from "../../utils/usersAPI";
import { HEADERS, USER_ROLES } from "../../utils/constants";
import "../../components/users/editScreen/editScreenComponents.css";

const UserEditForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mentorList, internList } = location.state;
  const initialUserData = location.state.userData || {};

  const [userData, setUserData] = useState({
    name: initialUserData.name,
    email: initialUserData.email,
    role: initialUserData.role,
    jobRole: initialUserData.jobRole,
    released: initialUserData.released,
    status: initialUserData.status,
    contact: initialUserData.contact,
    assignedMentors: initialUserData.assignedMentors || [],
    assignedInterns: initialUserData.assignedInterns || [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  let roleSpecificFields = null;

  if (initialUserData.role === USER_ROLES.INTERN) {
    roleSpecificFields = <InternFields userData={userData} handleChange={handleChange} mentorList={mentorList} />;
  } else if (initialUserData.role === USER_ROLES.MENTOR) {
    roleSpecificFields = <MentorFields userData={userData} handleChange={handleChange} internList={internList} />;
  } else if (initialUserData.role === USER_ROLES.ADMIN) {
    roleSpecificFields = <AdminFields userData={userData} handleChange={handleChange} />;
  }

  const updateData = async () => {
    try {
      const userId = initialUserData.id;
      const updatedUserData = { ...userData };

      await updateUserData(userId, updatedUserData, navigate);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div>
      <Box className="user-edit-form-container">
        <Box className="user-edit-form-container-one">
          <Box className="user-edit-form-container-two">
            <UsersHeader title={HEADERS.USERS} />
          </Box>
        </Box>
        <Paper className="user-edit-form-paper">
          <form>
            <CommonFields userData={userData} handleChange={handleChange} />
            {roleSpecificFields}
            <Divider className="user-edit-form-divider" />

            <Box className="user-edit-form-button-container">
              <Button onClick={() => navigate(-1)} variant="contained" className="user-edit-form-button">
                Cancel
              </Button>

              <Button variant="contained" onClick={updateData} className="user-edit-form-button user-edit-form-update-button">
                Update
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default UserEditForm;
