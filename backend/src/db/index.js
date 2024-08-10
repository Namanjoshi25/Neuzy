import mongoose from "mongoose";

export const connectDb = async()=>{
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`);
       console.log(`\n MongoDB connected || DB Host || ${ connectionInstance.connection.host}` )
    } catch (error) {
        console.log("Error while connecting mongoDB database" , error);
        process.exit(1);
    }
}