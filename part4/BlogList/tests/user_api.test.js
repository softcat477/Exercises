const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const bcrypt = require("bcrypt")
const User = require("../models/user")
const helper = require("./test_helper")

const api = supertest(app)

describe("When there's only one user in the test db", () => {
    beforeEach(async () => {
        // Delete all users
        await User.deleteMany({})

        // Create root
        const pwd_hash = await bcrypt.hash("sillyPwd", 10)
        const user = new User({username: "root", pwd_hash: pwd_hash, name:"R1 R2"})

        // Save root
        await user.save()
    })

    // HTTP POST to create a user
    test("create a user with username/pwd at least 3 characters long", async () => {
        const users_at_start = await helper.usersInDb()

        // We create a new user
        const new_user = {username: 'name_1', name:"First, Second", pwd: "12234"}
        await api.post("/api/users")
            .send(new_user)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const users_at_end = await helper.usersInDb()

        // The length should be the original length + 1
        expect(users_at_end).toHaveLength(users_at_start.length + 1)

        // the usernamen should be in the db
        const usernames = users_at_end.map(u => u.username)
        expect(usernames).toContain(new_user.username)
    })

    // HTTP POST to create a user with the same username
    test("create a user with repeating username", async () => {
        const users_at_start = await helper.usersInDb()

        const new_user = {username: "root", pwd:"1234", name:"R2 R1"}
        await api.post("/api/users")
            .send(new_user)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        const users_at_end = await helper.usersInDb()

        // The length should be the original length + 1
        expect(users_at_end).toHaveLength(users_at_start.length)
    })

    // HTTP POST to create a user with username < 3 characters
    test("create a user with username less than 3 characters long", async () => {
        const users_at_start = await helper.usersInDb()

        // We create a new user
        const new_user = {username: 'na', name:"First, Second", pwd: "12234"}
        await api.post("/api/users")
            .send(new_user)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        const users_at_end = await helper.usersInDb()

        // The length should be the original length + 1
        expect(users_at_end).toHaveLength(users_at_start.length)

        // the usernamen should be in the db
        const usernames = users_at_end.map(u => u.username)
        expect(usernames).not.toContain(new_user.username)
    })

    // HTTP POST to create a user with pwd < 3 characters
    test("create a user with pwd less than 3 characters long", async () => {
        const users_at_start = await helper.usersInDb()

        // We create a new user
        const new_user = {username: 'nananana', name:"First, Second", pwd: "12"}
        await api.post("/api/users")
            .send(new_user)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        const users_at_end = await helper.usersInDb()

        // The length should be the original length + 1
        expect(users_at_end).toHaveLength(users_at_start.length)

        // the usernamen should be in the db
        const usernames = users_at_end.map(u => u.username)
        expect(usernames).not.toContain(new_user.username)
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})