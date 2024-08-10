import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Author} from  '../model/author.model.js'
import jwt from 'jsonwebtoken'
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";


const generateAccessAndRefreshToken = async(authorId)=>{
    try {
      const author = await Author.findById(authorId)
     const accessToken = await author.generateAccessToken()
     const refreshToken= await author.generateRefreshToken()
     
  
     author.refreshToken = refreshToken
      await author.save({validateBeforeSave:false})
      return {accessToken,refreshToken}
      
    } catch (error) {
      throw new ApiError(500,"Something went wrong while generating token")
    }
  
  }
  const getCurrentAuthor = asyncHandler(async(req,res)=>{  
    res.status(200).json(
     new ApiResponse(
         200,
         req.author ,
         "Current user fetched succesfully"
     )
    )
 })

const registerAuthor = asyncHandler(async (req,res)=>{

    const {name, email , password,  facebook , twitter, instagram , tagline }  = req.body;

    if([name , email , password , tagline].some((field)=> field?.trim() == "")) throw new ApiError(400 ,"All fields are required");

    const existedAuthor = await Author.findOne({email})

    if(existedAuthor)throw new ApiError(400 , "Author already exits")

        const profileImgLocalPath = req.file?.path;
        

        if(!profileImgLocalPath) throw new ApiError(400 , "Profile image not uploaded");

        const profileImgUrl = await uploadOnCloudinary(profileImgLocalPath);

        if(!profileImgUrl) throw new ApiError(500 , "Failed to upload on cloudinary");

        const author = await Author.create(
            {
                name,
                 email ,
                  password ,
                  facebook ,
                  twitter, 
                  instagram , 
                  tagline,
                  profileImg :  profileImgUrl?.url
            }
        )

        const createdAuthor = await Author.findById(author._id).select("-password -refreshToken");
        if(!createdAuthor) throw new ApiError(500 ,'Failed to create the author');

        res.status(200).json(
            new ApiResponse(
                201, 
                createdAuthor,
                "Author created successfully"
            )
        )
})

const loginAuthor = asyncHandler(async (req,res)=>{
    const {email , password} = req.body;

    if(!email || !password) throw new ApiError(400 ,"Both username and password is required");

    const author = await Author.findOne({email});

    if(!author) throw new ApiError(400 ,"Author does not exists");

    const isPasswordCorrect  =await author.isPasswordCorrect(password);

    if(!isPasswordCorrect) throw new ApiError(400 ,"Password is not correct");

    const{ refreshToken , accessToken } = await generateAccessAndRefreshToken(author._id) ;
 

    const createdAuthor = await Author.findById(author._id).select("-password -refreshToken");

    const options = {
        httpOnly:true,
        secure:true,
      
        Path : "/",
    
      }

    res.status(200)
    .cookie("refreshToken" ,refreshToken,options)
    .cookie("accessToken" ,accessToken,options)
    .json(
        new ApiResponse(
            200 ,
            {refreshToken ,accessToken,createdAuthor},
            "Author logged in successfully"
        )
    )
})


const refreshAccessToken = asyncHandler(async (req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    
    if(!incomingRefreshToken)throw new ApiError(401,"Unauthorized Request");
  
    try {
      const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    
      const author = await Author.findById(decodedToken?._id);
    
      if(!author)throw new ApiError(401,"Invlid Refresh Token");
    
      if(incomingRefreshToken!== author?.refreshToken) throw new ApiError(401,"Refresh token expired or used");
    
      const options = {
        httpOnly:true,
        secure:true
    
      }
     const {accessToken,newRefreshToken} = await generateAccessAndRefreshToken(author._id)
    
      res.status(200)
      .cookie("accessToken" , accessToken, options)
      .cookie("refreshToken", newRefreshToken,options)
      .json(
        new ApiResponse(
          200,
          {accessToken,refreshToken : newRefreshToken},
          "Access Token refreshed successfully"
    
        )
      )
    } catch (error) {
       throw new ApiError(401,error?.messege || "Access Token not refreshed")
    }
})

const logoutAuthor = asyncHandler(async (req,res)=>{
    await Author.findByIdAndUpdate(
       req.author._id,
       {
         $unset:{
           refreshToken: 1
         }
       },{
         new : true
       }
 
     )
     
     const options = {
       httpOnly:true,
       secure:true
     }  
     return res.status(200)
     .clearCookie("accessToken" , options)
     .clearCookie("refreshToken" , options)
     .json(new ApiResponse(200,{},"User logged out successfully "))
   }) 
   const changeAuthorPassword = asyncHandler(async (req,res)=>{
    const {oldPassword , newPassword} =req.body;

    const author =await Author.findById(req.author._id);

    const isPasswordCorrect =   await author.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect) throw new ApiError(400,"oldPassword not correct")


     author.password= newPassword
     await author.save({validateBeforeSave:false})

     return res
     .status(200)
     .json(new ApiResponse(200,{},"Password Changed "))
  })

  const updateAuthor = asyncHandler(async(req,res)=>{
    const loggedInAuthor = req.author;
    if(!loggedInAuthor)throw new ApiError(400,"Please Login to update the author")
    const {authorId} = req.params;
    const updatedData = req.body
    const author = await Author.findById({_id : authorId})

    if(!author) throw new ApiError(404 ,"Author does not exists")

      const updatedAuthor = await Author.findByIdAndUpdate(
        authorId,
        { $set: updatedData },
        { new: true, runValidators: true }
      ).select("-refreshToken -password");

      if(!updateAuthor) throw new ApiError(500,"Failed to update the author")
      res.status(200).json( new ApiResponse(200 ,updatedAuthor,"Author updated sucessfully"))
  })

  const updateAuthorProfileImage = asyncHandler(async (req,res)=>{
    const loggedInAuthor = req.author;
    if(!loggedInAuthor) throw new ApiError(400 ,"Login to update the author");

    const {authorId} = req.params;
    
    const author = await Author.findById({_id : authorId} )

    if(!author) throw new ApiError(404, "Author does not exits")
   

      const localProfileImagePath = req.file?.path;

      if(!localProfileImagePath) throw new ApiError(400 ,"No profile image recieved");

      const uploadedProfileImage = await uploadOnCloudinary(localProfileImagePath)

      if(!uploadedProfileImage) throw new ApiError(500 ,"Failed to upload on cloudinary");


      const updatedAuthor = await Author.findByIdAndUpdate(
        authorId,
        {profileImg : uploadedProfileImage.url},
        { new: true, runValidators: true}

      ).select("-refreshTokem -password")

      
  


      res.status(200).json(new ApiResponse(200 , updatedAuthor,"Profile Image uploaded succesfully"))
      

  })

  const getAuthorById = asyncHandler(async (req,res)=>{
    if(!req.user) throw new ApiError(400,"Please login to read the news") 
    const{ authorId }= req.params;

    if(!authorId) throw new ApiError(400 ,"Author does not exists")

      const author = await Author.findById({_id : authorId}).select(" -password -refreshToken");
      if(!author) throw new ApiError(404 , "Author does not exits")

        res.status(200).json(new ApiResponse(200 , author, "Author fetched successfully"))
  })
  export {
    loginAuthor,
    registerAuthor,
    logoutAuthor,
    refreshAccessToken,
    changeAuthorPassword,
    getCurrentAuthor,
    updateAuthor,
    updateAuthorProfileImage,
    getAuthorById
  }