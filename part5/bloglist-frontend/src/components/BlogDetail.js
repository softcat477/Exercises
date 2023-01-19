import PropTypes from "prop-types"

const BlogDetail = ({ title, author, url, likes, blog, likeBlog, deleteBlog }) => {
  const click = async () => {
    await likeBlog(blog)
  }

  const onDelete = async () => {
    await deleteBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={ blogStyle } className="blogDetail">
      <ul>
        <li key="title">Title : {title}</li>
        <li key="author">Author: {author}</li>
        <li key="url">Url   : {url}</li>
        <li key="likes">likes : {likes} <button onClick={click}>like</button></li>
      </ul>
      <button onClick={onDelete}>delete</button>
    </div>
  )
}

BlogDetail.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogDetail