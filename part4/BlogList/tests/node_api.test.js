const mongoose = require("mongoose")
const Blog = require("../models/blog")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")

const api = supertest(app)

beforeEach(async () => {
    // Clear db
    await Blog.deleteMany({})

    // and create blogs
    const blogObjList = helper.initialBlogs.map(b => new Blog(b))
    const promiseList = blogObjList.map(b => b.save())
    await Promise.all(promiseList)
})


test("Show the blog list", async () => {
    const answer = helper.initialBlogs
    const response = await api.get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)

    expect(response.body).toHaveLength(answer.length)
})

afterAll(() => {
    mongoose.connection.close()
})