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

describe ("Search the favorite blog", () => {
    const list_blog = [
        {
            _id: '12345',
            title: 'Blog A',
            author: 'Author A',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '23451',
            title: 'Blog B',
            author: 'Author B',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 3,
            __v: 0
        },
        {
            _id: '34512',
            title: 'Blog C',
            author: 'Author C',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        },
        {
            _id: '34512',
            title: 'Blog C',
            author: 'Author C',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        },
    ]

    test("when list has only one blog, it should be the favorite one", () => {
        const result = listHelper.favoriteBlog(list_blog.slice(0, 1))
        expect(result).toEqual(list_blog.slice(0, 1)[0])
    })

    test("of a list with multiple blogs", () => {
        const result = listHelper.favoriteBlog(list_blog)
        expect(result).toEqual(list_blog.slice(-2,-1)[0])
    })
})

describe("Search for the most productive (?) author", () => {
    const blog_list = [
        {
            _id: '12345',
            title: 'Blog A',
            author: 'Author A',
            url: "",
            likes: 5,
            __v: 0
        },
        {
            _id: '23451',
            title: 'Blog B',
            author: 'Author B',
            url: "",
            likes: 3,
            __v: 0
        },
        {
            _id: '34512',
            title: 'Blog C',
            author: 'Author C',
            url: "",
            likes: 10,
            __v: 0
        },
        {
            _id: '34512',
            title: 'Blog C',
            author: 'Author C',
            url: "",
            likes: 10,
            __v: 0
        },
        {
            _id: '34512',
            title: 'Blog C',
            author: 'Author C',
            url: "",
            likes: 10,
            __v: 0
        },
    ]
    test("search a list with 2+ authors", () => {
        const result = listHelper.mostBlogs(blog_list)
        expect(result).toEqual({author:"Author C", blogs:3})
    })

    test("search a list with 1 author", () => {
        const result = listHelper.mostBlogs(blog_list.slice(0, 1))
        expect(result).toEqual({author:"Author A", blogs:1})
    })
})

describe("Search for the most liked author", () => {
    const blog_list = [
        {
            _id: '12345',
            title: 'Blog A',
            author: 'Author A',
            url: "",
            likes: 5,
            __v: 0
        },
        {
            _id: '23451',
            title: 'Blog B',
            author: 'Author B',
            url: "",
            likes: 3,
            __v: 0
        },
        {
            _id: '34512',
            title: 'Blog C',
            author: 'Author C',
            url: "",
            likes: 10,
            __v: 0
        },
        {
            _id: '34512',
            title: 'Blog C',
            author: 'Author C',
            url: "",
            likes: 10,
            __v: 0
        },
        {
            _id: '34512',
            title: 'Blog C',
            author: 'Author C',
            url: "",
            likes: 10,
            __v: 0
        },
    ]
    test("search a list with 2+ authors", () => {
        const result = listHelper.mostLiked(blog_list)
        expect(result).toEqual({author:"Author C", likes:30})
    })

    test("search a list with 1 author", () => {
        const result = listHelper.mostLiked(blog_list.slice(0, 1))
        expect(result).toEqual({author:"Author A", likes:5})
    })
})