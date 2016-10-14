class window.JsWidget.Engine.Mustache extends window.JsWidget.Engine.Engine
  constructor: ->
    super 'mustache'

  # Compiles the template with mustache
  run: (code, data) ->
    @.check_engine()
    Mustache.render(code, data)
