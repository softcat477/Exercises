const mongoose = require("mongoose")
const Blog = require("../models/blog")
const User = require("../models/User")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")
const bcrypt = require("bcrypt")

const api = supertest(app)

beforeEach(async () => {
    // Delete all users
    await User.deleteMany({})

    // Create and save root
    const pwd_hash = await bcrypt.hash("sillyPwd", 10)
    const user = new User({username: "root", pwd_hash: pwd_hash, name:"R1 R2"})
    await user.save()

    const uid = (await helper.usersInDb())[0].id // UnsupportedMediaTypeError

    // Clear db
    await Blog.deleteMany({})

    // and create blogs
    const blogObjList = helper.initialBlogs.map(b => new Blog({...b, user:uid}))
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

/*
4.10
Write a test that verifies that making an HTTP POST request to 
the /api/blogs url successfully creates a new blog post. At the 
very least, verify that the total number of blogs in the system i
s increased by one. You can also verify that the content of the 
blog post is saved correctly to the database.

Once the test is finished, refactor the operation to use async/await 
instead of promises.
*/
test("Varify HTTP POST to /api/blogs", async () => {
    const uid = (await helper.usersInDb())[0].id

    const new_blog ={
        title: "Blog C",
        author: "Author C",
        url: "URL C",
        likes: 666,
        user: uid
    }

    const response = await api.post("/api/blogs")
        .send(new_blog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const new_blogs = await helper.blogsInDb()
  
    expect(new_blogs).toHaveLength(helper.initialBlogs.length + 1)
    const content = new_blogs.map(x => {
        return JSON.stringify({"title": x.title, "author": x.author, "url": x.url, "likes":x.likes, "user":x.user})
    })

    // The new blog should contain uid
    expect(content).toContain(
        JSON.stringify(new_blog)
    )

    // and the blog id is added to user's blogs list
    const users = (await helper.usersInDb())
    const blog_id = users[0].blogs[0].toString()
    expect(blog_id).toBe(new_blogs[2].id)
})

/*
4.11
Write a test that verifies that if the likes property is missing from 
the request, it will default to the value 0. Do not test the other 
properties of the created blogs yet.

Make the required changes to the code so that it passes the test.
*/
test("Varify if likes is missing, the default value is 0", async () => {
    const uid = (await helper.usersInDb())[0].id

    // Do something
    const new_blog ={
        title: "Blog C",
        author: "Author C",
        url: "URL C",
        user: uid
    }
    // POST to add the new blog to the dataset
    const response = await api.post("/api/blogs")
        .send(new_blog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const new_blogs = await helper.blogsInDb()
    expect(new_blogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(new_blogs[helper.initialBlogs.length + 1 - 1].likes).toBe(0)
})

/*
4.12
Write a test related to creating new blogs via the /api/blogs endpoint, 
that verifies that if the title or url properties are missing from the 
request data, the backend responds to the request with the status code 400 
Bad Request.

Make the required changes to the code so that it passes the test.
*/
test("Varify if title or url are missing, we get status 400", async () => {
    const uid = (await helper.usersInDb())[0].id

    // Do something
    const missing_url ={
        title: "Empty",
        author: "Author C",
        likes: 11,
        user: uid
    }

    const missing_title ={
        author: "Author C",
        url: "Empty",
        likes: 11,
        user: uid
    }
    // POST to add the new blog to the dataset
    let response = await api.post("/api/blogs")
        .send(missing_url)
        .expect(400)

    response = await api.post("/api/blogs")
        .send(missing_title)
        .expect(400)
})

/*
4.13
Blog list expansions, step1
Implement functionality for deleting a single blog post resource.
Use the async/await syntax. Follow RESTful conventions when defining 
the HTTP API.
Implement tests for the functionality.
*/
test("Varify DELETE a post", async () => {
    const blogs_before_delete = await helper.blogsInDb()
    const blog_to_delete = blogs_before_delete[0]

    // Delete the blog, should get status 204
    const result = await api.delete(`/api/blogs/${blog_to_delete.id}`)
        .expect(204)

    const blogs_after_delete = await helper.blogsInDb()
    // Then, the length should be the length of the original database - 1
    expect(blogs_after_delete).toHaveLength(blogs_before_delete.length - 1)
    const blogs_after_delete_content = blogs_after_delete.map(x => JSON.stringify(x))
    // and the deleted blog should not be in the DB anymore
    expect(blogs_after_delete_content).not.toContain(JSON.stringify(blog_to_delete))
})

/*
4.14
Blog list expansions, step2

Implement functionality for updating the information of an 
individual blog post. Use async/await.

The application mostly needs to update the amount of likes for a blog post. You can implement this functionality the same way that we implemented updating notes in part 3.
*/
test("Varify updating the information of a blog", async () => {
    const original_blogs = await helper.blogsInDb()
    const blog_to_modify = original_blogs[0]
    let new_blog = {...blog_to_modify, 
        title: "new title",
        author: "new author",
        url: "new url",
        likes: -1
    }

    const result = await api.put(`/api/blogs/${blog_to_modify.id}`) 
        .send(new_blog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const answer = await helper.blogsInDb()
    new_blog.id = blog_to_modify.id
    expect(JSON.stringify(answer[0])).toBe(JSON.stringify(new_blog))
})

afterAll(() => {
    mongoose.connection.close()
})