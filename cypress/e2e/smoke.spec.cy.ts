describe("First E2E tests", () => {
  it("first some test", () => {
    cy.visit("/");
    cy.get("footer").contains("Footer");
  });

  it("should show isSuccess after submit", () => {
    cy.visit("/");
    const x = cy
      .get('[data-testid="email-newsletter-input"]')
      .type("mateusz@janowski.pl");

    cy.get('[data-testid="email-newsletter-submit"]').click();

    cy.contains("isSuccess");
  });
});
