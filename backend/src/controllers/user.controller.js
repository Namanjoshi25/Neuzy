import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import{ ApiResponse} from "../utils/ApiResponse.js"
import {User  }from '../model/user.model.js'
import jwt from 'jsonwebtoken'

 const generateAccessAndRefreshToken = async(userId)=>{
   try {
    const user = await User.findById(userId);


    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken  = refreshToken ; 

    await user.save({validateBeforeSave:false})

   
    return {refreshToken ,accessToken};
    
   } catch (error) {
    console.log(error);
     throw new ApiError(500 , "Failed while creating access and refresh token")
   }


 }

 const registerUser = asyncHandler(async (req,res )=>{

 const {name , email , password} = req.body;


 if(
    [email,name,password].some((field)=>
        field?.trim()== ""
    )
   ){
    throw new ApiError(400,"All field are required")
   }

   const existedUser = await User.findOne({email});

   if(existedUser) throw new ApiError(400 , "User already exists");


   const user = await User.create({
    name,email,password
   })

   const createdUser = await User.findById(user._id).select("-password -refreshToken");

   if(!createdUser) throw new ApiError(500 ,"Error while creating the user");

   res.status(201).json(
    
        new ApiResponse(
            200,
            createdUser,
        "User created successfully"
      )
    
   )

})

const loginUser = asyncHandler(async (req,res)=>{
    const  { email , password} = req.body;
    if(!email || !password) throw new ApiError(400 , "Both email and password is required");

    const existedUser =  await User.findOne({email : email});


    if(!existedUser ) throw new ApiError(400 ,"User does not exists");

    const isPasswordCorrect = await existedUser.isPasswordCorrect(password);

    if(!isPasswordCorrect) throw new ApiError(400 , "Password does not match");

    const {refreshToken  , accessToken } = await generateAccessAndRefreshToken(existedUser._id);

    const options = {
        httpOnly:true,
        secure:true,
      } 

      const loggedInUser = await User.findById(existedUser._id).select("-password -refreshToken");

      

    

       res.status(200).cookie("refreshToken"  , refreshToken,options).cookie("accessToken" ,accessToken , options).json(
        new ApiResponse(
            201,
           
            {refreshToken ,accessToken , loggedInUser},
            "User Logged in successfull",
        )
      )
})

const logoutUser = asyncHandler(async(req,res) =>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset : {
                refreshToken: 1
            }
        },{new :true}
    )

    const options = {
        httpOnly : true ,
        secure : true
    }

    res.status(200).clearCookie("refreshToken",options).clearCookie("accessToken",options).json(new ApiResponse(200 ,{} ,"User logged out successfully"));
})

const getCurrentUser = asyncHandler(async(req,res)=>{  
   res.status(200).json(
    new ApiResponse(
        200,
        req.user ,
        "Current user fetched succesfully"
    )
   )
})

const updatePassword =  asyncHandler(async(req,res)=>{

    const {newPassword , oldPassword} = req.body;

    const user = await User.findById(req.user._id);

     const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

     if(!isPasswordCorrect) throw new ApiError(400 , "Password is not correct");

     user.password = newPassword;

     user.save({validateBeforeSave : true});

     res.status(200).json(
        new ApiResponse(
            200 ,
            {}
            ,
            "Password changed successfully"
        )
     )


})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingToken = req.cookies.refreshToken || req.body.refreshToken ; 

    if(!incomingToken) throw new ApiError(400 , "unauthorized request");

    try {
        const decodedToken = jwt.verify(incomingToken , process.env.REFRESH_TOKEN_SECRET);

        if(!decodedToken) throw new ApiError(400 ,"Invalid refresh token");

        const user = await User.findById(decodedToken._id);

        if(incomingToken != user.refreshToken) throw new ApiError(400 , "Refresh token expired");

        const {refreshToken , accessToken} = await generateAccessAndRefreshToken(user._id);
        const options = {
            httpOnly :true,
            secure : true
        }

        res.status(200)
        .cookie("refreshToken" , refreshToken,options)
        .cookie("accessToken" , accessToken,options)
        .json(new ApiResponse(200 ,{accesToken :accessToken,refreshToken : refreshToken} ,"Access token refreshed successfully"))
        

        
    } catch (error) {
        throw new ApiError(500 , error?.message || "Error while refreshing the access token")
    }

})
export {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    updatePassword,
    refreshAccessToken
}