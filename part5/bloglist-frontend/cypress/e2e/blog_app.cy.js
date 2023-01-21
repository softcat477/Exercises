describe("Blog app", () => {
  beforeEach(function () {
    // Clear DB and visit the blog app
    cy.request("POST", "http://localhost:8080/api/testing/reset")
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function() {
    // Use regex to match username...password...login
    // Use className to select the login form
    cy.contains(".login-form", /(username).*(password).*(login)/)
    // Use get to get the form DOM element.
    cy.get("form").contains(/(username).*(password).*(login)/)
  })

  describe("Login", function() {
    beforeEach(function() {
      // GOAL: Test the login foirm
      // 1. login and logout
      // 2. login with the wrong password

      // Create a user
      const user = {
        name: "Anya Forger",
        username: "wakuwaku",
        pwd: "1234"
      }
      cy.request("POST", "http://localhost:8080/api/users", user)
      cy.wrap(user).as("user")
    })

    it("succeeds with correct credentials, and suceeds when pressing logout", function() {
      // Login with the correct username and password
      cy.get("#username").type("wakuwaku")
      cy.get("#password").type("1234")
      cy.get("#login-button").click()

      // Should be able to login and show messages
      cy.contains(`${this.user.name} logged in`)

      // Then we press the logout button to logout
      cy.get("#logout-button").click()

      // Should not contain the login message
      cy.get("html").should("not.contain", `${this.user.name} logged in`)
      // and the login form needs to show up again
      cy.contains(".login-form", /(username).*(password).*(login)/)
      cy.get("form").contains(/(username).*(password).*(login)/)
    })

    it("succeeds with correct credentials", function() {
      // When login with the wrong password
      cy.get("#username").type("wakuwaku")
      cy.get("#password").type("4231")
      cy.get("#login-button").click()

      // The login request should be rejected
      cy.get("html").should("not.contain", `${this.user.name} logged in`)
      // and an error message should show up
      cy.contains("Wrong Credential")
    })

    describe("when logged in", function() {
      beforeEach(function() {
        // bypass the login form and login with POST
        cy.login({username:"wakuwaku", pwd:"1234"})
      })
  
      it("A blog can be created", function() {
        const title = "Grand Confort LC-2 Petit Modele"
        const author = "Le Corbusier"
        const url = "http://spy-family"

        // Create a blog
        cy.get("#toggle-show").click()
        cy.get("#title-input").type(title)
        cy.get("#author-input").type(author)
        cy.get("#url-input").type(url)
        cy.get("#create-button").click()

        // The blog should (1) be added to the list
        //  (2) contains title and author
        //  (3) hide url
        cy.get(".blog")
          .should("have.length", 1)
          .should("contain", title)
          .should("contain", author)
          .should("not.contain", url)
      })

      describe("when a blog has been created", function(){
        beforeEach(function() {
          const title = "Grand Confort LC-2 Petit Modele"
          const author = "Le Corbusier"
          const url = "http://spy-family"

          cy.createBlog({
            title:title,
            author:author,
            url:url
          })

          cy.wrap(title).as("title")
          cy.wrap(author).as("author")
          cy.wrap(url).as("url")
        })

        it("click view to show blog details and click like", function() {
          // We only have one blog
          cy.get(".blog ~ .togglable").as("blogDetail")

          // Before clicking the view button, blog detail should not show up
          cy.get("@blogDetail")
            .should("have.css", "display", "none")

          // Click the first view button
          cy.contains("view").click()

          // and we should see blog details incluiding title, author, url, and like
          cy.get("@blogDetail")
            .should("contain", `Title : ${this.title}`)
            .and("contain", `Author: ${this.author}`)
            .and("contain", `Url   : ${this.url}`)
            .and("contain", "likes : 0")

          // Click the first blog detail's like button
          cy.get("@blogDetail").first().find("#like-button").click()

          // and the likes should be 1
          cy.get("@blogDetail")
            .first()
            .and("contain", "likes : 1")
        })
      })
    })
  })
})