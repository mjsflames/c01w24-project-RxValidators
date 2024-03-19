import { createContext, useEffect, useState } from "react";
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage.jsx";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Verification from "./pages/Verification.jsx";
import GreenResources from "./pages/GreenResources.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import ServiceRegistryInfo from "./components/ServiceRegistryInfo.jsx";
import Login from "./pages/Placeholders/Login.jsx";
import Landing from "./pages/Landing.jsx";

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

	const handleLogout = () => setUser(null);

	return (
		<div className="App">
			<ServiceRegistryInfo />
			<UserContext.Provider value={{ user, handleLogin, handleLogout }}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="login" element={<Login />} />

							{/* PRESCRIBER RESTRICTED */}
							<Route
								path="verify"
								element={
									<ProtectedRoute redirectTo={"/login"} permitted={["admin"]}>
										<Verification />
									</ProtectedRoute>
								}
							/>
							<Route path="green-resources" element={<GreenResources />} />

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
