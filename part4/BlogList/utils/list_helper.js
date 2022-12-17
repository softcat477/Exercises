const { values } = require("lodash")
var _ = require("lodash")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs_list) => {
    const sum = blogs_list.map(x => x.likes).reduce((total, current) => total + current, 0)
    return sum
} 

const favoriteBlog = (blog_list) => {
    const sorted_blog_list = [...blog_list].sort((a, b) => a.likes < b.likes ? 1: -1)
    return sorted_blog_list[0]
}

const mostBlogs = (blog_list) => {
    const tmp = _.countBy(blog_list, (x) => x.author)
    const max_count = Math.max(...Object.values(tmp))
    const author_name = Object.keys(tmp).find(key => tmp[key] === max_count)
    return {
        author: author_name,
        blogs: max_count
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}