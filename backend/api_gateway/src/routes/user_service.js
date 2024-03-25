import express from "express";
import proxy from "express-http-proxy";
import getService from "../middleware/service.js";

const router = express.Router();

router.use("*", getService("user-service"), async (req, res, next) => {
	console.log("Proxying request to user service at", req.service);

	proxy(req.service, {
		limit: "5mb",
		proxyReqPathResolver: function (req) {
			const updatedPath = req.originalUrl.replace("/user", "");
			console.log("Proxying request to:", req.service + updatedPath);
			return updatedPath;
		},
		// View request file data
		proxyReqBodyDecorator: function (bodyContent, srcReq) {
			console.log("Request body:", bodyContent);
			return bodyContent;
		},
	})(req, res, next);
});

export default router;
