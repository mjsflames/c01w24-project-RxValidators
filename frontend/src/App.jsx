import { useState } from "react";
import "./App.css";

import Searchbar from "./components/Searchbar.jsx";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage.jsx";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Verification from "./pages/Verification.jsx";
import PatientPrescriptions from "./pages/PatientPrescriptions.jsx";
function App() {
	return (
		<div className="App">
			{/* <Searchbar/> */}
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="verify" element={<Verification />} />
            <Route path="patientPrescriptions" element={<PatientPrescriptions />} />
						<Route path="*" element={<NoPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
