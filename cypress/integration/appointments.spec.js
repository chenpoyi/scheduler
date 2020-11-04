describe("Appointments", () => {
  beforeEach(() => {
    //Reset test database
    cy.request("GET", "/api/debug/reset")
    //Visit the root page
    cy.visit("/");
    //Look for Monday DayListItem
    cy.contains("Monday");
   });

  it("should book an interview", () => {
    
    //Look for Add button and click
    cy.get("[alt=Add]")
      .first()
      .click();
    //Look for input field and type name
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    //Cl;ick interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click();
    //Save button 
    cy.contains("Save")
      .click();
    //Check for booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer"); 
    
  });

  it("should edit an interview", () => {
    // Clicks the edit button for the existing appointment
    cy.get("[alt=Edit]")
      .first()
      .click({force: true});
    // Changes the name and interviewer
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Paul Chen");
    cy.get("[alt='Tori Malcolm']").click();

    // Clicks the save button
    cy.contains("Save")
      .click();
    // Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Paul Chen");
    cy.contains(".appointment__card--show", "Tori Malcolm"); 
  });

  it("should cancel an interview", () => {
    // Clicks the delete button for the existing appointment
    cy.get("[alt=Delete]")
      .first()
      .click({force: true});
    // Clicks the confirm button
    cy.contains("Confirm")
      .first()
      .click({force: true});
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    // Sees that the appointment slot is empty
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  });
});
