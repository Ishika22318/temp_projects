import "./App.css";
import React from "react";

import Header from "./components/header/Header";
import Learningtab from "./screen/learningtab/learningtab";
import AdminTable from "./components/trainingTab/AdminTable";
import Form from "./components/loginPageUI/loginPage";
import Report from "./screen/reportTab/report";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import TrainingTabPage from "./screen/trainingTab/TrainingTabPage";
import PageNotFoundPage from "./screen/errorPages/PageNotFoundPage";
import AccessDeniedPage from "./screen/errorPages/AccessDeniedPage";
import InternalServerErrorPage from "./screen/errorPages/InternalServerErrorPage";
import CourseContentPage from "./screen/courseContent/CourseContentPage";
import ProtectedRoute from "./utils/protectedroutes";
import ProtectedRouteAdmin from "./utils/protectedRoutesAdmin";

import { useState, useEffect } from "react";
import DashboardPage from "./screen/adminDashboard/dashboard";
import Users from "./screen/users/userHome";
import UserEditForm from "./screen/users/userEditForm";
import ViewUser from "./screen/users/viewUser";
// import AddUser from "./components/users/addScreen/addUser";
import CreateCourse from "./components/trainingTab/Form";

import SingleUserReport from "./screen/adminPerformanceReport/SingleUserReport";
import PerformanceTable from "./screen/adminPerformanceReport/PerformanceTable";
import TotalInternsReport from "./screen/adminPerformanceReport/TotalInternsReport";

import BatchPage from "./screen/batch/BatchPage";
import BatchDetailsPage from "./screen/batch/BatchDetailsPage";
import EditBatchPage from "./screen/batch/EditBatchPage";

import EditCourse from "./components/trainingTab/EditForm";
import InfoCourse from "./components/courseContent/CourseContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationBox from "./components/trainingTab/ConfirmationBox";
function App() {
  // hooks
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // to check auth state
  const checkUserToken = () => {
    const userToken = localStorage.getItem("token");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <div className="App p-0 m-0">
      <BrowserRouter>
        {/* <Router> */}
        {isLoggedIn === true ? <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} type={localStorage.getItem("role")} /> : <></>}
        <Routes>
          <Route exact path="/" element={isLoggedIn ? <>{localStorage.getItem("role") === "Admin" ? <Navigate to={"/admin"} /> : <Navigate to={"/learning"} />}</> : <Form />} />

          <Route
            path="/Learning"
            element={
              <ProtectedRoute setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <Learningtab />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <Report />
              </ProtectedRoute>
            }
          />

          <Route
            path="/intern-report/:email"
            element={
              <ProtectedRouteAdmin setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <SingleUserReport />
              </ProtectedRouteAdmin>
            }
          />

          <Route
            path="/performanceTable"
            element={
              <ProtectedRouteAdmin setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <PerformanceTable />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/training"
            element={
              <ProtectedRoute setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <TrainingTabPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/performance"
            element={
              <ProtectedRouteAdmin setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <TotalInternsReport />
              </ProtectedRouteAdmin>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRouteAdmin setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <DashboardPage />
              </ProtectedRouteAdmin>
            }
          />
          {/* Please Pass The Requested Url As Props To This Component.. */}
          <Route path="/401" element={<AccessDeniedPage setIsLoggedIn={setIsLoggedIn} />} />

          <Route path="/500" element={<InternalServerErrorPage />}>
            {" "}
          </Route>
          <Route
            path="/course-content"
            element={
             
                <CourseContentPage />
            
            }
          />
          <Route
            path="/training"
            element={
              <ProtectedRoute setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <TrainingTabPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses"
            element={
              <ProtectedRouteAdmin setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <AdminTable />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/create-course"
            element={
              <ProtectedRouteAdmin setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <CreateCourse />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/edit-course/:courseId"
            element={
              <ProtectedRouteAdmin setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <EditCourse />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/info-course/:courseId"
            element={
              <ProtectedRoute setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <InfoCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <Report />
              </ProtectedRoute>
            }
          />

          <Route
            path="/course-details/:courseId"
            element={
              <ProtectedRouteAdmin setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <InfoCourse />
              </ProtectedRouteAdmin>
            }
          />


          <Route path="/404" element={<PageNotFoundPage />} />
          <Route path="*" element={<PageNotFoundPage />} />

          <Route
            path="/users"
            element={
              <ProtectedRouteAdmin setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <Users />
              </ProtectedRouteAdmin>
            }
          />
          <Route path="edit/:id" element={<UserEditForm />} />
          <Route path="users/:id" element={<ViewUser />} />
          {/* <Route path="/add" element={<AddUser />} /> */}

          <Route
            path="/batch"
            element={
              <ProtectedRouteAdmin setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <BatchPage />
              </ProtectedRouteAdmin>
            }
          />

          <Route
            path="/batchDetails"
            element={
              <ProtectedRouteAdmin setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <BatchDetailsPage />
              </ProtectedRouteAdmin>
            }
          />

          <Route
            path="/editBatch"
            element={
              <ProtectedRouteAdmin setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                <EditBatchPage />
              </ProtectedRouteAdmin>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
