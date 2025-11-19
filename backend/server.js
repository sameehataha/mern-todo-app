import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import todoRoutes from './routes/todo.js'
dotenv.config()
const app = express()
app.use(express.json())
// app.get("/",(req,res) =>{
//     res.send("serverr is ready")
// })
app.use("/api/todos", todoRoutes)
const __dirname = path.resolve()
if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}
app.listen(5000,() => {
    connectDB()
    console.log("server statred at 5000")
})