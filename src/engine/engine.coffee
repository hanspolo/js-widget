window.JsWidget or= {}
window.JsWidget.Engine or= {}

class window.JsWidget.Engine.Engine
  #
  constructor: (@engine_name) ->

  # Checks if the engine is currently loaded
  check_engine: =>
    if window.JsWidget.EnginePresence.indexOf(@engine_name) < 0
      throw new Error("Template Engine '#{@engine_name}' is missing. Please install the template engine you want to use and try again")

  # Runs the compilation of the template.
  # This method doesn't implement the behaviour.
  # Use one of the concrete implementations.
  run: ->
    throw new Error('Not implemented. The method `run` can\'t be called on the Engine class. Please use a concrete engine.')
