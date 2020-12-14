const helper = require("../utils/list_helper");
const api = require("supertest");

test("dummy test", () => {
  const blogs = [];
  const result = helper.dummy(blogs);
  expect(result).toBe(1);
});

const blogOne = {
    name:"Hello World",
    likes:500
}

const blogTwo = {
    name:"Hello Universe",
    likes:250
}
const blogThree = {
    name:"Hello Nothing",
    likes:250
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
        expect(result).toBe(null)
    })
    test("when list has only one blog returns that blog",()=>{
        const blogs = [blogOne]
        const result = helper.mostLiked(blogs)
        expect(result).toBe(blogOne)
    })

    test("of a bigger list return most liked",()=>{
        const blogs = [blogOne,blogTwo,blogThree]
        const result = helper.mostLiked(blogs)
        expect(result).toBe(blogOne)
    })
})