import jwtDecode from "jwt-decode";
import { usersUrl, exportUrl, importUrl, BatchUrl, jobRoleUrl } from "./url";

import { ErrorMessages } from "./constants";

// Function to fetch all Users
export async function fetchUsersData(navigate) {
  const token = localStorage.getItem("token");
  try {
    const API = `${usersUrl}`;
    const res = await fetch(API, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    // if(response.ok){
    //   return data
    // }else if (response.status === 401) {
    //   throw new Error("Unauthorized");
    // } else if (response.status === 404) {
    //   throw new Error("Not Found");
    // } else {
    //   throw new Error("Internal Server Error");
    // }
    if (res.ok) {
      return data;
    } else {
      navigate("/500");
      localStorage.clear();
      throw new Error(ErrorMessages.FAILED_TO_FETCH_DATA);
    }
  } catch (error) {
    navigate("/500");
    throw new Error(ErrorMessages.AN_ERROR_OCCURRED + error);
  }
}
// Function to fetch single User
export async function fetchUserData(userId, navigate) {
  const token = localStorage.getItem("token");
  try {
    const API = `${usersUrl + userId}`;
    const res = await fetch(API, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      navigate("/500");
      throw new Error(ErrorMessages.FAILED_TO_FETCH_DATA);
    }
  } catch (error) {
    navigate("/500");
    throw new Error(ErrorMessages.AN_ERROR_OCCURRED + error);
  }
}
// // Function to update a user
// export async function updateUserData(userId, userData, navigate) {
//   try {
//     const API = `${usersUrl}${userId}`;
//     console.log("API", API);
//     const res = await fetch(API, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//       body: JSON.stringify(userData),
//     });

//     if (res.ok) {
//       await res.json();

//       navigate("/users/");
//     } else {
//       navigate("/500");
//       throw new Error(ErrorMessages.FAILED_TO_UPDATE_USER_DATA);
//     }
//   } catch (error) {
//     navigate("/500");
//     throw new Error(ErrorMessages.AN_ERROR_OCCURRED + error);
//   }
// }

// Function to update a user
export async function updateUserData(userId, userData, navigate) {
  const token = localStorage.getItem("token");
  try {
    const API = `${usersUrl}${userId}`;
    const res = await fetch(API, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      await res.json();

      navigate("/users/");
    } else {
      navigate("/500");
      throw new Error(ErrorMessages.FAILED_TO_UPDATE_USER_DATA);
    }
  } catch (error) {
    navigate("/500");
    throw new Error(ErrorMessages.AN_ERROR_OCCURRED + error);
  }
}

export async function addUserToDB(userData) {
  const token = localStorage.getItem("token");
  try {
    const API = `${usersUrl}`;
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      if (response.status === 400) {
        window.alert("email already in use");
      }
      throw new Error(`Error adding user: ${response.statusText}`);
    }

    await response.json();
  } catch (error) {
    throw new Error(ErrorMessages.ERROR_ADDING_USER + error);
  }
}

//Function to export the users to CSV file
export async function exportUsers(selectedRows, navigate) {
  const token = localStorage.getItem("token");
  try {
    const export_API = `${exportUrl}users`;
    const res = await fetch(export_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: selectedRows === null ? JSON.stringify([]) : JSON.stringify(selectedRows),
    });
    if (res.ok) {
      const csvData = await res.text();
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "users.csv";
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
}
//function to fetch batchDates
export async function fetchBatchData(navigate) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BatchUrl}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (res.ok) {
      const data = await res.json();

      const { batchNames } = data.data.map((batch) => batch.batch_name);

      return { data, batchNames };

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
}

//fucntion to importUsers from csv file
export async function importUsers(file) {
  const token = localStorage.getItem("token");
  console.log("File is going to backend");
  const formData = new FormData();
  for (const f of file) {
    formData.append("files", f);
  }

  const createdBy = jwtDecode(token).name;
  formData.append("name", createdBy);

  try {
    const res = await fetch(`${importUrl}users`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    const data = await res.json();
    console.log("API call successful", data);
    window.location.reload();

    // Handle the response from the backend
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

// Function to fetch all Batches to use in Add User Form
export async function fetchAllBatches(navigate) {
  const token = localStorage.getItem("token");
  try {
    const API = `${BatchUrl}`;
    const res = await fetch(API, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      navigate("/500");
      localStorage.clear();
      throw new Error(ErrorMessages.FAILED_TO_FETCH_DATA);
    }
  } catch (error) {
    navigate("/500");
    throw new Error(ErrorMessages.AN_ERROR_OCCURRED + error);
  }
}

export const JobRolesApi = async () => {
  const token = localStorage.getItem("token");
  try {
    const jobRolesRes = await fetch(jobRoleUrl, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (jobRolesRes.ok) {
      const jobRoles = await jobRolesRes.json();
      return { jobRoles: jobRoles.data };
    } else if (jobRolesRes.status === 401) {
      throw new Error("Unauthorized");
    } else if (jobRolesRes.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    console.log("error", err);
    throw new Error(err.message);
  }
};
