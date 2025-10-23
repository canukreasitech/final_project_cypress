import dayjs from 'dayjs';


class AgodaPage {
  visit() {
    cy.visit(Cypress.env('agodaUrl'))
  }

  selectFlightTab() {
  // Tunggu dulu navbar siap
  cy.contains('Flights', { timeout: 10000 })
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })
}


  searchFlight(origin, destination) {
  // Klik tab Flights
  cy.contains('Flights', { timeout: 10000 }).click({ force: true });

  // Input asal penerbangan
  cy.get('input[placeholder*="from"], input[aria-label*="from"]', { timeout: 10000 })
    .first()
    .clear()
    .type(origin, { delay: 100 });

  // Pilih dropdown pertama untuk asal (bandara)
  cy.get('.AutocompleteList.AutocompleteSearch__AutocompleteList li', { timeout: 10000 })
    .first()
    .click({ force: true });

  // Input tujuan penerbangan
  cy.get('input[placeholder*="to"], input[aria-label*="to"]', { timeout: 10000 })
    .first()
    .clear()
    .type(destination, { delay: 100 });

  // Pilih dropdown pertama untuk tujuan (bandara)
  cy.get('.AutocompleteList.AutocompleteSearch__AutocompleteList li', { timeout: 10000 })
    .first()
    .click({ force: true });

  // Tunggu popup kalender muncul
  cy.get('.Popup.DateSelector__Popup', { timeout: 10000 }).should('be.visible');

  // Ambil tanggal besok
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const day = tomorrow.getDate();

  // Cari elemen tanggal di dalam popup (fallback jika struktur berubah)
  cy.get('.Popup.DateSelector__Popup')
    .find('[aria-label*="day"], [role="gridcell"], [class*="DayPicker"], button')
    .contains(new RegExp(`^${day}$`))
    .click({ force: true });

  // Klik tombol Search untuk cari penerbangan
  cy.get('button')
    .contains(/search/i)
    .click({ force: true });
}
selectFirstFlight() {
  // Pastikan hasil pencarian penerbangan sudah muncul
  cy.get('.GridItem__GridItemStyled-sc-3btv1u-0.fXrNCt', { timeout: 30000 })
    .should('be.visible');

  // Ambil penerbangan pertama
  cy.get('.GridItem__GridItemStyled-sc-3btv1u-0.fXrNCt')
    .first()
    .within(() => {
      // Klik tombol "Details" dulu
      cy.contains(/^details$/i, { timeout: 10000 }).click({ force: true });
    });

  // Tunggu panel detail muncul
  cy.get('button, a')
    .contains(/^select$/i, { timeout: 15000 })
    .should('be.visible');

  // Klik tombol "Select"
  cy.contains(/^select$/i).click({ force: true });
  }

  fillPassengerDetails() {

  const passenger = {
    contactFirstName: 'John',
    contactLastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '81234567890',
    gender: 'male',
    passengerFirstName: 'John',
    passengerLastName: 'Doe',
    dob: '10-10-1995',
    nationality: 'Indonesia',
    passportNumber: 'A1234567',
    passportCountry: 'Indonesia',
    passportExpiry: '10-10-2030'
  };


  cy.get('[id="contact.contactFirstName"]', { timeout: 10000 })
    .first()
    .clear()
    .type(passenger.contactFirstName);

  cy.get('input[name*="contactLast"], input[placeholder*="Last Name"]', { timeout: 10000 })
    .first()
    .clear()
    .type(passenger.contactLastName);

  cy.get('input[type="email"], input[name*="email"]', { timeout: 10000 })
    .first()
    .clear()
    .type(passenger.email);

  cy.get('[id="contact.contactPhoneNumber"]', { timeout: 10000 })
    .first()
    .clear()
    .type(passenger.phone);




  // Gender radio button (pilih yang pertama, biasanya Male)
  cy.get('input[type="radio"]', { timeout: 10000 }).first().check({ force: true });

  // First Name & Last Name
  cy.get('[id="flight.forms.i0.units.i0.passengerFirstName"]', { timeout: 10000 })
    .clear()
    .type(passenger.passengerFirstName);

  cy.get('[id="flight.forms.i0.units.i0.passengerLastName"]', { timeout: 10000 })
    .clear()
    .type(passenger.passengerLastName);

  // Date of Birth
cy.get('.a8780-box.a8780-fill-generic-base-default.a8780-text-generic-base-default[placeholder="DD"]').first()
  .type('25'); // misal input tanggal DD


cy.get('#cede65f4542b1').click();

// Pilih item pertama yang muncul di dropdown
cy.get('ul[role="listbox"] > li') // biasanya dropdown item berada di <ul> > <li>
  .first()
  .click();


cy.get('input[placeholder="YYYY"]').first().type('1999');

  // Nationality dropdown (pilih opsi pertama)
cy.get('.a8780-box.a8780-bg-generic-base-surface.a8780-border-generic-base-default')
  .first()
  .click();  // misal buka dropdown atau interaksi




}


}

module.exports = new AgodaPage()
