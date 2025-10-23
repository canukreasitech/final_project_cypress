import AgodaPage from '../pages/agodaPages'

describe('E2E Agoda Flight Booking', () => {
  it('should book a flight and verify details', () => {
    AgodaPage.visit()
    AgodaPage.selectFlightTab()
    AgodaPage.searchFlight('Jakarta', 'Singapore')
    AgodaPage.selectFirstFlight()
    AgodaPage.fillPassengerDetails()
  })
})
