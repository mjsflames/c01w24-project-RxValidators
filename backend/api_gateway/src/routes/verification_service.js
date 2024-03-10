// "http://localhost:5000/api/upload"
// `http://localhost:5000/api/status/${id}
// `http://localhost:5000/api/download/${id}

import express from "express";
import proxy from "express-http-proxy";
import getService from "../middleware/service.js";
const router = express.Router();

// As of now, we will simply proxy the request to the verification service
router.use("*", getService("verification-service"), (req, res, next) => {
	console.log("Proxying request to verification service at", req.service);
	proxy(req.service, {
		limit: "1mb",
		proxyReqPathResolver: function (req) {
			const updatedPath = req.originalUrl.replace("/verification", "");
			console.log("Proxying request to:", req.service + updatedPath);
			return updatedPath;
		},
	})(req, res, next);
});
export default router;
