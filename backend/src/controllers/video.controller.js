import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../model/video.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { deleteFromCloudinary, uploadOnCloudinary, uploadVideoOnCloudinary } from "../utils/Cloudinary.js";
import mongoose from "mongoose";

const getAuthorVideos = asyncHandler( async (req,res)=>{
    const {authorId }=req.params;

    if(!req.user && !req.author) throw new ApiError(400 ,"Please login to see the news");
    if(!authorId) throw new ApiError(400, "Please provide author id");

    const videos = await Video.aggregate([
        {
            $match : {
                author : new  mongoose.Types.ObjectId(authorId)

            }
        },
        {
            $lookup: {
                from: 'authors', // The collection to join
                localField: 'author', // Field from the News collection
                foreignField: '_id', // Field from the Authors collection
                as: 'authorDetails'
              }
        },
        {
            $unwind: '$authorDetails'
          },
          { $sort: { createdAt: -1 } },
          {
            $project: {
              videoUrl : 1,
              title : 1,
              description: 1,
              thumbnail:1,
              author: {
                name: '$authorDetails.name',
                profileImg: '$authorDetails.profileImg',
                tagline: '$authorDetails.tagline'
              }
            }
          }
    ])

    if(!videos) throw new ApiError(500 ,"Error while finding the video")

        res.status(200).json(new ApiResponse(200,videos,"Videos fetched successfully"))
})

const createVideo = asyncHandler(async (req,res)=>{
    if(!req.author) throw new ApiError(400 ,"Please login to Add News");
    const author= req.author._id

    const {title,description , category} = req.body;

    if(!title || !description || !category) throw new ApiError(400, "All Details are required");

    const thumbnail = req.files.thumbnail[0]?.path;
 
    const videoFile =req.files.videoFile[0]?.path;
    if(!videoFile) throw new ApiError(400 ,"Video file is required")
      if(!thumbnail) throw new ApiError(400 ,"Thumbnail is required ")

        const uploadedThumbnail = await uploadOnCloudinary(thumbnail)
    
        const uploadedVideo = await uploadVideoOnCloudinary(videoFile);

        if(!uploadedVideo) throw new ApiError(500, "Failed to upload on cloudinary");
        if(!uploadedThumbnail) throw new ApiError(500,"Failed to upload on cloudinary")

     const videoNews = await Video.create({
      author,
        title,
        description,
        category,
        thumbnail : uploadedThumbnail?.url,
        videoUrl : uploadedVideo?.url
     })
     if(!videoNews) throw new ApiError(500 ,"Failed to create news");

     res.status(200).json(
        new ApiResponse(
            200 ,
            videoNews,
            "News created successfully"
        )
     )
})
const deleteVideo = asyncHandler(async (req,res)=>{
    const {videoId}=  req.params

    if(!videoId) throw new ApiError(400,"Please provide the video for deletion");

    const video = await Video.findById({_id : videoId})
    if(!video) throw new ApiError(400, "Video does not exits");
    
  await deleteFromCloudinary(video.videoUrl)
    const deleteVideo = await Video.findByIdAndDelete(videoId);
    if(!deleteVideo) throw new  ApiError(500 ,"Failed to delete the news");

    res.status(200).json(new ApiResponse(200, "Video News Deleted successfully"))
})

const getVideos = asyncHandler(async (req,res)=>{
    if(!req.user) throw new ApiError(400,"Please login to read the news");

    const {category="",limit=5,page=1} = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum-1) * limitNum;


    const videoNews = await Video.aggregate([
         {
            $match : {
               
                category : {
                    $regex : category?.trim(),
                    $options : "i"
                }
            }
        } 
        ,
        {
            $lookup: {
              from: "authors", 
              localField: "author", 
              foreignField: "_id",
              as: "author" 
            }
          },
          {
            $unwind: "$author" 
          },
          { $sort: { createdAt: -1 } },
           {
            $skip: skip
          }, 
           {
            $limit: limitNum
          }, 
          {
            $project: {
                news: {
                    title: '$title',
                    videoUrl : '$videoUrl',
                    category: '$category',
                    images: '$images',
                    createdAt : "$createdAt",
            
        
                  },
                  author: {
                    name: '$author.name',
                    profileImg: '$author.profileImg',
                    tagline : "$author.tagline",
                    _id : "$author._id"
                  }
            }
          }
    ])

    if(!videoNews) throw new ApiError(500 ,"Failed to fetch the news");
    res.status(200).json(new ApiResponse(200, videoNews,"News fetched successfully"))
})

