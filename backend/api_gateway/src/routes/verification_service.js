// "http://localhost:5000/api/upload"
// `http://localhost:5000/api/status/${id}
// `http://localhost:5000/api/download/${id}

import express from "express";
import proxy from "express-http-proxy";
import getService from "../middleware/service.js";
import multer from "multer";
import axios from "axios";
import { Blob } from "buffer";

const router = express.Router();
const upload = multer();

// As of now, we will simply proxy the request to the verification service
router.use(
  "*",
  getService("verification-service"),
  upload.single("file"),
  async (req, res, next) => {
    console.log("Proxying request to verification service at", req.service);

    // Determine if the request is a file upload
    if (req.file) {
      req.originalUrl = req.originalUrl.replace("/verification", "");

      const formContent = new FormData();
      console.log("Request file:", req.file.buffer, req.file.originalname);
      formContent.append(
        "file",
        new Blob([Buffer.from(req.file.buffer)]),
        req.file.originalname
      );
      const response = await axios.post(
        req.service + req.originalUrl,
        formContent,
        {
          headers: req.headers,
        }
      );

      return res.status(response.status).send(response.data);
    } else {
      proxy(req.service, {
        limit: "5mb",
        proxyReqPathResolver: function (req) {
          const updatedPath = req.originalUrl.replace("/verification", "");
          console.log("Proxying request to:", req.service + updatedPath);
          return updatedPath;
        },
        // View request file data
        proxyReqBodyDecorator: function (bodyContent, srcReq) {
          console.log("Request body:", bodyContent);
          return bodyContent;
        },
      })(req, res, next);
    }
  }
);
export default router;
