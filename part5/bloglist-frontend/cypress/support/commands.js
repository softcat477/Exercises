// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/*
Login using POST request
- bypass the login UI
*/
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:8080/api/login", {
    username: "wakuwaku",
    pwd: "1234"
  }).then(response => {
    localStorage.setItem("loggedUser", JSON.stringify(response.body))
    cy.visit("http://localhost:3000")
  })
})

/*
Create a blog with POST request
- Expect user already logged in and store its token in localStorage
*/
Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.request({
    url: "http://localhost:8080/api/blogs",
    method: "POST",
    body: { title, author, url },
    headers: {
      "Authorization": `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })

  cy.visit("http://localhost:3000")
})