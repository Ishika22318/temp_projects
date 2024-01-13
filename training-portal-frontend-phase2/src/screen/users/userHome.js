import React, { useState } from "react";
import TabularData from "../../components/users/userHomeScreen/tabularData";
import PageHeader from "../../components/users/userHomeScreen/pageHeader";

const Users = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [reloadData, setReloadData] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  const handleReloadData = () => {
    setReloadData(!reloadData);
  };

  // Callback function to set the filtered data
  const handleFilterData = (data) => {
    setFilteredData(data);
    // console.log("data", data);
  };

  return (
    <div>
      <PageHeader handleReloadData={handleReloadData} handleFilterData={handleFilterData} key={reloadData} />
      <TabularData handleTabChange={handleTabChange} filteredData={filteredData} />
    </div>
  );
};
export default Users;
