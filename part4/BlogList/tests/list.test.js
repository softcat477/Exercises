const listHelper = require("../utils/list_helper")

test("dummy returns one", () => {
    const blogs = []
    expect(listHelper.dummy(blogs)).toBe(1)
})

describe ("Total likes", () => {
    const list_with_one_blog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test("when list has zero blog", () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test("when list has only one blog, equals the likes of that", () => {
        const result = listHelper.totalLikes(list_with_one_blog)
        expect(result).toBe(5)
    })

    test("of a list with multiple blogs", () => {
        const result = listHelper.totalLikes(list_with_one_blog.concat(list_with_one_blog))
        expect(result).toBe(10)
    })
})