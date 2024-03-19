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
		if (username !== "oogla" || password !== "boogla") {
			return false;
		}

		console.log("Logged in");
		setUser({
			id: "1",
			name: "oogly boogly mans",
			role: "admin",
		});
		return true;
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
