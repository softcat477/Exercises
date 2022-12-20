const Blog = require("../models/blog")

const initialBlogs = [
    {
        title: "Blog A",
        author: "Author A",
        url: "URL A",
        likes: 12
    },
    {
        title: "Blog B",
        author: "Author B",
        url: "URL B",
        likes: 2
    }
]

const blogsInDb  = async () => {
    // Fetch and return each blog in JSOn
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
}