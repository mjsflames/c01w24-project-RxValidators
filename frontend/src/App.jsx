import { useState } from "react";
import "./App.css";

import Searchbar from "./components/Searchbar.jsx";
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

function App() {
	return (
		<div className="App">
			{/* <Searchbar/> */}
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="verify" element={<Verification />} />
						<Route path="*" element={<NoPage />} />
						<Route path="patient" element={<Patient />} />
						<Route path="prescriber" element={<Prescriber />} />
						<Route path="account" element={<Account />} />
						<Route path="log" element={<LogRX />} />
						<Route path="login" element={<LoginForm />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
