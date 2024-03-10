import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/user.js";

console.log("passport.js loaded");

passport.use(
	new LocalStrategy(async (username, password, callback) => {
		try {
			const user = await User.findOne({ username });

			if (!user) {
				return callback(null, false, { message: "Incorrect username" });
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				return callback(null, false, { message: "Incorrect password" });
			}

			return callback(null, user);
		} catch (error) {
			return callback(error);
		}
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

// passport.serializeUser(function (user, cb) {
// 	process.nextTick(function () {
// 		cb(null, { id: user.id, username: user.username });
// 	});
// });

// passport.deserializeUser(function (user, cb) {
// 	process.nextTick(function () {
// 		return cb(null, user);
// 	});
// });

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (error) {
		done(error);
	}
});
