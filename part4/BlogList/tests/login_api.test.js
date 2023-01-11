const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const bcrypt = require("bcrypt")
const User = require("../models/user")
const helper = require("./test_helper")

const api = supertest(app)

//describe("When there's only one user in the test db", () => {
beforeEach(async () => {
    // Delete all users
    await User.deleteMany({})

    // Create root
    const pwd_hash = await bcrypt.hash("sillyPwd", 10)
    const user = new User({username: "root", pwd_hash: pwd_hash, name:"R1 R2"})

    // Save root
    await user.save()
})

test("login with correct username and pwd and get the token", async() => {
    const login_user = {
        username: "root",
        pwd: "sillyPwd"
    }

    const response = await api.post("/api/login")
        .send(login_user)
        .expect(200)
        .expect("Content-Type", /application\/json/)

    // Should get the token and the username as root
    expect(response.body).toHaveProperty('token')
    expect(response.body.username).toBe("root")
})

test("login to get the correct token and post a blog with this token", async() => {
    const login_user = {
        username: "root",
        pwd: "sillyPwd"
    }

    const response = await api.post("/api/login")
        .send(login_user)
        .expect(200)
        .expect("Content-Type", /application\/json/)

    // Should get the token and the username as root
    expect(response.body).toHaveProperty('token')
    expect(response.body.username).toBe("root")

    const token = response.body.token
})

test("login with the incorrect pwd should get 401", async() => {
    const login_user = {
        username: "root",
        pwd: "silly"
    }

    const response = await api.post("/api/login")
        .send(login_user)
        .expect(401)
        .expect("Content-Type", /application\/json/)

    // Should get the token and the username as root
    expect(response.body).not.toHaveProperty('token')
})

afterAll(() => {
    mongoose.connection.close()
})
//})

