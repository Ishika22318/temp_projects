import React, {useState, useEffect} from "react";
import GenericTable from "../../genericTable/genricTable";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {useNavigate} from "react-router-dom";
import {exportUsers, fetchUsersData} from "../../../utils/usersAPI";
import {TABLE_HEADERS, USER_ROLES} from "../../../utils/constants";
import "./userHomeScreenComponents.css";

function TabularData({handleTabChange, filteredData}) {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const data = filteredData;

  // Filter data based on the selected tab's role
  const filteredTabData =
    selectedTab === 0
      ? data.filter((item) => item.role === USER_ROLES.INTERN)
      : selectedTab === 1
      ? data.filter((item) => item.role === USER_ROLES.MENTOR)
      : data.filter((item) => item.role === USER_ROLES.ADMIN);
  // console.log(filteredTabData);

  // Callback function to handle row selection
  const handleRowSelect = (selectedRowIds) => {
    setSelectedRows(selectedRowIds);
  };

  const downloadSelectedRows = async () => {
    try {
      await exportUsers(selectedRows, navigate);
    } catch (error) {
      console.error("Error in Downloading: ", error);
    }
  };
  // Callback function to handle edit button clicks
  const handleEditClick = (rowData) => {
    const mentorList = data.filter((item) => item.role === USER_ROLES.MENTOR);
    const internList = data.filter((item) => item.role === USER_ROLES.INTERN);
    // Handle the edit action by navigating to the edit page

    navigate(`/edit/${rowData.id}`, {state: {userData: rowData, mentorList, internList}});
  };

  // Callback function to handle view user clicks
  const handleViewUserClick = (rowData) => {
    const mentorList = data.filter((item) => item.role === USER_ROLES.MENTOR);
    const internList = data.filter((item) => item.role === USER_ROLES.INTERN);
    navigate(`/users/${rowData.id}`, {
      state: {userId: rowData.id, mentorList, internList},
    });
  };

  // Handle tab change
  const handleChangeTab = (event, newValue) => {
    handleTabChange(newValue);
    setSelectedTab(newValue);
  };

  // Determine headers based on the selected tab
  const headers = selectedTab === 0 ? TABLE_HEADERS.Intern : selectedTab === 1 ? TABLE_HEADERS.Mentor : TABLE_HEADERS.Admin;

  return (
    <div>
      <div className="tabular-data">
        <Tabs value={selectedTab} onChange={handleChangeTab}>
          {Object.values(USER_ROLES).map((role, index) => (
            <Tab key={role} label={role} className={selectedTab === index ? "tabular-data-selected" : "tabular-data-unselected"} />
          ))}
        </Tabs>
      </div>
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <GenericTable
          headers={headers}
          data={filteredTabData}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onEditClick={handleEditClick}
          onViewClick={handleViewUserClick}
          downloadSelectedRows={downloadSelectedRows}
        />
      )}
    </div>
  );
}

export default TabularData;
