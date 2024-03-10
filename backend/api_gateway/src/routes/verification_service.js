// "http://localhost:5000/api/upload"
// `http://localhost:5000/api/status/${id}
// `http://localhost:5000/api/download/${id}

import express from "express";
import proxy from "express-http-proxy";
const router = express.Router();
// Define a middleware function to log requests
function logRequest(req, res, next) {
	console.log("Request to:", req.url);
	console.log("Request headers:", req.headers);
	console.log("Request body:", req.body); // if you want to log request body
	console.log("Request params:", req.params);

	next(); // call next middleware in chain
}

// As of now, we will simply proxy the request to the verification service
router.use(
	"*",
	logRequest,

	proxy("http://127.0.0.1:3131", {
		limit: "1mb",
		proxyReqPathResolver: function (req) {
			return req.originalUrl;
		},
		proxyErrorHandler: function (err, res, next) {
			console.error(err);
			next(err);
		},
		https: false,
		proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
			console.log(srcReq.params);

			// Keep only the Content-Type header
			proxyReqOpts.headers = {
				// "content-type": srcReq.headers["content-type"],
				accept: srcReq.headers["accept"],
				"content-length": srcReq.headers["content-length"],
				connection: "keep-alive",
				"accept-encoding": "gzip, deflate, br",
			};

			console.log(proxyReqOpts);
			return proxyReqOpts;
		},
	})
);
export default router;
