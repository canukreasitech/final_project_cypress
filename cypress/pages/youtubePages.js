class YoutubePage {
  visit() {
    cy.visit(Cypress.env('youtubeUrl'))
  }

  goToMovies() {
    cy.contains('Movies').click()
  }

  openTrendingVideo(index = 2) {
    cy.get('ytd-video-renderer').eq(index).as('selectedVideo')

    cy.get('@selectedVideo').find('#video-title').invoke('text').as('videoTitle')
    cy.get('@selectedVideo').find('#channel-name').invoke('text').as('channelName')

    cy.get('@selectedVideo').find('a#thumbnail').click()
  }

  verifyVideo() {
    cy.get('@videoTitle').then((title) => {
      cy.get('h1.title').should('contain.text', title.trim().substring(0, 10))
    })

    cy.get('@channelName').then((channel) => {
      cy.get('#channel-name').should('contain.text', channel.trim())
    })
  }
}

module.exports = new YoutubePage()
