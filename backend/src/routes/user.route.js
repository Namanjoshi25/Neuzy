import { Router } from "express";
import {verifyJwt} from '../middleware/auth.middleware.js'
import { getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updatePassword } from "../controllers/user.controller.js";





const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//secured routes
router.route("/current-user").get(verifyJwt,getCurrentUser)
router.route("/logout").get(verifyJwt , logoutUser);
router.route("/update-password").post(verifyJwt , updatePassword);
router.route("/refresh-token").post(verifyJwt , refreshAccessToken)


export default router;