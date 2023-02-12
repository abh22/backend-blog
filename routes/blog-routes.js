
import { addBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controllers/blog-controller";
import express from 'express'
const blogRouter = express.Router();

blogRouter.get('/',getAllBlogs)
blogRouter.post('/addBlog',addBlog)
blogRouter.put('/update/:id',updateBlog)
blogRouter.get('/:id',getBlogById)
blogRouter.delete('/:id',deleteBlog)
export default blogRouter