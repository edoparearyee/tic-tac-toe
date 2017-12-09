import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  clickTile(row: number, col: number) {
    return element(by.css(`app-board .tile-${row}-${col}`)).click();
  }

  getTileText(row: number, col: number) {
    return element(by.css(`app-board .tile-${row}-${col}`)).getText();
  }

  getCurrentPlayerText() {
    return element(by.css('.player-current')).getText();
  }

  getWinnerText() {
    return element(by.css('.winner')).getText();
  }

  getDrawText() {
    return element(by.css('.draw')).getText();
  }

  reset() {
    return element(by.css('.reset')).click();
  }
}
