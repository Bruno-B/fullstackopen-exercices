const helper = require("../utils/list_helper");

test("dummy test", () => {
  const blogs = [];
  const result = helper.dummy(blogs);
  expect(result).toBe(1);
});

const blogOne = {
  title: "Hello World",
  likes: 500,
  author: "Gregory Ward",
  url: "https://www.example.com/",
  id: "zAgXiPp9OvtBjJwsUvIVaj24",
};

const blogTwo = {
  title: "Hello Universe",
  likes: 250,
  author: "Oliwia Coombes",
  url: "https://www.example.net",
  id: "Yujef1ugEkyoeL6Mg3j7akel",
};
const blogThree = {
  title: "Hello Nothing",
  likes: 350,
  author: "Gregory Ward",
  url: "https://www.example.org",
  id: "5s5bW14mQZHFdcKLpUFQausb",
};

describe("total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    const result = helper.totalLikes(blogs);
    expect(result).toBe(0);
  });
  test("when list has only one blog equals the likes of that", () => {
    const blogs = [blogOne];
    const result = helper.totalLikes(blogs);
    expect(result).toBe(500);
  });
  test("of a bigger list is calculated right", () => {
    const blogs = [blogOne, blogTwo, blogThree];
    const result = helper.totalLikes(blogs);
    expect(result).toBe(1100);
  });
});

describe("favourite blog", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    const result = helper.mostLiked(blogs);
    expect(result).toEqual(null);
  });
  test("when list has only one blog returns that blog", () => {
    const blogs = [blogOne];
    const result = helper.mostLiked(blogs);
    expect(result).toEqual(blogOne);
  });

  test("of a bigger list return most liked", () => {
    const blogs = [blogOne, blogTwo, blogThree];
    const result = helper.mostLiked(blogs);
    expect(result).toEqual(blogOne);
  });
});

describe("author with most blogs", () => {
  test("of empty list is null", () => {
    const blogs = [];
    const result = helper.mostBlogs(blogs);
    expect(result).toEqual(null);
  });

  test("when list has only one blog return author of that blog", () => {
    const blogs = [blogOne];
    const result = helper.mostBlogs(blogs);
    expect(result).toEqual({ author: "Gregory Ward", blogs: 1 });
  });

  test("of a bigger list return author with most blogs", () => {
    const blogs = [blogOne, blogTwo, blogThree];
    const result = helper.mostBlogs(blogs);
    expect(result).toEqual({ author: "Gregory Ward", blogs: 2 });
  });
});

describe("author with most likes", () => {
  test("of empty list is null", () => {
    const blogs = [];
    const result = helper.mostLikes(blogs);
    expect(result).toEqual(null);
  });
  test("when list has only one blog return author of that blog", () => {
    const blogs = [blogTwo];
    const result = helper.mostLikes(blogs);
    expect(result).toEqual({ author: "Oliwia Coombes", likes: 250 });
  });
  test("of a bigger list return author with most blogs", () => {
    const blogs = [blogOne, blogTwo, blogThree];
    const result = helper.mostLikes(blogs);
    expect(result).toEqual({ author: "Gregory Ward", likes: 850 });
  });
});
