import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import Blog from "./Blog"

test ("Render Blog", () => {
  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: -1
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector(".blog")
  expect(div).toHaveTextContent("title")
  expect(div).toHaveTextContent("author")
  expect(div).not.toHaveTextContent("url")
  expect(div).not.toHaveTextContent("-1")
})