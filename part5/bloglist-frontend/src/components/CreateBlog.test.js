import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import CreateBlog from "./CreateBlog"

test("Create a new blog", async () => {
  const createBlogFn = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<CreateBlog createBlogOnServer={createBlogFn} />)

  const title_input = container.querySelector("#title-input")
  const author_input = container.querySelector("#author-input")
  const url_input = container.querySelector("#url-input")
  const create_button = screen.getByText("create")

  await user.type(title_input, "test-title")
  await user.type(author_input, "test-author")
  await user.type(url_input, "test-url")
  await user.click(create_button)

  expect(createBlogFn.mock.calls).toHaveLength(1)
  expect(createBlogFn.mock.calls[0][0].title).toBe("test-title")
  expect(createBlogFn.mock.calls[0][0].author).toBe("test-author")
  expect(createBlogFn.mock.calls[0][0].url).toBe("test-url")
})
