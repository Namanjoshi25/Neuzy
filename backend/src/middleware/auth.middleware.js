import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import { User } from "../model/user.model.js";
import { Author } from "../model/author.model.js";
export const verifyJwt =  asyncHandler( async(req, res, next)=>{
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization").replace("Bearer " , "");
       

    if(!accessToken) throw new ApiError(400 ,"Unauthorized request")
   

   const decodedToken =await jwt.verify(accessToken , process.env.ACCESS_TOKEN_SECRET);
  

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

    
    if(!user) throw new ApiError(400 ,"invalid access token");


    req.user = user;
    next();
        
    } catch (error) {
        console.log(error);
        throw new ApiError(401,error?.messege || "Please login to read the news")
    }
    
})

export const verifyJwtAuthor = asyncHandler(async (req,res,next)=>{
 try {
    const incomingToken = req.cookies?.accessToken || req.header("Authorization").replace("Bearer " , "");
   
    if(!incomingToken) throw new ApiError(400 , "Unauthorized request");
    const decodedToken = await jwt.verify(incomingToken , process.env.ACCESS_TOKEN_SECRET);
     if(!decodedToken) throw new ApiError(400 , "Invalid access token");
    
     const author = await Author.findById(decodedToken._id).select("-password -refreshToken");

     if(!author ) throw new ApiError(400 ,"Author not found");

     req.author = author ;
      next();
    
 } catch (error) {
    throw new ApiError(500 ,error?.messege || "Please login as a author to upload news");
 }
})

export const determineUserTypeAndVerify = async (req, res, next) => {
    try {
      const incomingToken = req.cookies?.accessToken || req.header('Authorization').replace('Bearer ', '');
      const decodedToken = await jwt.verify(incomingToken,process.env.ACCESS_TOKEN_SECRET);
      
      const userId = decodedToken._id;
  
      const author = await Author.findById(userId);
      
  
      if (author) {
        return verifyJwtAuthor(req, res, next);
      } else {
        return verifyJwt(req, res, next);
      }
    } catch (error) {
      res.status(401).send({ error: 'Please authenticate.' });
    }
  };