import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const user = {
  username: "Test Username",
};
const blog = {
  title: "Test Blog",
  author: "Test Author",
  url: "test.com",
  likes: 100,
  user: user,
};
test(" only renders title and author", () => {
  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent("Test Blog Test Author");
});

test("url and likes shown", () => {
  const component = render(<Blog blog={blog} />);
  const button = component.getByText("view");
  fireEvent.click(button);
  expect(component.container).toHaveTextContent("test.com");
  expect(component.container).toHaveTextContent("likes 100");
});

test("like button calls handler", () => {
  const mockHandler = jest.fn();
  const component = render(<Blog blog={blog} handleLikes={mockHandler} />);
  const button = component.getByText("view");
  fireEvent.click(button);
  const likeButton = component.getByText("like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
