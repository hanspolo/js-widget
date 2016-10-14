# js-widget

[![Codeship Status for hanspolo/js-widget](https://codeship.com/projects/a1c8a730-7462-0134-12ca-76a75a837005/status?branch=master)](https://codeship.com/projects/179191)

## About
js-widget provides some helpful features to manage widgets in your web application.
It can be used with different template engines, even with none, with or without jQuery
and can be used as open source ([see license](#license)).

## Installation
Simply download the file from the [releases](https://github.com/hanspolo/js-widget/releases) and include it to your website with
```html
<script src="path/to/js-widget-$version{.min}.js"></script>
```

## Usage
First of all you need to create a new widget object
```javascript
my_widget = new window.JsWidget.Widget(my_engine);
```

The `my_engine` parameter should be one of the supported engines.
* When using underscore.js for your templates use `window.JsWidget.Engine.Underscore`
* when using handlebars for your templates use `window.JsWidget.Engine.Handlebars`
* when using mustache for your templates use `window.JsWidget.Engine.Mustache`
* when using jquery-templating for your templatews use `window.JsWidget.Engine.JQuery`
* if you don't want to use a template engine, use `window.JsWidget.Engine.None`

To render a template as a widget the object gives you some ways to load the content
```javascript
# You can load a template file from a path via ajax.
# before_callback and after_callback are called before and after rendering.
# The call for the template starts before the callback.
# This is the only one that needs a template engine to be loaded.
my_widget.render_template(path, before_callback, after_callback)

# The same is done by render_static_template.
# The only difference is, that it will not compile the template.
# This is helpful when using no template engine
my_widget.render_static_template(path, before_callback, after_callback)

# If you have the html code already loaded and only want to attach it to the DOM,
# you can use render_html method
my_widget.render_html(code, before_callback, after_callback)
```

After loading a template or html code into the widget,
it provides some useful methods to manage it.
```javascript
# To display the widget you can call the show method
# You can pass 2 callbacks that will be performed before and after the widget is shown
my_widget.show(before_callback, after_callback)

# The opposite is done by hide method
my_widget.hide(before_callback, after_callback)

# To get an overview of the state of your widget you can ask for its current state with
# to see if the widget is currently displayed
my_widget.is_visible()
# or to check if it is currently hidden
my_widget.is_invisible()
```

## License
This project uses the GPL-3.0 license.
Read [the license file](https://github.com/hanspolo/js-widget/blob/LICENSE.txt) for more information.
