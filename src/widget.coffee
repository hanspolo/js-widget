window.JsWidget or= {}

# The widget main class.
# All interaction with the widget is implemented here.
class window.JsWidget.Widget
  constructor: (@engine, @data) ->
    # Generate unique id
    @id = 'jsw-' + (Math.random() * Math.pow(36,4) << 0).toString(36)
    @data or= {}
    @state = 'invisible'

  # Renders the content of a template and appends it to the DOM
  render_template: (path, before_callback = undefined, after_callback = undefined) ->
    @.remove_widget_if_existing()
    @.load_template_file path, (tmpl) =>
      if before_callback then before_callback(@id, tmpl, @data)
      @.attach_widget(@engine.run(tmpl))
      if after_callback then after_callback(@id)

  # Loads the content of a template and calls render_html
  render_static_template: (path, before_callback = undefined, after_callback = undefined) ->
    @.remove_widget_if_existing()
    @.load_template_file path, (tmpl) =>
      @.render_html(tmpl, before_callback, after_callback)

  # Append the code to the DOM
  render_html: (code, before_callback, after_callback) ->
    @.remove_widget_if_existing()
    if before_callback then before_callback(@id, tmpl, @data)
    @.attach_widget(code)
    if after_callback then after_callback(@id)

  # Add the actual code for the widget to the DOM
  attach_widget: (code) ->
    if window.JsWidget.JQUERY
      $('body').append($("<div id=#{@id} style=display:none>").append(code))
    else
      body = document.getElementsByTagName('body')
      body.innerHTML = body.innerHTML + "<div id=#{@id} style=\"display:none\">#{code}</div>"

  # Removes the html from the DOM, if the widget already exists
  remove_widget_if_existing: ->
    if window.JsWidget.JQUERY and $("##{@id}").length > 0
      $("##{@id}").detach() # TODO: Check for correct method to remove an element
      true
    # TODO: Implement else branch

  # Load a template file from the given path via ajax
  load_template_file: (path, callback) ->
    if window.JsWidget.JQUERY
      $.ajax(path).done(callback)
    else
      xhttp = new XMLHttpRequest
      xhttp.onreadystatechange = ->
        if this.readyState is 4 and this.status is 200
          callback(this.responseText)
      xhttp.open("GET", "ajax_info.txt", true)
      xhttp.send()

  # Shows the widget
  show: (before_callback, after_callback) ->
    if @.is_visible() then return null
    if before_callback then before_callback(@id)
    try
      @state = 'showing'
      if window.JsWidget.JQUERY
        $("##{@id}").show =>
          @state = 'visible'
      else
        document.getElementById(@id).style.display = 'block'
        @state = 'visible'
    catch error
      @state = 'invisible'
    finally
      if after_callback then after_callback(@id, error)


  # Hide the widget
  hide: (before_callback, after_callback) ->
    if @.is_invisible() then return null
    if before_callback then before_callback(@id)
    try
      @state = 'hiding'
      if window.JsWidget.JQUERY
        $("##{@id}").hide =>
          @state = 'invisible'
      else
        document.getElementById(@id).style.display = 'none'
        @state = 'invisible'
    catch error
      @state = 'visible'
    finally
      if after_callback then after_callback(@id, error)

  # Returns true if the widget is visible or it is on its way to become visible
  # Returns false if not
  is_visible: ->
    this.state is 'visible' or this.state is 'showing'

  # Returns true if the widget is invisible or it started hiding
  # Returns false if not
  is_invisible: ->
    this.state is 'invisible' or this.state is 'hiding'
