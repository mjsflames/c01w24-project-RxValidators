// "http://localhost:5000/api/upload"
// `http://localhost:5000/api/status/${id}
// `http://localhost:5000/api/download/${id}

import express from "express";
import proxy from "express-http-proxy";
import getService from "../middleware/service.js";

const router = express.Router();

// As of now, we will simply proxy the request to the verification service
router.use(
  "*",
  getService("authentication-service"),
  async (req, res, next) => {
    console.log("Proxying request to verification service at", req.service);

    proxy(req.service, {
      limit: "5mb",      
      proxyReqPathResolver: function (req) {
        const updatedPath = req.originalUrl.replace("/api/auth", "");
        console.log("Proxying request to:", req.service + updatedPath);
        return updatedPath;
      },
      // View request file data
      proxyReqBodyDecorator: function (bodyContent, srcReq) {
        console.log("Request body:", bodyContent);
        if (bodyContent.role === "prescriber") {
          bodyContent.username = bodyContent.prescriber_code;
        }
        if (bodyContent.role === "patient") {
          bodyContent.username = bodyContent.email;
        }
        console.log("Request body (modded):", bodyContent);

        return bodyContent;
      },
    })(req, res, next);
  }
);
export default router;
