class AmazonPage {
  visit() {
    cy.visit(Cypress.env('amazonUrl'))
  }

  searchItem(keyword) {
    cy.get('#twotabsearchtextbox').type(`${keyword}{enter}`)
  }

  sortByHighPrice() {
    cy.get('#a-autoid-0-announce').click()
     // Pastikan dropdown muncul
    cy.get('select#s-result-sort-select', { timeout: 10000 }).should('exist').and('be.visible')

    // Pilih opsi berdasarkan value
    cy.get('select#s-result-sort-select').select('price-desc-rank', { force: true })

    // Verifikasi kalau halaman sudah reload dengan filter yang benar
    cy.url().should('include', 's=price-desc-rank')
  }

  selectRightmostItem() {
    cy.wait(3000);
    cy.get('[data-component-type="s-search-result"]')
      .not(':has([aria-label="Sponsored"])')
      .then(($items) => {
        const firstRow = $items.slice(0, 4);
        const lastItem = firstRow.last();
        cy.wrap(lastItem).as('selectedItem');
      });
  }

 captureNameAndPrice() {
  cy.get('@selectedItem')
    .scrollIntoView()
    .should('be.visible')
    .then(($item) => {
      // 🟢 Ambil nama produk - lebih fleksibel
  cy.wrap($item)
    .find('span.a-size-base-plus.a-spacing-none.a-color-base.a-text-normal, span.a-size-medium.a-color-base.a-text-normal, span.a-text-normal, h2 span, h2 a span, h2')
    .first()
    .invoke('text')
    .then((title) => {
    cy.log('Judul produk:', title.trim());
    cy.wrap(title.trim()).as('titleSearch');
  });

      // 🟡 Ambil harga produk
      cy.wrap($item)
        .find('.a-price .a-offscreen')
        .first()
        .invoke('text')
        .then((price) => {
          cy.log('Harga produk:', price.trim());
          cy.wrap(price.trim()).as('priceSearch');
        });
    });
}



  openSelectedItem() {
    cy.get('@selectedItem').find('h2 a').invoke('removeAttr', 'target').click({ force: true });
  }

  verifyNameAndPrice() {
    cy.url().should('include', '/dp/');
    cy.wait(2000);

    cy.get('#productTitle')
      .invoke('text')
      .then((titleDetail) => {
        cy.get('@titleSearch').then((titleSearch) => {
          expect(titleDetail.trim().toLowerCase()).to.include(titleSearch.trim().slice(0, 10).toLowerCase());
        });
      });

    cy.get('.a-price .a-offscreen')
      .first()
      .invoke('text')
      .then((priceDetail) => {
        cy.get('@priceSearch').then((priceSearch) => {
          const normalize = (price) => price.replace(/[^\d]/g, '').slice(0, -2);
          expect(normalize(priceDetail)).to.eq(normalize(priceSearch));
        });
      });
  }
}

module.exports = new AmazonPage()
