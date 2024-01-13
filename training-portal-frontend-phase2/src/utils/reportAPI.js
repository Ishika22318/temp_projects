import jwtDecode from "jwt-decode";
import {ReportUrl} from "./url";

export const fetchData = async (email, navigate) => {
  const token = localStorage.getItem("token");
  const currentUser = jwtDecode(token);
  try {
    let API;
    // console.log(currentUser.email);

    if (currentUser.role === "Admin") {
      API = ReportUrl + email;
    } else if (currentUser.email !== undefined) {
      API = ReportUrl + currentUser.email;
    }
    const res = await fetch(API, {
      // for jwt token
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      navigate("/500");
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    navigate("/500");
    throw new Error("An error occurred => " + error);
  }
};

export const fetchSingleUserData = async (userEmail, navigate) => {
  const token = localStorage.getItem("token");
  // const currentUser = jwtDecode(token);
  try {
    const API = `${ReportUrl + userEmail}`;
    // const res = await fetch(API, {
    //   // for jwt token
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // });
    const res = await fetch(API);
    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      navigate("/500");
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    navigate("/500");
    throw new Error("An error occurred => " + error);
  }
};
