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

/*
4.9
Write a test that verifies that the unique identifier property of 
the blog posts is named id, by default the database names the property 
_id. Verifying the existence of a property is easily done with Jest's 
toBeDefined matcher.

Make the required changes to the code so that it passes the test. 
The toJSON method discussed in part 3 is an appropriate place for 
defining the id parameter.
*/
test ("Varify the id property", async () => {
    const response = await api.get("/api/blogs")
    response.body.forEach((x) => {
        expect(x.id).toBeDefined()
    })
})

afterAll(() => {
    mongoose.connection.close()
})