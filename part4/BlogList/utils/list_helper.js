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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}