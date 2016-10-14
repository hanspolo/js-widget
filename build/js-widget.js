/*! js-widget-0.0.2 2016-10-14 */
(function() {
  var base,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.JsWidget || (window.JsWidget = {});

  (base = window.JsWidget).Engine || (base.Engine = {});

  window.JsWidget.Engine.Engine = (function() {
    function Engine(engine_name) {
      this.engine_name = engine_name;
      this.check_engine = bind(this.check_engine, this);
    }

    Engine.prototype.check_engine = function() {
      if (window.JsWidget.EnginePresence.indexOf(this.engine_name) < 0) {
        throw new Error("Template Engine '" + this.engine_name + "' is missing. Please install the template engine you want to use and try again");
      }
    };

    Engine.prototype.run = function() {
      throw new Error('Not implemented. The method `run` can\'t be called on the Engine class. Please use a concrete engine.');
    };

    return Engine;

  })();

  window.JsWidget.Engine.Handlebars = (function(superClass) {
    extend(Handlebars, superClass);

    function Handlebars() {
      Handlebars.__super__.constructor.call(this, 'handlebars');
    }

    Handlebars.prototype.run = function(code, data) {
      var template;
      this.check_engine();
      template = Handlebars.compile(code);
      return template(data);
    };

    return Handlebars;

  })(window.JsWidget.Engine.Engine);

  window.JsWidget.Engine.JQuery = (function(superClass) {
    extend(JQuery, superClass);

    function JQuery() {
      JQuery.__super__.constructor.call(this, 'jquery-templating');
    }

    JQuery.prototype.run = function(code, data) {
      return this.check_engine();
    };

    return JQuery;

  })(window.JsWidget.Engine.Engine);

  window.JsWidget.Engine.Mustache = (function(superClass) {
    extend(Mustache, superClass);

    function Mustache() {
      Mustache.__super__.constructor.call(this, 'mustache');
    }

    Mustache.prototype.run = function(code, data) {
      this.check_engine();
      return Mustache.render(code, data);
    };

    return Mustache;

  })(window.JsWidget.Engine.Engine);

  window.JsWidget.Engine.None = (function(superClass) {
    extend(None, superClass);

    function None() {
      None.__super__.constructor.call(this, 'none');
    }

    None.prototype.run = function(code, data) {
      throw {
        name: 'Can\'t render without an engine',
        message: 'Your widget uses the NoneEngine, which means, that no template engine can be used by this widget'
      };
    };

    return None;

  })(window.JsWidget.Engine.Engine);

  window.JsWidget.Engine.Underscore = (function(superClass) {
    extend(Underscore, superClass);

    function Underscore() {
      Underscore.__super__.constructor.call(this, 'underscore.js');
    }

    Underscore.prototype.run = function(code, data) {
      var compiled;
      this.check_engine();
      compiled = _.template(code);
      return compiled(data);
    };

    return Underscore;

  })(window.JsWidget.Engine.Engine);

}).call(this);

(function() {
  var base;

  window.JsWidget || (window.JsWidget = {});

  (base = window.JsWidget).EnginePresence || (base.EnginePresence = []);

  window.JsWidget.TEMPLATE_ENGINES = ['handlebars', 'mustache', 'jquery-templating', 'underscore.js', 'none'];

  window.JsWidget.TEMPLATE_ENGINE = window.JsWidget.Engine.Underscore;

  window.JsWidget.JQUERY = window.jQuery ? true : false;

  if (window.Handlebars) {
    window.JsWidget.EnginePresence.push('handlebars');
  }

  if (window.Mustache) {
    window.JsWidget.EnginePresence.push('mustache');
  }

  if (false) {
    window.JsWidget.EnginePresence.push('jquery-templating');
  }

  if (window._) {
    window.JsWidget.EnginePresence.push('underscore.js');
  }

  window.JsWidget.EnginePresence.push('none');

}).call(this);

