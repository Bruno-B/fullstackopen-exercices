const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user",{username:1,name:1,id:1});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const user = await User.find({});
    const firstUser = user[0];

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: firstUser,
    });
    const savedBlog = await blog.save();
    firstUser.blogs = firstUser.blogs.concat(savedBlog._id);
    await firstUser.save();

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

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const blog = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes,
  };
  try {
    const update = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(update);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
