import React from "react";

import AdminTable from "./AdminTable"
import Tabs from "./Tabs"

function TrainingTab() {
  const tabHeadingsData = [
    {
      label: "technical",
      value: "1",
    },
    {
      label: "soft courses",
      value: "2",
    },
  ];
  return (

    <div className="col-12 px-0 mt-5 pt-4" data-testid="trainingTab">
      <Tabs tabHeadingsData={tabHeadingsData} />
    </div>
  );
}

export default TrainingTab;
