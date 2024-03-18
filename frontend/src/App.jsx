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

const UserContext = createContext({
	user: null,
	handleLogin: (user) => {},
	handleLogout: () => {},
});

function App() {
	// TODO: Separate to AuthHandler.jsx
	const [user, setUser] = useState(null);

	const handleLogin = (user) => {
		setUser({
			id: "1",
			name: "oogly boogly man",
			role: "admin",
		});
	};

	const handleLogout = () => setUser(null);

	useEffect(() => {
		handleLogin();
	}, []);

	return (
		<div className="App">
			<ServiceRegistryInfo />
			<UserContext.Provider value={{ user, handleLogin, handleLogout }}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route
								path="verify"
								element={
									<ProtectedRoute redirectTo={"/"} permitted={["admin"]}>
										<Verification />
									</ProtectedRoute>
								}
							/>
							<Route path="green-resources" element={<GreenResources />} />
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
