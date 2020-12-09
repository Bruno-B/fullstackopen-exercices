const listHelper = require("../utils/list_helper");
const blogOne = {
  _id: "5a422aa71b54a676234d17f8",
  title: "Go To Statement Considered Harmful",
  author: "Edsger W. Dijkstra",
  url:
    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  likes: 5,
  __v: 0,
};

const blogTwo = {
  _id: "5a422aa21s54a623134d17f8",
  title: "Sweet Home",
  author: "Patrik W. Dillan",
  url: "http://www.u.alabama.edu",
  likes: 75,
  __v: 0,
};
describe("total likes", () => {
  const listWithOneBlog = [blogOne];
  const listWithTwoBlog = [blogOne, blogTwo];
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test("when list has two blogs,equals the likes of those", () => {
      const result = listHelper.totalLikes(listWithTwoBlog)
    expect(result).toBe(80);
  });
});
