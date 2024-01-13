import React from 'react'
import BatchItem from "./BatchItem";
import SingleLineFormComponent from "./EditForm"

function EditBatch() {
  return (
    <div style={{marginTop:"70px"}}>
      <BatchItem />
      <SingleLineFormComponent />
    </div>
  );
}

export default EditBatch;