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
    const login_user = {
        username: "root",
        pwd: "sillyPwd"
    }

    const response_login = await api.post("/api/login")
        .send(login_user)
        .expect(200)
        .expect("Content-Type", /application\/json/)

    // Should get the token and the username as root
    expect(response_login.body).toHaveProperty('token')
    expect(response_login.body.username).toBe("root")

    const token = response_login.body.token

    const uid = (await helper.usersInDb())[0].id

    const new_blog ={
        title: "Blog C",
        author: "Author C",
        url: "URL C",
        likes: 666,
        user: uid
    }

    const response = await api.post("/api/blogs")
        .set("Authorization", "Bearer " + token)
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
    const login_user = {
        username: "root",
        pwd: "sillyPwd"
    }

    const response_login = await api.post("/api/login")
        .send(login_user)
        .expect(200)
        .expect("Content-Type", /application\/json/)

    // Should get the token and the username as root
    expect(response_login.body).toHaveProperty('token')
    expect(response_login.body.username).toBe("root")

    const token = response_login.body.token

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
        .set("Authorization", "Bearer " + token)
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
    const login_user = {
        username: "root",
        pwd: "sillyPwd"
    }

    const response_login = await api.post("/api/login")
        .send(login_user)
        .expect(200)
        .expect("Content-Type", /application\/json/)

    // Should get the token and the username as root
    expect(response_login.body).toHaveProperty('token')
    expect(response_login.body.username).toBe("root")

    const token = response_login.body.token

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
        .set("Authorization", "Bearer " + token)
        .send(missing_url)
        .expect(400)

    response = await api.post("/api/blogs")
        .set("Authorization", "Bearer " + token)
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
test("Varify DELETE a post with valid TOKEN", async () => {
    // Get token
    const login_user = {
        username: "root",
        pwd: "sillyPwd"
    }

    const response_login = await api.post("/api/login")
        .send(login_user)
        .expect(200)
        .expect("Content-Type", /application\/json/)

    // Should get the token and the username as root
    expect(response_login.body).toHaveProperty('token')
    expect(response_login.body.username).toBe("root")
    const token = response_login.body.token

    const blogs_before_delete = await helper.blogsInDb()
    const blog_to_delete = blogs_before_delete[0]

    // Delete the blog, should get status 204
    const result = await api.delete(`/api/blogs/${blog_to_delete.id}`)
        .set("Authorization", "Bearer " + token)
        .expect(204)

    const blogs_after_delete = await helper.blogsInDb()
    // Then, the length should be the length of the original database - 1
    expect(blogs_after_delete).toHaveLength(blogs_before_delete.length - 1)
    const blogs_after_delete_content = blogs_after_delete.map(x => JSON.stringify(x))
    // and the deleted blog should not be in the DB anymore
    expect(blogs_after_delete_content).not.toContain(JSON.stringify(blog_to_delete))
})

test("DELETE a post with invalid TOEKN should not work", async () => {
    // Get token
    const login_user = {
        username: "root",
        pwd: "sillyPwd"
    }

    const response_login = await api.post("/api/login")
        .send(login_user)
        .expect(200)
        .expect("Content-Type", /application\/json/)

    // Should get the token and the username as root
    expect(response_login.body).toHaveProperty('token')
    expect(response_login.body.username).toBe("root")
    const token = response_login.body.token.toUpperCase() // toUpperCase() to make this token invalid

    const blogs_before_delete = await helper.blogsInDb()
    const blog_to_delete = blogs_before_delete[0]

    // Delete the blog with invalid token, should get status 401
    const result = await api.delete(`/api/blogs/${blog_to_delete.id}`)
        .set("Authorization", "Bearer " + token)
        .expect(401)

    const blogs_after_delete = await helper.blogsInDb()
    // Then, the length should be the length of the original database
    expect(blogs_after_delete).toHaveLength(blogs_before_delete.length)
    const blogs_after_delete_content = blogs_after_delete.map(x => JSON.stringify(x))
    // and the deleted blog should be IN the DB
    expect(blogs_after_delete_content).toContain(JSON.stringify(blog_to_delete))
})

test("DELETE other people's post is not accepted", async () => {
    // First we make another user
    const pwd_hash = await bcrypt.hash("123456", 10)
    const user = new User({username: "tammy", pwd_hash: pwd_hash, name:"Tammy theCat"})
    await user.save()

    // Find the new user abd get its ID
    const users = await helper.usersInDb()
    const uid = users.filter(u => u.username === "tammy")[0].id

    // and create blogs for Tammy
    await Blog.deleteMany({})
    const blogObjList = helper.initialBlogs.map(b => new Blog({...b, user:uid}))
    const promiseList = blogObjList.map(b => b.save())
    await Promise.all(promiseList)

    // and get a blog ID
    const blogs_before_delete = await helper.blogsInDb()
    const blog_to_delete = blogs_before_delete[0]

    // Then we login as root to get the token
    const login_user = {
        username: "root",
        pwd: "sillyPwd"
    }

    const response_login = await api.post("/api/login")
        .send(login_user)
        .expect(200)
        .expect("Content-Type", /application\/json/)

    // Should get the token and the username as root
    expect(response_login.body).toHaveProperty('token')
    expect(response_login.body.username).toBe("root")
    const root_token = response_login.body.token

    // Delete tammy's blog with root's token, should get status 401
    const result = await api.delete(`/api/blogs/${blog_to_delete.id}`)
        .set("Authorization", "Bearer " + root_token)
        .expect(401)

    const blogs_after_delete = await helper.blogsInDb()
    // Then, the length should be the length of the original database
    expect(blogs_after_delete).toHaveLength(blogs_before_delete.length)
    const blogs_after_delete_content = blogs_after_delete.map(x => JSON.stringify(x))
    // and the deleted blog should be IN the DB 
    expect(blogs_after_delete_content).toContain(JSON.stringify(blog_to_delete))
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

test("POST with an invalid token should get 401", async () => {
    const login_user = {
        username: "root",
        pwd: "sillyPwd"
    }

    const response_login = await api.post("/api/login")
        .send(login_user)
        .expect(200)
        .expect("Content-Type", /application\/json/)

    expect(response_login.body).toHaveProperty('token')
    expect(response_login.body.username).toBe("root")

    // Invalid token
    const token = response_login.body.token.toUpperCase()

    const uid = (await helper.usersInDb())[0].id

    // This blog should not be added to DB
    const new_blog ={
        title: "Blog C",
        author: "Author C",
        url: "URL C",
        user: uid
    }

    const blogsAtFirst = await helper.blogsInDb()

    // POST to add the new blog to the dataset with an invalid token
    const response = await api.post("/api/blogs")
        .set("Authorization", "Bearer " + token)
        .send(new_blog)
        .expect(401)
        .expect("Content-Type", /application\/json/)

    // Since we're using an invalid token, the blog should not be added to DB
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtFirst.length)
})

afterAll(() => {
    mongoose.connection.close()
})