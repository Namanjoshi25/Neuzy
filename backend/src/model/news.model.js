import mongoose ,{Schema} from "mongoose";

export const newsSchema = new Schema(
    {
        title : {
            type : String, 
            required : true
        },
        images : [
            {
                type : String,
                max : 3,
                required : true
            }
        ],
        content : {
            type : String ,
            required : true ,
            
        }
        ,
        author : {
            type  : Schema.Types.ObjectId,
            ref :"Author"
        },
        category : {
            type : String ,
            required :true
        }
        ,
        location : {
            type : String ,
            required : true
        },
        summary : {
            type : String,
            required : true
        }

    },
    {timestamps : true}
)

 export const News = mongoose.model("News" , newsSchema)