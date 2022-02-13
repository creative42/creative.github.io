describe("Page - Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("has the correct headline", () => {
    cy.contains("h1", "Welcome!");
  });

  it("contains the right number of nav links in header", () => {
    cy.get("ul > li.nav-item").should("have.length", 5);
  });

  it("displays the correct number of posts on the index page", () => {
    cy.get("main > div.card-grid > div").should("have.length", 3);
  });

  it("displays page 1 of 2 of posts on the index page", () => {
    cy.contains("main > h2", "Latest Posts - Page 1 of 2");
  });

  it("footer contains correct social media items", () => {
    cy.get("footer > div.social > a").should("have.length", 3);
  });

  it("footer contains copyright statement", () => {
    cy.get("div.copyright > p:nth-child(1)").should("have.length", 1);
  });

  it("footer contains the GitHub star count", () => {
    cy.get("div.copyright > p:nth-child(2)").should("have.length", 1);
  });
});
  