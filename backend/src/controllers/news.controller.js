import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js  "
import {News} from "../model/news.model.js"
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/Cloudinary.js"
import {Author} from "../model/author.model.js";
import mongoose from "mongoose"


const getAllNews  = asyncHandler(async (req,res)=>{
    if(!req.user) throw new ApiError(400 ,"Please login to see the news");

  
    const {category="" , query ="",page=1, limit} = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;
    
 
 
    const news = await News.aggregate([
        {
            $match : {
                title : {
                    $regex : query?.trim(),
                    $options : "i"
                },
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
          /* {
            $skip: skip
          }, */
         /*  {
            $limit: limitNum
          }, */
          {
            $project: {
                news: {
                    title: '$title',
                    content: '$content',
                    category: '$category',
                    images: '$images',
                    createdAt : "$createdAt",
                    summary :"$summary",
                    location : "$location"
                  },
                  author: {
                    name: '$author.name',
                    profileImg: '$author.profileImg',
                    tagline : "$author.tagline"
                  }
            }
          }
    ])

   if(!news) throw new ApiError(500 ,"Cannot get all news ")

    res.status(200).json(
        new ApiResponse(
            200 ,
            news,
            "News fetched successfully"
        )
    )



})

const addNews = asyncHandler( async (req,res)=>{
    const author = req.author._id;
    /* console.log(req.body.images[0]); */
    if(!author) throw new ApiError(400 ,"please login as author to create news")

    const {title, content,category , summary , location} = req.body;
    
    if(!title || !content || !category || !summary || !location) throw new ApiError(400 ,"All field are required to fill");


    const images  = await req.files && 
    req.files?.length > 0 ?
    await Promise.all(req.files.map(async (file)=>{
        const localImagePath = file.path;
        const cloudinaryUrl = await uploadOnCloudinary(localImagePath);
        if(!cloudinaryUrl) throw new ApiError(500 ,"Failed to upload on cloudinary");
      

        return  cloudinaryUrl.url
    }))
     : [];
     
  

     const news =  await News.create({
        author,
        title,
        content, 
        category,
        images,
        summary,
        location
     })

     if(!news) throw new ApiError(500 ,"Failed to create news");

     res.status(200).json(
        new ApiResponse(
            200 ,
            news,
            "News created successfully"
        )
     )

   
})

const updateNews=  asyncHandler(async(req,res)=>{
    const {title, content,summary ,location,category} = req.body;
const  {newsId} = req.params;
    const authorId = req.author._id;

    const news =  await News.findOne({
        _id :new mongoose.Types.ObjectId(newsId),
        author : authorId
    })

    if(!news) throw new ApiError(400 ,"News does not exists");
  

    const images  = req.files && req.files?.length
     ?
    await Promise.all(req.files.map(async(file)=>{
        const localFilePath = file.path ;
         const cloudinaryUrl = await uploadOnCloudinary(localFilePath);
         if(!cloudinaryUrl) throw new ApiError(500 ,"Failed to upload on cloudinary")

            return cloudinaryUrl.url

     }))
     : [];

  
     const newLength = images.length  ;

     if( newLength > 4) throw new ApiError(400 ,"Max length of images exceeded (only 3 allowed)")

      const updatedData = {
        title: title || news.title,
        content: content || news.content,
        summary: summary || news.summary,
        location: location || news.location,
        category: category || news.category,
        images: images || news.images
      };
    
      // Update the news document
      const updatedNews = await News.findByIdAndUpdate(
        newsId,
        { $set: updatedData },
        { new: true }
      );
        if(!updateNews) throw new ApiError(500 ,"Failed to update the news");

        res.status(200).json(
            new ApiResponse(
                200,
                updatedNews,
                "News updated successfully"

            )
        )

})
const 
deleteNews = asyncHandler(async (req,res)=>{
    const {newsId}= req.params;
    if(!newsId) throw new ApiError(400 ,"News not found");

    const authorId = req.author._id ;

    const author = await Author.findById(authorId);
    const news  = await News.findById({_id : newsId})

    if(!news) throw new ApiError(400 , "news does not exits")

    if(!author) throw new ApiError(400 ,"You are not allowed to do that");
    
   await Promise.all(news.images.map((async (image)=>{
     
        await deleteFromCloudinary(image)
    })))

    const result  = await News.deleteOne({_id : newsId});

    res.status(200).json(
        new ApiResponse(
            200,
            "News deleted successfully"
        )
    )

})

const getNewsById = asyncHandler(async( req,res)=>{
     const newsId= req.params.newsId;
    
    if(!req.user && !req.author) throw new ApiError(400 ,"Please login to see the news");
    if(!newsId) throw new ApiError(400 ,"News id is required")

        const news  = await News.aggregate([
            {
                $match: {
                  _id: new  mongoose.Types.ObjectId(newsId)
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
                  content: 1,
                  category: 1,
                  images: 1,
                  createdAt: 1,
                  summary : 1,
                  location : 1,
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

        if(!news) throw new ApiError(400 , "news does not exits")
            
    res.status(200).json(
        new ApiResponse(
            200,
           news[0],
           "News fetched successfully"
        )
    )

})

const getNewsByAuthorId = asyncHandler(async(req,res)=>{
    const authorId = req.params.authorId;

    if(!req.user && !req.author) throw new ApiError(400 ,"Please login to see the news");
    if(!authorId) throw new ApiError(400 ,"News id is required")

        const news  = await News.aggregate([
            {
                $match: {
                  author: new  mongoose.Types.ObjectId(authorId)
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
                  title: 1,
                  content: 1,
                  category: 1,
                  images: 1,
                  createdAt: 1,
                  summary: 1,
                  author: {
                    name: '$authorDetails.name',
                    profileImg: '$authorDetails.profileImg',
                    tagline: '$authorDetails.tagline'
                  }
                }
              }
        ])

        if(!news) throw new ApiError(400 , "news does not exits")
            
    res.status(200).json(
        new ApiResponse(
            200,
           news,
           "News fetched successfully"
        )
    )
})

export {
    getAllNews,
    addNews,
    updateNews,
    deleteNews,
    getNewsById,
    getNewsByAuthorId
}