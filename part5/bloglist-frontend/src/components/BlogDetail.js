const BlogDetail = ({title, author, url, likes}) => {
    const click = () => {
        console.log("love me!")
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }

    return (
        <div style={blogStyle}>
        <ul>
            <li key="title">Title : {title}</li>
            <li key="author">Author: {author}</li>
            <li key="url">Url   : {url}</li>
            <li key="likes">likes : {likes} <button onClick={click}>like</button></li>
        </ul>
        </div>
    )
}

export default BlogDetail