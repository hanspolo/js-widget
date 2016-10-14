describe('engine-test', function() {
  /***********************
   * Engine::Engine::run *
   ***********************/
  it('should throw an exception if the abstract method `run` is called', function() {
    e = new window.JsWidget.Engine.Engine();

    expect(e.run).to.throw(Error, 'Not implemented. The method `run` can\'t be called on the Engine class. Please use a concrete engine.');
  });

  /********************************
   * Engine::Engine::check_engine *
   ********************************/
  it('check_engine doesn\'t throw an exception for engine `handlebars` if handlebars is installed', function() {
    e = new window.JsWidget.Engine.Handlebars();
    window.JsWidget.EnginePresence = ['handlebars'];

    expect(e.check_engine).to.not.throw(Error);
  });

  it('check_engine throws an exception for engine `handlebars` if handlebars isn\'t installed', function() {
    e = new window.JsWidget.Engine.Handlebars();
    window.JsWidget.EnginePresence = [];

    expect(e.check_engine).to.throw(Error, 'Template Engine \'handlebars\' is missing. Please install the template engine you want to use and try again');
  });

  it('check_engine doesn\'t throw an exception for engine `jquery` if jquery-templating is installed', function() {
    e = new window.JsWidget.Engine.JQuery();
    window.JsWidget.EnginePresence = ['jquery-templating'];

    expect(e.check_engine).to.not.throw(Error);
  });

  it('check_engine throws an exception for engine `jquery` if jquery-templating isn\'t installed', function() {
    e = new window.JsWidget.Engine.JQuery();
    window.JsWidget.EnginePresence = [];

    expect(e.check_engine).to.throw(Error, 'Template Engine \'jquery-templating\' is missing. Please install the template engine you want to use and try again');
  });

  it('check_engine doesn\'t throw an exception for engine `mustache` if mustache is installed', function() {
    e = new window.JsWidget.Engine.Mustache();
    window.JsWidget.EnginePresence = ['mustache'];

    expect(e.check_engine).to.not.throw(Error);
  });

  it('check_engine throws an exception for engine `mustache` if mustache isn\'t installed', function() {
    e = new window.JsWidget.Engine.Mustache();
    window.JsWidget.EnginePresence = [];

    expect(e.check_engine).to.throw(Error, 'Template Engine \'mustache\' is missing. Please install the template engine you want to use and try again');
  });

  it('check_engine doesn\'t throw an exception for engine `underscore` if underscore.js is installed', function() {
    e = new window.JsWidget.Engine.Underscore();
    window.JsWidget.EnginePresence = ['underscore.js'];

    expect(e.check_engine).to.not.throw(Error);
  });

  it('check_engine throws an exception for engine `underscore` if underscore.js isn\'t installed', function() {
    e = new window.JsWidget.Engine.Underscore();
    window.JsWidget.EnginePresence = [];

    expect(e.check_engine).to.throw(Error, 'Template Engine \'underscore.js\' is missing. Please install the template engine you want to use and try again');
  });
});
