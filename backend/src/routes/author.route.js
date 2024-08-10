import { Router } from "express";
import {verifyJwt, verifyJwtAuthor} from '../middleware/auth.middleware.js'
import { changeAuthorPassword,updateAuthorProfileImage,updateAuthor, getCurrentAuthor, loginAuthor, logoutAuthor, refreshAccessToken, registerAuthor, getAuthorById } from "../controllers/author.controller.js";
import {upload} from "../middleware/multer.middleware.js"





const router = Router();

router.route("/register").post(upload.single("profileImg"),
registerAuthor);
router.route("/login").post(loginAuthor);

//secured routes
/* router.route("/current-user").get(verifyJwt,getCurrentAuthor) */
router.route("/logout").get(verifyJwtAuthor , logoutAuthor);
router.route("/change-password").post(verifyJwtAuthor , changeAuthorPassword);
router.route("/refresh-token").post(verifyJwtAuthor , refreshAccessToken)
router.route("/current-author").get(verifyJwtAuthor , getCurrentAuthor)
router.route("/update-profile-image/:authorId").put(verifyJwtAuthor,upload.single('profileImg'),updateAuthorProfileImage)
router.route("/update-author/:authorId").put(verifyJwtAuthor,updateAuthor);
router.route("/get-author-by-id/:authorId").get(verifyJwt,getAuthorById)

export default router;