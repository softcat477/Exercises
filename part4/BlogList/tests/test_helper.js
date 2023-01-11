const Blog = require("../models/blog")
const User = require("../models/user")

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

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb,
}