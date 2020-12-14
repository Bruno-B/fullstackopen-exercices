const supertest = require("supertest");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");

describe("get blogs in db", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

  test("amount of blog posts", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe("unique id.property is id",async() => {
  test("id exists",async()=>{
    const response = await api.get("/api/blogs")
    const firstBlog = response.body[0];
    expect(firstBlog.id).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close();
});
