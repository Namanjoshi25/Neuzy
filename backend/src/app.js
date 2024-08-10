import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true , limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
 import userRouter from './routes/user.route.js'
 import authorRouter from './routes/author.route.js'
import newsRouter from './routes/news.route.js'
import videoRouter from './routes/video.route.js'

//routes declaration
app.use('/api/v1/users',userRouter)
app.use('/api/v1/author',authorRouter)
app.use('/api/v1/news', newsRouter)
app.use('/api/v1/video',videoRouter)



export {app}  