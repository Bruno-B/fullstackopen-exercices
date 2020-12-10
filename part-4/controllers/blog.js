const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);
  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id",async(request,response,next) => {
  const body = request.body
  const blog = {
    title:body.title,
    url : body.url,
    author:body.author,
    likes:body.likes
  }
  try {
    const update = await Blog.findByIdAndUpdate(request.params.id,blog,{new:true})
    response.json(update)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter;
