import express from 'express'

const blogRouter = express.Router()

import {fetchListOfBlogs,addNewBlog,updateBlog,deleteBlog} from "../controller/blog_controller.js"

blogRouter.get('/',fetchListOfBlogs)
blogRouter.post('/add',addNewBlog)
blogRouter.put('/update/:id',updateBlog)
blogRouter.delete('/delete/:id',deleteBlog)


export default  blogRouter