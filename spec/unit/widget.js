describe('widget-test', function() {
  /**********************
   * Widget::is_visible *
   **********************/
  it('should return true if `is_visible` is called on a visible widget', function() {
    w = new window.JsWidget.Widget();
    w.state = 'visible';

    expect(w.is_visible()).to.be.true;
  });

  it('should return true if `is_visible` is called on a widget that is in the showing state', function() {
    w = new window.JsWidget.Widget();
    w.state = 'showing';

    expect(w.is_visible()).to.be.true;
  });

  it('should return false if `is_visible` is called on a invisible widget', function() {
    w = new window.JsWidget.Widget();
    w.state = 'invisible';

    expect(w.is_visible()).to.be.false;
  });

  it('should return true if `is_visible` is called on a widget that is in the hiding state', function() {
    w = new window.JsWidget.Widget();
    w.state = 'hiding';

    expect(w.is_visible()).to.be.false;
  });

  /************************
   * Widget::is_invisible *
   ************************/
  it('should return true if `is_invisible` is called on a invisible widget', function() {
    w = new window.JsWidget.Widget();
    w.state = 'invisible';

    expect(w.is_invisible()).to.be.true;
  });

  it('should return true if `is_invisible` is called on a widget that is in the hiding state', function() {
    w = new window.JsWidget.Widget();
    w.state = 'hiding';

    expect(w.is_invisible()).to.be.true;
  });

  it('should return false if `is_invisible` is called on a visible widget', function() {
    w = new window.JsWidget.Widget();
    w.state = 'visible';

    expect(w.is_invisible()).to.be.false;
  });

  it('should return true if `is_invisible` is called on a widget that is in the showing state', function() {
    w = new window.JsWidget.Widget();
    w.state = 'showing';

    expect(w.is_invisible()).to.be.false;
  });
});
