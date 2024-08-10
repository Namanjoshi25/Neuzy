import mongoose,{Schema} from 'mongoose'

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String, required: true }, // URL of the video
    category : {type : String ,required :true},
    thumbnail : {type : String, required: true},
    author : {
      type  : Schema.Types.ObjectId,
      ref :"Author"
  },
  },
  {timestamps : true}
);
  
 export const Video = mongoose.model('Video', videoSchema);