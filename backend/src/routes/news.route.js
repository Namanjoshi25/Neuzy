import { Router } from "express";
import {determineUserTypeAndVerify, verifyJwt, verifyJwtAuthor} from '../middleware/auth.middleware.js'
import {getAllNews , deleteNews , addNews ,updateNews, getNewsById, getNewsByAuthorId} from '../controllers/news.controller.js'
import {upload} from '../middleware/multer.middleware.js'
import { updateAuthor, updateAuthorProfileImage } from "../controllers/author.controller.js";





const router = Router();



//secured routes
/* router.route("/current-user").get(verifyJwt,getCurrentAuthor) */
router.route("/delete-news/:newsId").delete(verifyJwtAuthor , deleteNews);
router.route("/update-news/:newsId").patch(verifyJwtAuthor, upload.array("images", 3) , updateNews);
router.route("/add-news").post(verifyJwtAuthor,upload.array("images", 3), addNews)
router.route("/get-news-by-id/:newsId").get(determineUserTypeAndVerify, getNewsById)


router.route("/all-news").get(verifyJwt,getAllNews);
router.route("/:authorId").get(determineUserTypeAndVerify,getNewsByAuthorId);


export default router;