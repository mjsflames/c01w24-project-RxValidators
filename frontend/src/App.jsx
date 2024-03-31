import { createContext, useEffect, useState } from "react";
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage.jsx";
import Layout from "./pages/Layout.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import ServiceRegistryInfo from "./components/ServiceRegistryInfo.jsx";
import Login from "./pages/Login.jsx";
import LoginForm from "./pages/Login.jsx";
import UserType from "./pages/ChooseUser.jsx";
import PatientAccount from "./pages/PatSignUp.jsx";
import PrescriberAccount from "./pages/PresSignUp.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AdminPrescriberProfile from "./pages/AdminPrescriberProfile.jsx";
import AdminPatientProfile from "./pages/AdminPatientProfile.jsx";
import Verification from "./pages/Verification.jsx";
import AdminLogs from "./pages/AdminLogs.jsx";
import PrescriberHome from "./pages/PrescriberHome.jsx";
import PrescriberPrescriptions from "./pages/PresPrescription.jsx";
import PrescriberSettings from "./pages/PrescriberSettings.jsx";
import PrescriberLogRX from "./pages/PresLogRX.jsx";
import PatientHome from "./pages/PatientHome.jsx";
import PatientPrescriptions from "./pages/PatientPrescriptions.jsx";
import PatientLogRX from "./pages/PatLogRX.jsx";
import PatientSettings from "./pages/PatientSettings.jsx";
import GreenResources from "./pages/GreenResources.jsx";
import Landing from "./pages/Landing.jsx";
import Alert from "./components/Alert.jsx";
import TempLinks from "./pages/Placeholders/TempLinks.jsx";
import Home from "./pages/Home.jsx";
import Pdf from "./pages/PdfViewer.jsx";
import Logout from "./pages/Logout.jsx";
import api from "./axiosConfig.js";

const UserContext = createContext({
  user: null,
  handleLogin: (username, password) => { },
  handleLogout: () => { },
  getNotifications: async (includeRead=false) => { },
  updateUser: (user) => { },
});

function App() {
	// TODO: Separate to AuthHandler.jsx
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);

  const handleLogin = async (username, password) => {
    console.log("Logging in with", username, password);
    // !!! Top tier security
    // Administrator Access
    if (username === "admin" && password === "admin") {
      console.log("Logged in as admin");
      setUser({
        id: "1",
        name: "admin",
        role: "admin",
      });
      return true;
    }
    // Prescriber Access
    if (username === "prescriber" && password === "prescriber") {
      console.log("Logged in as prescriber");
      setUser({
        id: "2",
        name: "patient",
        role: "prescriber",
        address: "123 Main St",
        city: "Anytown",
        college: "University of Anywhere",
        email: "example@example.com",
        firstName: "John",
        lastName: "Doe",
        language: "English",
        license: "123456",
        profession: "Pat",
        prescriber_code: "ON-JD001",
        province: "Anyprovince",
        username: "johndoe123"
      });
      return true;
    }
    // Patient Access
    if (username === "patient" && password === "patient") {
      console.log("Logged in as patient");
      setUser({
        id: "3",
        name: "patient",
        role: "patient",
        address: "123 Main St",
        city: "Anytown",
        college: "University of Anywhere",
        email: "example@example.com",
        firstName: "John",
        lastName: "Doe",
        language: "English",
        license: "123456",
        profession: "Pat",
        prescriber_code: "ON-JD001",
        province: "Anyprovince",
        username: "johndoe123"
      });
      return true;
    }

    // Try actual login
    return await api.post("/auth/login", { username, password }).then((res) => {
      console.log("Login response", res.data);
      if (res.status !== 200) {
        console.log("Login failed");
        return false;
      }
      setUser(JSON.parse(res.data.data));
      return true;
    }).catch((err) => {
      console.error("Login failed", err);
      return false;
    });
  };

  const getNotifications = async (includeRead=false) => {
    if (!user) {
      console.error("No user to get notifications for");
      return [];
    }
    return await api.get(`/notifications/${user._id}${includeRead ? "?fetchAll=true" : ""}`).then((res) => {
      console.log("Notifications", res.data);
      return res.data;
    }).catch((err) => {
      console.error("Failed to get notifications", err);
      return [];
    });
  };

  const updateUser = async (updatedUser) => {
    if (!user) {
      console.error("No user to get notifications for");
      return [];
    }
    setUser(updatedUser);
    if (user !== null) {
			localStorage.setItem("user", JSON.stringify(user));
		}
  };

	useEffect(() => {
		console.log("User is", user);
		// Save to local storage
		if (user !== null) {
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			localStorage.removeItem("user");
		}
	}, [user]);

  const handleLogout = () => setUser(null);

  return (
    <div className="App">
      {/* <Alert /> */}

			<ServiceRegistryInfo />
			<UserContext.Provider value={{ user, handleLogin, handleLogout, getNotifications, updateUser }}>
				<BrowserRouter>
					<Routes>
						<Route path="logout" element={<Logout />} />
						<Route path="login" element={<Login />} />
						<Route path="choose-user" element={<UserType />} />
						<Route path="patient-sign-up" element={<PatientAccount />} />
						<Route path="prescriber-sign-up" element={<PrescriberAccount />} />
						<Route path="/" element={<Layout />}>
            <Route path="PDF" element={<Pdf />} />
							<Route
								index
								element={
									user && user.role === "admin" ? (
										<AdminHome />
									) : user && user.role === "prescriber" ? (
										<PrescriberHome />
									) : user && user.role === "patient" ? (
										<PatientHome />
									) : (
										<Home	 />
									)
								}
							/>
              {/* PRESCRIBER RESTRICTED */}
              <Route
                path="verify"
                element={
                  <ProtectedRoute redirectTo={"/login"} permitted={["admin"]}>
                    <Verification />
                  </ProtectedRoute>
                }
              />

              {/* PATIENT RESTRICTED */}
              <Route
                element={
                  <ProtectedRoute redirectTo={"/my-prescriptions"} permitted={["patient"]}>
                    <PatientPrescriptions />
                  </ProtectedRoute>
                }
              />
              {/* Admin Route*/}
              <Route path="patient-profiles" element={<AdminPatientProfile />} />
              <Route path="prescriber-profiles" element={<AdminPrescriberProfile />} />
              <Route path="prescription-logs" element={<AdminLogs />} />
              <Route path="green-resources" element={<GreenResources />} />

              {/* <Route path="prescriber-prescriptions" element={<PrescriberPrescriptions />} /> */}
              {/* <Route path="PrescriberLogRX" element={<PrescriberLogRX />} /> */}
              {/* <Route path="PatientLogRX" element={<PatientLogRX />} /> */}
              {/* <Route path="patientPrescriptions" element={<PatientPrescriptions />} /> */}
              <Route path="loginF" element={<LoginForm />} />
              <Route path="temp-links" element={<TempLinks />} />

              <Route
								path="my-account"
								element={
									user && user.role === "prescriber" ? (
										<PrescriberSettings />
									) : user && user.role === "patient" ? (
										<PatientSettings />
                  ) : null
								}
							/>
              <Route
								path="my-prescriptions"
								element={
									user && user.role === "prescriber" ? (
										<PrescriberPrescriptions />
									) : user && user.role === "patient" ? (
										<PatientPrescriptions />
                  ) : null
								}
							/>
              <Route
								path="log-prescriptions"
								element={
									user && user.role === "prescriber" ? (
										<PrescriberLogRX />
									) : user && user.role === "patient" ? (
										<PatientLogRX />
                  ) : null
								}
							/>
              {/* CATCH ALL */}
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export { UserContext };
export default App;