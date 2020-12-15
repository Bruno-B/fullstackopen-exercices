const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken)
    if (!token || !decodedToken.id)return response.status(401).json({ error: "token missing or invalid" });

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: decodedToken.username,
      url: body.url,
      likes: body.likes,
      user: user,
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

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
