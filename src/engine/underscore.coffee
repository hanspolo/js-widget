class window.JsWidget.Engine.Underscore extends window.JsWidget.Engine.Engine
  constructor: ->
    super 'underscore.js'

  # Compiles the template with underscore
  run: (code, data) ->
    @.check_engine()
    compiled = _.template(code);
    compiled(data);
