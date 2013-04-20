
# Someday maybe

These are explorations which may someday be implemented in TBone.

## 2013-04-20

Since TBone is largely superceded by some very convient template engines
(e.g. Mustache and Handlebars) it is worth thinking about larger semantic
elements combined with integration IO to APIs to assemble useful semantic
blocks. It should support not just the Microformat 2.0 spec but also allow
useful namespacing of CSS attributes.



## Folding in CSS/JS with concatenation

TBone provides a limited facility to concatenate CSS or JavaScript files. Both
have three methods - include(), inline() and as().

```JavaScript
	var fs = require("fs");

	var tbone = require("tbone"),
		html = new tbone.HTML(),
		css = new tbone.CSS({
			fs: fs
		}),
		js = new tbone.JS({
			fs: fs
		});

	css.include("style", "css/reset.js");
	css.include("style", "css/responsive.js");
	css.include("style", "css/ie-fixes.js");

	js.include("base", "js/jquery-1.8.0.min.js");
	js.include("base", "js/the-app.js");
	// Write the file to disc
	js.as("base", "js/combined.js");
	
	// Displaying an HTML 5 valid HTML page.
	console.log(
		html.html(
			html.head(
				html.title("Hello World"),
				html.style(css.inline("style"))
			),
			html.body(
				html.h1("Hello World"),
				html.script().attr({src: "js/combined.js"})
			)
		)
	);
```

## Generating self contained widgets with CSS and HTML fragments.

```JavaScript
	var tbone = require("tbone"),
		html = new tbone.HTML(),
		css = new tbone.CSS(),
		js = new tbone.JS();

	css.include("style", "css/reset.js");
	css.include("style", "css/responsive.js");
	css.include("style", "css/ie-fixes.js");

	js.include("base", "js/jquery-1.8.0.min.js");
	js.include("base", "js/the-app.js");

	// Displaying an HTML 5 friendly div with CSS
	// writing in-line and JS combined at bottom of div.
	console.log(
		html.widget(
			html.div(
				html.h1("Hello World"),
			),
			html.CSS.inline(),
			html.JS.inline("base")
		)
	);
```

