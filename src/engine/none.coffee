class window.JsWidget.Engine.None extends window.JsWidget.Engine.Engine
  constructor: ->
    super 'none'

  # When no engine is used, it can't compile the template.
  # This implementation throws an exception.
  run: (code, data) ->
    throw {
      name: 'Can\'t render without an engine',
      message: 'Your widget uses the NoneEngine, which means, that no template engine can be used by this widget'
    }
