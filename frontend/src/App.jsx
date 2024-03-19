import { createContext, useEffect, useState } from "react";
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage.jsx";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Verification from "./pages/Verification.jsx";
import Prescriber from "./pages/PresPrescription.jsx";
import Account from "./pages/AccountDetails.jsx";
import LogRX from "./pages/LogRx.jsx";
import LoginForm from "./pages/Login.jsx";
import Patient from "./pages/PatPrescription.jsx";
import PatientPrescriptions from "./pages/PatientPrescriptions.jsx";
import GreenResources from "./pages/GreenResources.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import ServiceRegistryInfo from "./components/ServiceRegistryInfo.jsx";
import Login from "./pages/Login.jsx";
import Landing from "./pages/Landing.jsx";
import Alert from "./components/Alert.jsx";
import TempLinks from "./pages/Placeholders/TempLinks.jsx";
import PrescriberHome from "./pages/PrescriberHome.jsx";

const UserContext = createContext({
	user: null,
	handleLogin: (username, password) => {},
	handleLogout: () => {},
});

function App() {
	// TODO: Separate to AuthHandler.jsx
	const [user, setUser] = useState(null);

	const handleLogin = (username, password) => {
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
				name: "prescriber",
				role: "prescriber",
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
			});
			return true;
		}
		return false;
	};

	useEffect(() => {
		console.log("User is", user);
	}, [user]);

	const handleLogout = () => setUser(null);

	return (
		<div className="App">
			{/* <Alert /> */}

			<ServiceRegistryInfo />
			<UserContext.Provider value={{ user, handleLogin, handleLogout }}>
				<BrowserRouter>
					<Routes>
						<Route path="login" element={<Login />} />
						<Route path="/" element={<Layout />}>
							<Route
								index
								element={
									user && user.role === "admin" ? (
										<TempLinks />
									) : user && user.role === "prescriber" ? (
										<PrescriberHome />
									) : user && user.role === "patient" ? (
										<PatientPrescriptions />
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
								path="patientPrescriptions"
								element={
									<ProtectedRoute redirectTo={"/login"} permitted={["patient"]}>
										<PatientPrescriptions />
									</ProtectedRoute>
								}
							/>
							<Route path="green-resources" element={<GreenResources />} />

							<Route path="patientPrescriptions" element={<PatientPrescriptions />} />
							<Route path="patient" element={<Patient />} />
							<Route path="prescriber" element={<Prescriber />} />
							<Route path="account" element={<Account />} />
							<Route path="log" element={<LogRX />} />
							<Route path="loginF" element={<LoginForm />} />
							<Route path="temp-links" element={<TempLinks />} />
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
