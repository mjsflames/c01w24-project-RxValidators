import React, { useContext, useState } from "react";
import image from "../assets/background-image-1.jpeg";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const UserLogin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// Get user from context
	const { handleLogin } = useContext(UserContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		// Wait like 5 seconds or sum
		setTimeout(() => {
			if (!handleLogin(username, password)) {
				setError("Invalid username or password");
				setLoading(false);
				return;
			}
			navigate("/");
			setLoading(false);
		}, 1000);
	};

	return (
		<div className="flex h-screen w-full items-center justify-between bg-white">
			<Link to="/login" className="absolute z-50 bg-white px-4 top-8 left-8 unselectable">
				<img src={logo} className="h-32 w-32 unselectable" />
			</Link>
			<img
				src={image}
				alt="logo"
				className="blur-[2px] opacity-70 z-10 h-screen object-cover  md:w-1/2 pointer-events-none"
			/>
			<div className="w-screen lg:w-1/2 h-screen bg-white z-20 flex items-center absolute lg:relative justify-center">
				<form className=":w-1/2 mx-auto z-50 " onSubmit={handleSubmit}>
					<div className="flex flex-col items-center [&>*]:text-gray-500 mb-12">
						<h1 className="text-3xl font-bold !text-gray-900  mb-5">Login</h1>
						<p>Access your prescriptions.</p>
						<p className="text-center">
							If you are a prescriber, please enter your <br />
							Provider ID
						</p>
					</div>

					<div className="mb-5">
						<label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-600 ">
							Email/Prescriber ID
						</label>
						<input
							type="username"
							id="username"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
							placeholder="Email"
							onChange={(e) => setUsername(e.target.value)}
							value={username}
							required
						/>
					</div>
					<div className="mb-5">
						<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600 ">
							Password
						</label>
						<input
							type="password"
							id="password"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
						/>
					</div>
					{error && <p className="text-red-500">{error}</p>}
					<div className="flex flex-row justify-between gap-8 mt-16">
						<Link className="text-black underline" to="/chooseuser">
							New User? Sign up here.
						</Link>
						{loading ? (
							<Spinner />
						) : (
							<button
								type="submit"
								className="text-white bg-[#5C6528] hover:bg-[#5C6528]/40 font-medium rounded-lg text-sm w-full sm:w-auto px-12 py-2.5 text-center"
							>
								Submit
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default UserLogin;