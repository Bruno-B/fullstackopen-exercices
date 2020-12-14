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

describe("unique id.property is id", async () => {
  test("id exists", async () => {
    const response = await api.get("/api/blogs");
    const firstBlog = response.body[0];
    expect(firstBlog.id).toBeDefined();
  });
});

describe("create blog post", async () => {
  test("succeds with valid data", async () => {
    const newBlog = {
      title: "new blog",
      author: "new author",
      id: "aBk389VYYHZWcu355zQ2LBg6",
      likes: 25,
      url: "www.random.com",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);
  });
  test("likes are not defined", async () => {
    const noLikes = {
      title: "new blog",
      author: "new author",
      id: "aBk389VYYHZWcu355zQ2LBg6",
      url: "www.nolikes.com",
    };
    await api.post("/api/blogs").send(noLikes);

    const blogsAtEnd = await helper.blogsInDb();
    const likes = blogsAtEnd.map((n) => n.likes);
    expect(likes[likes.length - 1]).toBe(0);
  });

  test("fails with status code 400 if data invalid", async () => {
    const invalidBlog = {
      author: "Ruari Logan",
      likes: 50,
    };
    await api.post("/api/blogs").send(invalidBlog).expect(400);
  });
});

describe("delete blog", async () => {
  test("sucess deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1);
  });

  describe("update blog content", async () => {
    test("sucessfully created", async () => {
      const blog = {
        title: "Updated Title",
        url: "www.update.com",
        author: "Mr.Update",
        likes: 10000,
      };
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      await api.put(`/api/blogs/${blogToUpdate.id}`).send(blog).expect(200);
      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd[0]

      expect(updatedBlog.title).toBe("Updated Title")
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
