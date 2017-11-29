describe('Timeout', function () {
  beforeEach(function () {
    this.timeout = new Timeout();
    this.triggered = false;
  });

  afterEach(function () {
    this.timeout.clear();
  });

  it('should export class', function () {
    assert.ok(Timeout instanceof Function);
  });

  it('should resolve after required ms', function () {
    this.timeout.set(50).then(() => this.triggered = true);
    return Promise.all([
      sleep(45).then(() => assert.equal(this.triggered, false)),
      sleep(55).then(() => assert.equal(this.triggered, true)),
    ]);
  });

  it('should reject after delay if message is defined', function () {
    return this.timeout.set(50, 'Timeout')
      .then(
        () => assert.fail('should throw'),
        e => assert.equal(e.message, 'Timeout')
      );
  });

  it('should clear timeout', function () {
    this.timeout.set(50).then(() => this.triggered = true);
    sleep(20).then(() => this.timeout.clear());
    return sleep(60).then(() => assert.equal(this.triggered, false));
  });

  it('should re-set timeout', function () {
    this.timeout.set(50).then(() => this.triggered = true);
    this.timeout.set(20).then(() => this.triggered = true);
    return sleep(30).then(() => assert.equal(this.triggered, true));
  });
});
