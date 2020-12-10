const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const initialBlog = [
  {
    title: "HTML is easy",
    author: "Abraham Lincoln",
    url: "www.lincoln.com",
    likes: 324034,
  },
  {
    title: "My blog",
    author: "Myself",
    url: "www.myBlog.com",
    likes: 3442040,
  },
];

const addedBlog = {
  title: "Added blog",
  author: "Stelio Kontos",
  url: "www.stelios.com",
  likes: 23213,
};
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlog[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlog[1]);
  await blogObject.save();
});
test("there is one blog", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(2);
});

test("the first  blog title", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].title).toBe("HTML is easy");
});

test("the author of the second  blog ", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[1].author).toBe("Myself");
});

test("the unique identifier of the blog is defined", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("blog is saved", async () => {
  await api.post("/api/blogs")
    .send(addedBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const response = await api.get("/api/blogs");
  const titles = response.body.map((res) => res.title);

  expect(response.body).toHaveLength(initialBlog.length + 1);
  expect(titles).toContain("Added blog");
});

afterAll(() => {
  mongoose.connection.close();
});