const getVideoById = asyncHandler(async (req,res)=>{
  const videoId= req.params.videoId;
    
  if(!req.user && !req.author) throw new ApiError(400 ,"Please login to see the news");
  if(!videoId) throw new ApiError(400 ,"News id is required")

      const video  = await Video.aggregate([
          {
              $match: {
                _id: new  mongoose.Types.ObjectId(videoId)
              }
            },
            {
              $lookup: {
                from: 'authors', // The collection to join
                localField: 'author', // Field from the News collection
                foreignField: '_id', // Field from the Authors collection
                as: 'authorDetails'
              }
            },
            {
              $unwind: '$authorDetails'
            },
            {
              $project: {
                title: 1,
                description: 1,
                category: 1,
                videoUrl :1,
   
                createdAt: 1,
           

                author: {
                  name: '$authorDetails.name',
                  profileImg: '$authorDetails.profileImg',
                  tagline: '$authorDetails.tagline',
                  instagram :'$authorDetails.instagram',
                  facebook : '$authorDetails.facebook',
                  twitter : '$authorDetails.twitter',
                  _id : '$authorDetails._id'
                }
              }
            }
      ])

      if(!video) throw new ApiError(400 , "video does not exits")
          
  res.status(200).json(
      new ApiResponse(
          200,
         video[0],
         "News fetched successfully"
      )
  )

})

const updateVideoData = asyncHandler(async(req,res)=>{
  const updatedData = req.body;
  const  {videoId} = req.params;
      const authorId = req.author._id;
  
      const video =  await Video.findOne({
          _id :new mongoose.Types.ObjectId(videoId),
          author : authorId
      })
  
      if(!video) throw new ApiError(400 ,"News does not exists");
      console.log(updatedData);

       
      
        // Update the news document
        const updatedVideo= await Video.findByIdAndUpdate(
          videoId,
          { $set: updatedData },
          { new: true, runValidators: true }
        );
          if(!updateVideo) throw new ApiError(500 ,"Failed to update the news");
  
          res.status(200).json(
              new ApiResponse(
                  200,
                  updatedVideo,
                  "News updated successfully"
  
              )
          )
})

const updateVideo = asyncHandler(async(req,res)=>{
  const {videoId} = req.params;

  const authorId = req.author._id;
  
      const video =  await Video.findOne({
          _id :new mongoose.Types.ObjectId(videoId),
          author : authorId
      })
  
      if(!video) throw new ApiError(400 ,"News does not exists");
      const videoFile =req.file?.path ;

  
       const uploadedVideo = await uploadVideoOnCloudinary(videoFile);
        
        if(!uploadedVideo) throw new ApiError(500, "Failed to upload on cloudinary");

        const updatedVideo = await Video.findByIdAndUpdate(
          authorId,
          {videoUrl : uploadedVideo?.url},
          { new: true, runValidators: true}
  
        )

        res.status(200).json(
          new ApiResponse(
              200,
             updatedVideo?.url,
              "Video  updated successfully"

          )
      )
        
      
})

const updateThumbnail = asyncHandler( async (req,res)=>{

  const {videoId} = req.params;

  const authorId = req.author._id;
  
      const video =  await Video.findOne({
          _id :new mongoose.Types.ObjectId(videoId),
          author : authorId
      })

  if(!video) throw new ApiError(400, "The video news does not exits");

  const thumbnailPath  = req.file?.path

  const uploadedThumbnail = await uploadOnCloudinary(thumbnailPath);
  if(!uploadedThumbnail) throw new ApiError(500 ,"Failed to upload on cloudinary");

  const updatedVideo  = await Video.findByIdAndUpdate(
    videoId,
    {thumbnail : uploadedThumbnail?.url},
    { new: true, runValidators: true}
  )
  
  res.status(200).json(
    new ApiResponse(
        200,
       updatedVideo,
        "Video Thumbnail  updated successfully"

    )
)
})
export {
    getAuthorVideos,
    createVideo,
    deleteVideo,
    getVideos,
    getVideoById,
    updateVideoData,
    updateVideo,
    updateThumbnail

}