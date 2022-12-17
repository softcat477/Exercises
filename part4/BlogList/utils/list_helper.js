const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs_list) => {
    const sum = blogs_list.map(x => x.likes).reduce((total, current) => total + current, 0)
    return sum
} 

module.exports = {
    dummy,
    totalLikes
}