import express from "express";

const router = express.Router();

router.post("/logout", (req, res, next) => {
	req.logout(function (err) {
		if (err) return next(err);

		res.status(200).json({ message: "Logout successful" });
	});
});

export default router;
