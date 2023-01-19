import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Blog from "./Blog"
import BlogDetail from "./BlogDetail"
import Togglable from "./Togglable"

/*
BlogDetail.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}
*/

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