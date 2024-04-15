import { browser, by, element } from 'protractor';
import { AppPage } from './app.po';

describe('Bank App', () => {
  beforeEach(() => {
    browser.get('/');
  });

  let page: AppPage;

  it('should display title', () => {
    browser.getTitle().then((title) => {
      expect(title).toEqual('BankFront');
    });
  });

  it('should display welcome message', () => {
    page = new AppPage();
    page.navigateTo();
    page.getTitleText().then((text) => {
      expect(text).toEqual('Welcome to my-app');
    });
  });

  it('should navigate to account page', () => {
    element(by.css('a[href="/account"]')).click();
    expect(browser.getCurrentUrl()).toContain('/account');
  });

  it('should navigate to client page', () => {
    element(by.css('a[href="/client"]')).click();
    expect(browser.getCurrentUrl()).toContain('/client');
  });
});
