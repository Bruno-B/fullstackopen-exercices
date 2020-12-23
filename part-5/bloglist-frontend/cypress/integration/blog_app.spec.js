describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      username: "SomeUser",
      password: "SomeGoodPassword",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.contains("login").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("SomeUser");
      cy.get("#password").type("SomeGoodPassword");
      cy.get("#login-button").click();
      cy.contains("SomeUser logged in");
    });

    it("fails with incorrect credentials", function () {
      cy.get("#username").type("SomeUser");
      cy.get("#password").type("SomeIncorrectPassword");
      cy.get("#login-button").click();
      cy.contains("log in to the application");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("SomeUser");
      cy.get("#password").type("SomeGoodPassword");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.get("#new-note").click();
      cy.get("#title").type("How to test");
      cy.get("#author").type("Habibah Clarkson");
      cy.get("#url").type("www.test.com");
      cy.get("#create-button").click();
      cy.contains("How to test Habibah Clarkson");
    });
  });
});
