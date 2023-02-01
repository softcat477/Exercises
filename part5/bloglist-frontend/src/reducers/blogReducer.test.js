import axios from "axios"
describe ("blogReducer", () => {
  let user
  beforeEach(async () => {
    // Delete blogs and users in the test db
    await axios.post("http://localhost:8080/api/testing/reset")

    // Create a user
    user = {
      name: "Anya Forger",
      username: "wakuwaku",
      pwd: "1234"
    }
    await axios.post("http://localhost:8080/api/users", user)
  })
  test("Hee", () => {
    console.log("Hoi")
  })
})