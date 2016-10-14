class window.JsWidget.Engine.Handlebars extends window.JsWidget.Engine.Engine
  constructor: ->
    super 'handlebars'

  # Compiles the template with handlebars
  run: (code, data) ->
    @.check_engine()
    template = Handlebars.compile(code)
    template(data)
