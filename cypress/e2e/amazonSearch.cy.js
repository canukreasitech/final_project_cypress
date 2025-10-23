import amazonPages from '../pages/amazonPages'
import AmazonPage from '../pages/amazonPages'

describe('E2E Amazon Search', () => {
  it('should search item and verify highest price item', () => {
    AmazonPage.visit()
    AmazonPage.searchItem('chair')
    AmazonPage.sortByHighPrice()
    AmazonPage.selectRightmostItem()
    AmazonPage.captureNameAndPrice()
    AmazonPage.openSelectedItem()
    AmazonPage.openSelectedItem()

  })
})
