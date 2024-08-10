import mongoose , {Schema}  from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userSchema =  new Schema(
    {
        name : {
            type : String,
            required : true
        } , 
        email : {
            type : String, 
            required  : true , 
            unique : true
        },
        password : {
            type : String , 
            required : [true  , "Password is required"]
        },
        refreshToken : {
            type : String
            
        }
    },{timestamps :true}
)

userSchema.pre("save" , async function (next){
    if(!this.isModified("password"))return next();
 this.password = await bcrypt.hash(this.password , 10) ; 
 next();
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare( password,this.password );
}

userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
        _id : this._id,
        email : this.email,
        name  : this.name ,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User  = mongoose.model("User" , userSchema)