import { browser, element, by } from 'protractor';

export class Ng2AdminLTEPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('blogs h1')).getText();
  }
}
