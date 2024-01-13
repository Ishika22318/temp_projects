import {BatchUrl, usersUrl, exportUrl} from "../utils/url";
export const batchDetailsAPI = async (batchId) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BatchUrl}${batchId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const usersResponse = await fetch(`${usersUrl}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (res.ok && usersResponse.ok) {
      const data = await res.json();
      const usersJson = await usersResponse.json();
      return {data, usersJson};
    } else if (res.status === 401) {
      throw new Error("Unauthorized");
    } else if (res.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    console.log("error", err);
    throw new Error(err.message);
  }
};

export const batchAPI = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BatchUrl}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (res.ok) {
      const data = await res.json();

      const batchNames = data.data.map((batch) => batch.batch_name);

      return {data, batchNames};

      // return { data };
    } else if (res.status === 401) {
      throw new Error("Unauthorized");
    } else if (res.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    console.log("error", err);
    throw new Error(err.message);
  }
};

export const deleteBatch = async (selectedRows) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BatchUrl}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(selectedRows), // Convert to JSON string
    });
    if (res.ok) {
      const data = await res.json();
      return {data};
    } else if (res.status === 401) {
      throw new Error("Unauthorized");
    } else if (res.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    console.log("error", err);
    throw new Error(err.message);
  }
};

export const downloadBatch = async (selectedRows) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BatchUrl}exportBatch`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(selectedRows), // Convert to JSON string
    });

    if (res.ok) {
      const csvData = await res.text();
      return {csvData};
    } else if (res.status === 401) {
      throw new Error("Unauthorized");
    } else if (res.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    console.log("error", err);
    throw new Error(err.message);
  }
};

export const downloadAllBatch = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BatchUrl}exportBatch`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify([]), // Convert to JSON string
    });

    if (res.ok) {
      const csvData = await res.text();
      return {csvData};
    } else if (res.status === 401) {
      throw new Error("Unauthorized");
    } else if (res.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    console.log("error", err);
    throw new Error(err.message);
  }
};

export const getCoursesAndJobRolesApi = async () => {
  const token = localStorage.getItem("token");
  try {
    const coursesRes = await fetch("http://localhost:3000/api/v1/coursesNameAndId", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const jobRolesRes = await fetch("http://localhost:3000/api/v1/job-role", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (coursesRes.ok && jobRolesRes.ok) {
      const courses = await coursesRes.json();
      const jobRoles = await jobRolesRes.json();
      //console.log("BatchAPI",courses.data,jobRoles.data);
      return {courses: courses.data, jobRoles: jobRoles.data};
    } else if (coursesRes.status === 401) {
      throw new Error("Unauthorized");
    } else if (coursesRes.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    console.log("error", err);
    throw new Error(err.message);
  }
};

export const createBatchApi = async (batches) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BatchUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(batches),
    });

    if (res.ok) {
      return await res.json();
    } else if (res.status === 401) {
      throw new Error("Unauthorized");
    } else if (res.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    console.log("error", err);
    throw new Error(err.message);
  }
};

export const uploadBatchFileApi = async (formData) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BatchUrl}importBatch`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (res.ok) {
      return await res.json();
    } else if (res.status === 401) {
      throw new Error("Unauthorized");
    } else if (res.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    console.log("error", err);
    throw new Error(err.message);
  }
};

export const editBatchApi = async (batch, batchId, interns) => {
  console.log("Edit Api called for: ", batch, batchId, interns);
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BatchUrl}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({batch: batch, batchId, interns: interns}),
    });

    if (res.ok) {
      return await res.json();
    } else if (res.status === 401) {
      throw new Error("Unauthorized");
    } else if (res.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    console.log("error", err);
    throw new Error(err.message);
  }
};
