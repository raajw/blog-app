import express from "express"
import  './db/index.js'
import cors from "cors"
import blogRouter from "./route/blog-route.js";
const app = express();
app.use(cors());
app.use(express.json())

app.use("/api/blogs",blogRouter)

app.listen(5000,()=>{
    console.log(`App running on port 5000`);
})