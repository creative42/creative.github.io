describe("Page - Post 2", () => {
  beforeEach(() => {
    cy.visit("/posts/my-second-post/");   
  });

  it("displays a title in the post", () => {
    cy.get("main > h1").should("have.length", 1);   
  });

  it("displays the author, date and time to read heading", () => {  
    cy.get("main > p:nth-child(2) > time").should("have.length", 1);
  });

  it("displays the tag list", () => {
    cy.get("main > div.post-tag-list > span").should("have.length", 1);
  });

  it("displays the next post link", () => {
    cy.get("ul.postnavigation > li:nth-child(1)").should("have.length", 1);
  });

  it("displays the previous post link", () => {
    cy.get("ul.postnavigation > li:nth-child(1)").should("have.length", 1);
  });
  
  it("displays the back to main index link", () => {
    cy.get("main > a").should("have.length", 1);
  });
});
