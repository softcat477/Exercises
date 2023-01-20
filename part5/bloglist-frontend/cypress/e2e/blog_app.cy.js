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
})