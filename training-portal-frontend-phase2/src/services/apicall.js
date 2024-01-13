import axios from "axios";
import { exportUrl } from "../utils/url";
import jwtDecode from "jwt-decode";
const token = localStorage.getItem("token");
export const checkgetCall = async (token, url) => {
  const res = await fetch(url, {
    // for jwt token
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return res;
};

export const getqueryCall = async (token, baseUrl, jobRole, batch) => {
  const queryParams = new URLSearchParams({
    jobRole: jobRole,
    batch: batch,
  });
  console.log(jobRole);
  const url = `${baseUrl}?${queryParams.toString()}`;
  const res = await fetch(url, {
    // for jwt token
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return res;
};
// fetch data of a single course
export const fetchDataFromAPI = async (token, url, course) => {
  try {
    const response = await fetch(url + course, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) {
      return response.json();
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const fetchWeeklyEvaluationTableData = async (token, url) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
        accept: "application/json",
      },
    });
    if (response.ok) {
      return response.json();
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const postEmailNotification = async (url, token, data) => {
  try {
    console.log(data);
    const response = await axios.post(url, data, {
      headers: {
        Authorization: "Bearer " + token,
        accept: "application/json",
      },
    });
    return response;
  } catch (err) {
    throw err.response;
  }
};

export const deleteCall = async (token, url, course) => {
  try {
    const response = await fetch(url + course, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "DELETE",
    });
    if (response.ok) {
      return response;
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
export async function exportUsers(selectedRows, navigate) {
  try {
    // exportUsers() {

    const export_API = `${exportUrl}course`;
    const res = await fetch(export_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: selectedRows === null ? JSON.stringify([]) : JSON.stringify(selectedRows),
      // body:JSON.stringify([]),
    });

    if (res.ok) {
      const csvData = await res.text();
      console.log(csvData, "csvdata");
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "courses.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      navigate("/500");
      throw new Error("Failed to update user data");
    }
  } catch (error) {
    navigate("/500");
    throw new Error("An error occurred => shivam " + error);
  }

  // Implement your delete logic here
}

export const deleteBulkCall = async (token, url, coursesID) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ coursesID: coursesID }),
    });
    if (response.ok) {
      return response;
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
