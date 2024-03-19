function authorize(role) {
	return function (req, res, next) {
		// Check if user is authenticated
		if (!req.isAuthenticated()) {
			return res.status(401).json({ error: "Unauthorized" });
		}

		// Check if user has required role
		if (req.user.role !== role) {
			return res.status(403).json({ error: "Forbidden" });
		}

		// User is authorized
		next();
	};
}

export default authorize;
