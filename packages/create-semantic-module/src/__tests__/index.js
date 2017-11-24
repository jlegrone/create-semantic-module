describe('create-semantic-module cli', () => {
  beforeAll(() => {
    require('../')([]);
  });

  it('does not throw an exception', () => {
    expect(true);
  });
});

describe('create-semantic-module node', () => {
  beforeAll(() => {
    require('../')();
  });

  it('does not throw an exception', () => {
    expect(true);
  });
});
