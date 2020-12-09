const { TestScheduler } = require('jest')
const listHelper = require('../utils/list_helper')
const blogOne = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    likes: 5,
  };
  
  const blogTwo = {
    title: "Sweet Home",
    author: "Patrik W. Dillan",
    likes: 75,
  };

describe("most likes",() => {
    const blogList = [blogOne,blogTwo]
    test("when the list has two blogs,equals the blog with most likes",() => {
        const result = listHelper.mostLiked(blogList)
        expect(result).toEqual(blogTwo)
    })
})