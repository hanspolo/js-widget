window.JsWidget or= {}
window.JsWidget.EnginePresence or= []

window.JsWidget.TEMPLATE_ENGINES = ['handlebars', 'mustache', 'jquery-templating', 'underscore.js', 'none'] # Possible template engines
window.JsWidget.TEMPLATE_ENGINE = window.JsWidget.Engine.Underscore

# Check the presence of the libraries
window.JsWidget.JQUERY = if window.jQuery then true else false

if window.Handlebars then window.JsWidget.EnginePresence.push('handlebars')
if window.Mustache then window.JsWidget.EnginePresence.push('mustache')
if false then window.JsWidget.EnginePresence.push('jquery-templating')
if window._ then window.JsWidget.EnginePresence.push('underscore.js')
window.JsWidget.EnginePresence.push('none')
