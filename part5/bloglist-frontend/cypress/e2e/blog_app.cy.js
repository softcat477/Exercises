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

        it("delete the blog", function() {
          // We only have one blog
          cy.get(".blog ~ .togglable").as("blogDetail")

          // If we click the first view button
          cy.contains("view").click()

          // and delete the blog
          cy.get("@blogDetail")
            .first()
            .find("#delete-button")
            .click()

          // then there's no blog left
          cy.get(".blog").should("not.exist")
        })
      })

      describe("when three blog has been created", function(){
        beforeEach(function() {
          const title_1st = "Grand Confort LC-2 Petit Modele"
          const author_1st = "Le Corbusier"
          const url_1st = "http://spy-family"

          cy.createBlog({
            title:title_1st,
            author:author_1st,
            url:url_1st
          })

          const title_2nd = "Marshmallow Sofa"
          const author_2nd = "Irving Harper"
          const url_2nd = "http://spy-family"

          cy.createBlog({
            title:title_2nd,
            author:author_2nd,
            url:url_2nd
          })

          const title_3rd = "La Chaise"
          const author_3rd = "CGarler and Ray Eames"
          const url_3rd = "http://spy-family"

          cy.createBlog({
            title:title_3rd,
            author:author_3rd,
            url:url_3rd
          })

          cy.wrap(title_1st).as("title_1st")
          cy.wrap(title_2nd).as("title_2nd")
          cy.wrap(title_3rd).as("title_3rd")
        })

        it("three blogs should be displayed in descending oreder", function () {
          // first blog: 3 likes, second blog: 2 likes, third blog: 1 likes
          cy.multiLikes({
            blog_title: this.title_3rd,
            like_count: 1
          })

          cy.multiLikes({
            blog_title: this.title_2nd,
            like_count: 2
          })

          cy.multiLikes({
            blog_title: this.title_1st,
            like_count: 3
          })

          // The blog should be sorted in descending order
          cy.get(".blog").eq(0).should("contain", this.title_1st)
          cy.get(".blog").eq(1).should("contain", this.title_2nd)
          cy.get(".blog").eq(2).should("contain", this.title_3rd)

        })
      })
    })
  })
})