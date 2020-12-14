const helper = require("../utils/list_helper");
const api = require("supertest");

test("dummy test", () => {
  const blogs = [];
  const result = helper.dummy(blogs);
  expect(result).toBe(1);
});

const blogOne = {
    title:"Hello World",
    likes:500,
    author:"Jamal Nguyen",
    url:"https://www.example.com/",
    id:"zAgXiPp9OvtBjJwsUvIVaj24"
}

const blogTwo = {
    title:"Hello Universe",
    likes:250,
    author:"Oliwia Coombes",
    url:"https://www.example.net",
    id:"Yujef1ugEkyoeL6Mg3j7akel"
}
const blogThree = {
    title:"Hello Nothing",
    likes:250,
    author:"Gregory Ward",
    url:"https://www.example.org",
    id:"5s5bW14mQZHFdcKLpUFQausb"
}

describe("total likes", () => {
    test("of empty list is zero",() =>{
        const blogs = []
        const result = helper.totalLikes(blogs)
        expect(result).toBe(0)
    })
    test("when list has only one blog equals the likes of that",()=>{
        const blogs = [blogOne]
        const result = helper.totalLikes(blogs)
        expect(result).toBe(500)
    })
    test("of a bigger list is calculated right",()=>{
        const blogs = [blogOne,blogTwo,blogThree];
        const result = helper.totalLikes(blogs);
        expect(result).toBe(1000)

    })
});


describe("favourite blog",()=>{
    test("of empty list is zero",()=>{
        const blogs = []
        const result = helper.mostLiked(blogs)
        expect(result).toEqual(null)
    })
    test("when list has only one blog returns that blog",()=>{
        const blogs = [blogOne]
        const result = helper.mostLiked(blogs)
        expect(result).toEqual(blogOne)
    })

    test("of a bigger list return most liked",()=>{
        const blogs = [blogOne,blogTwo,blogThree]
        const result = helper.mostLiked(blogs)
        expect(result).toEqual(blogOne)
    })
})