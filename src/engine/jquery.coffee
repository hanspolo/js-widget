class window.JsWidget.Engine.JQuery extends window.JsWidget.Engine.Engine
  constructor: ->
    super 'jquery-templating'

  # Compiles the template with jquery-templating
  run: (code, data) ->
    @.check_engine()
