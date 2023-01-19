import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import BlogDetail from "./BlogDetail"
import Togglable from "./Togglable"

test ("Click to show a blog's url and likes", async () => {
  const blog = {
    title: "title",
    author: "author",
    url: "http://url",
    likes: -1
  }
  const likeBlogFn = jest.fn()
  const deleteBlogFn = jest.fn()

  const { container } = render(
    <Togglable buttonLabel="details">
      <BlogDetail title={ blog.title }
        author={ blog.author }
        url={ blog.url }
        likes={ blog.likes}
        blog={ blog }
        likeBlog={ likeBlogFn }
        deleteBlog={ deleteBlogFn } />
    </Togglable>
  )


  let div = container.querySelector(".togglable")

  // Should show nothing before clicking the button
  expect(div).toHaveStyle("display: none")

  // click the button
  const user = userEvent.setup()
  const button = screen.getByText("details")
  await user.click(button)

  div = container.querySelector(".togglable")

  // Should show details
  expect(div).not.toHaveStyle("display: none")

  // Should see url and likes
  const blogDetail = container.querySelector(".blogDetail")
  expect(blogDetail).toHaveTextContent("http://url")
  expect(blogDetail).toHaveTextContent("-1")
})

test("Click like", async () => {
  const blog = {
    title: "title",
    author: "author",
    url: "http://url",
    likes: -1
  }
  const likeBlogFn = jest.fn()
  const deleteBlogFn = jest.fn()

  render(
    <BlogDetail title={ blog.title }
      author={ blog.author }
      url={ blog.url }
      likes={ blog.likes}
      blog={ blog }
      likeBlog={ likeBlogFn }
      deleteBlog={ deleteBlogFn } />
  )

  // click the button twice
  const user = userEvent.setup()
  const button = screen.getByText("like")
  await user.click(button)
  await user.click(button)

  // Should hit the mocked function twice
  expect(likeBlogFn.mock.calls).toHaveLength(2)
})

test("Click delete", async () => {
  const blog = {
    title: "title",
    author: "author",
    url: "http://url",
    likes: -1
  }
  const likeBlogFn = jest.fn()
  const deleteBlogFn = jest.fn()

  render(
    <BlogDetail title={ blog.title }
      author={ blog.author }
      url={ blog.url }
      likes={ blog.likes}
      blog={ blog }
      likeBlog={ likeBlogFn }
      deleteBlog={ deleteBlogFn } />
  )

  // click the button
  const user = userEvent.setup()
  const button = screen.getByText("delete")
  await user.click(button)

  // Should hit the mocked function
  expect(deleteBlogFn.mock.calls).toHaveLength(1)
})