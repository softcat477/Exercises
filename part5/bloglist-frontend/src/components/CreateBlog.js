import { useState } from "react"
const CreateBlog = ({ createBlogOnServer }) => {

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleCreate = async (event) => {
    event.preventDefault()
    await createBlogOnServer({
      title: title,
      author: author,
      url: url
    })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <>
      <form onSubmit={handleCreate}>
        <div>
          title <input type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title-input"
          />
        </div>

        <div>
          author <input type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author-input"
          />
        </div>

        <div>
          url <input type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url-input"
          />
        </div>

        <button type="submit">create</button>
      </form>
    </>
  )
}

export default CreateBlog