(function() {
  window.JsWidget || (window.JsWidget = {});

  window.JsWidget.Widget = (function() {
    function Widget(engine, data) {
      this.engine = engine;
      this.data = data;
      this.id = 'jsw-' + (Math.random() * Math.pow(36, 4) << 0).toString(36);
      this.data || (this.data = {});
      this.state = 'invisible';
    }

    Widget.prototype.render_template = function(path, before_callback, after_callback) {
      if (before_callback == null) {
        before_callback = void 0;
      }
      if (after_callback == null) {
        after_callback = void 0;
      }
      this.remove_widget_if_existing();
      return this.load_template_file(path, (function(_this) {
        return function(tmpl) {
          if (before_callback) {
            before_callback(_this.id, tmpl, _this.data);
          }
          _this.attach_widget(_this.engine.run(tmpl));
          if (after_callback) {
            return after_callback(_this.id);
          }
        };
      })(this));
    };

    Widget.prototype.render_static_template = function(path, before_callback, after_callback) {
      if (before_callback == null) {
        before_callback = void 0;
      }
      if (after_callback == null) {
        after_callback = void 0;
      }
      this.remove_widget_if_existing();
      return this.load_template_file(path, (function(_this) {
        return function(tmpl) {
          return _this.render_html(tmpl, before_callback, after_callback);
        };
      })(this));
    };

    Widget.prototype.render_html = function(code, before_callback, after_callback) {
      this.remove_widget_if_existing();
      if (before_callback) {
        before_callback(this.id, tmpl, this.data);
      }
      this.attach_widget(code);
      if (after_callback) {
        return after_callback(this.id);
      }
    };

    Widget.prototype.attach_widget = function(code) {
      var body;
      if (window.JsWidget.JQUERY) {
        return $('body').append($("<div id=" + this.id + " style=display:none>").append(code));
      } else {
        body = document.getElementsByTagName('body');
        return body.innerHTML = body.innerHTML + ("<div id=" + this.id + " style=\"display:none\">" + code + "</div>");
      }
    };

    Widget.prototype.remove_widget_if_existing = function() {
      if (window.JsWidget.JQUERY && $("#" + this.id).length > 0) {
        $("#" + this.id).detach();
        return true;
      }
    };

    Widget.prototype.load_template_file = function(path, callback) {
      var xhttp;
      if (window.JsWidget.JQUERY) {
        return $.ajax(path).done(callback);
      } else {
        xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
            return callback(this.responseText);
          }
        };
        xhttp.open("GET", "ajax_info.txt", true);
        return xhttp.send();
      }
    };

    Widget.prototype.show = function(before_callback, after_callback) {
      var error, error1;
      if (this.is_visible()) {
        return null;
      }
      if (before_callback) {
        before_callback(this.id);
      }
      try {
        this.state = 'showing';
        if (window.JsWidget.JQUERY) {
          return $("#" + this.id).show((function(_this) {
            return function() {
              return _this.state = 'visible';
            };
          })(this));
        } else {
          document.getElementById(this.id).style.display = 'block';
          return this.state = 'visible';
        }
      } catch (error1) {
        error = error1;
        return this.state = 'invisible';
      } finally {
        if (after_callback) {
          after_callback(this.id, error);
        }
      }
    };

    Widget.prototype.hide = function(before_callback, after_callback) {
      var error, error1;
      if (this.is_invisible()) {
        return null;
      }
      if (before_callback) {
        before_callback(this.id);
      }
      try {
        this.state = 'hiding';
        if (window.JsWidget.JQUERY) {
          return $("#" + this.id).hide((function(_this) {
            return function() {
              return _this.state = 'invisible';
            };
          })(this));
        } else {
          document.getElementById(this.id).style.display = 'none';
          return this.state = 'invisible';
        }
      } catch (error1) {
        error = error1;
        return this.state = 'visible';
      } finally {
        if (after_callback) {
          after_callback(this.id, error);
        }
      }
    };

    Widget.prototype.is_visible = function() {
      return this.state === 'visible' || this.state === 'showing';
    };

    Widget.prototype.is_invisible = function() {
      return this.state === 'invisible' || this.state === 'hiding';
    };

    return Widget;

  })();

}).call(this);
