import { Router } from "express";
import {determineUserTypeAndVerify, verifyJwt, verifyJwtAuthor} from '../middleware/auth.middleware.js'
import {upload} from '../middleware/multer.middleware.js'
import { createVideo, deleteVideo, getAuthorVideos, getVideoById, getVideos, updateThumbnail, updateVideo, updateVideoData } from "../controllers/video.controller.js";


const router = Router();


router.route('/add-video').post(verifyJwtAuthor,upload.fields([{ name: 'thumbnail' }, { name: 'videoFile' }]),createVideo)
router.route('/get-videos').get(verifyJwt,getVideos)
router.route('/get-video-by-id/:videoId').get(determineUserTypeAndVerify,getVideoById)
router.route('/delete-video/:videoId').delete(verifyJwtAuthor,deleteVideo)
router.route('/get-videos-by-author/:authorId').get(determineUserTypeAndVerify,getAuthorVideos)
router.route("/update-video/:videoId").put(verifyJwtAuthor,updateVideoData)
router.route("/update-videoFile/:videoId").put(verifyJwtAuthor, upload.single("videoFile"),updateVideo)
router.route("/update-thumbnail/:videoId").put(verifyJwtAuthor, upload.single("thumbnail"), updateThumbnail)

export default router