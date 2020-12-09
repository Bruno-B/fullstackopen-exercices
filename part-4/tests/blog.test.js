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

  const blogThree = {
    title: "Don't Go To Statement",
    author: "Edsger W. Dijkstra",
    likes: 5,
  };

describe("most likes",() => {
    const blogList = [blogOne,blogTwo]
    test("when the list has two blogs,equals the blog with most likes",() => {
        const result = listHelper.mostLiked(blogList)
        expect(result).toEqual(blogTwo)
    })
})

describe("author with most blogs and the respective blogs",()=> {
    const oneBlogList = [blogTwo]
    const blogList = [blogOne,blogTwo,blogThree]
    test("when list has 1 blog , author with most blogs",() => {
        const result = listHelper.mostBlogs(oneBlogList)
        expect(result).toEqual({author:blogTwo.author , blogs:1})
    })
    test("when list has 3 blogs,author with most blogs",() => {
        const result = listHelper.mostBlogs(blogList)
        expect(result).toEqual({author:blogOne.author,blogs:2})
    })
})