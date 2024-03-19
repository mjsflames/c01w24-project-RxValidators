import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// Get user from context
	const { handleLogin } = useContext(UserContext);

	const inputCSS = "border-2 border-gray-300 rounded-md p-2 bg-gray-100";
	if (loading) {
		return <Spinner />;
	}
	const navigate = useNavigate();
	return (
		<div>
			<h1>Login</h1>
			{error && <p className="text-red-500">{error}</p>}
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					setError("");
					setLoading(true);
					if (!handleLogin(username, password)) {
						setError("Invalid username or password");
						setLoading(false);
						return;
					}

					navigate("/");
					setLoading(false);
				}}
				className="flex flex-col gap-4 w-1/4 mx-auto"
			>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					className={inputCSS}
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className={inputCSS}
				/>
				<button disabled={loading} type="submit">
					Log in
				</button>
			</form>
		</div>
	);
};

export default Login;
