import { ReportUrl, adminPerformanceReportUrl, usersUrl } from "../utils/url";

export const getAllUsersReports = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${adminPerformanceReportUrl}getAllUsersReports`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data;
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

export const getSingleUserReport = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${usersUrl}${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data;
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

export const getTopandPoorPerformer = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${adminPerformanceReportUrl}getTopandPoorPerformer`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      return data;
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

export const getSingleUserGradeReport = async (email) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(
      `${ReportUrl}${email}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    } else if (res.status === 401) {
      throw new Error("Unauthorized");
    } else if (res.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
