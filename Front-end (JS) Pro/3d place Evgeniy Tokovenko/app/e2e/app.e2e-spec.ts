import { PrepearPage } from './app.po';

describe('prepear App', () => {
  let page: PrepearPage;

  beforeEach(() => {
    page = new PrepearPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
