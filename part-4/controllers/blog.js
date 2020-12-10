const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  const res  = await response.json(blogs);
});

blogsRouter.post("/", async(request, response) => {
  const blog = new Blog(request.body);
  const savedBlog = await blog.save()
  const res = await response.status(201).json(savedBlog)
  
});

module.exports = blogsRouter;
