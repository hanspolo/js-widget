describe('none-engine-test', function() {
  /*********************
   * Engine::None::run *
   *********************/
  it('should throw an exception if the run method is called', function() {
    e = new window.JsWidget.Engine.None();

    try {
      e.run('', {});
      expect(true).to.be.false;
    } catch(e) {
      expect(e.name === 'Can\'t render without an engine').to.be.true;
    }
  })
});
