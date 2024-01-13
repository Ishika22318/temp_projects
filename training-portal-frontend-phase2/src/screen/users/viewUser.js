import React, { useEffect, useState } from "react";
import UsersHeader from "../../components/users/userHomeScreen/usersHeading";
import ProfileCard from "../../components/users/viewUser/profileCard";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { fetchUserData } from "../../utils/usersAPI";
import { HEADERS } from "../../utils/constants";

const viewUser = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([]);

  let profileData;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();

  const userId = location.state.userId;

  const { mentorList, internList } = location.state;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData(userId);
        const apiData = await response.data;
        // Store all data in state
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  profileData = data;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const profile = {
    id: profileData.id,
    name: profileData.name,
    contact: profileData.contact,
    jobRole: profileData.jobRole,
    email: profileData.email,
    status: profileData.status,
    role: profileData.role,
    released: profileData.released,
    profilePicture: profileData.profilePicture,
    assignedMentors: profileData.assignedMentors,
    assignedInterns: profileData.assignedInterns,
  };

  return (
    <>
      <div>
        <Box className="page-container">
          <Box className="header-container">
            <Box className="flex-container">
              <UsersHeader title={HEADERS.USERS} />
            </Box>
          </Box>
          <Box className="profile-card-container">
            <ProfileCard profile={profile} mentorList={mentorList} internList={internList} />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default viewUser;
