TBone
=====

TBone is an small JavaScript library for generating valid HTML. It is based
on an article by Jason Grosman, ["Behind the Code: Avoiding Spaghetti"](http://www.npr.org/blogs/inside/2011/02/02/126312263/behind-the-code-avoiding-spaghetti-html).

It is designed to work in NodeJS, Mongo's shell (via [mongo-modules](https://github.com/rsdoiel/mongo-modules.git)).

# Examples

## NodeJS/Mongo Shell example

```JavaScript
	var tbone = require("tbone");

	// Displaying an HTML 5 valid HTML page.
	console.log(tbone.htmlDoc(
		tbone.html(
			tbone.head(
				tbone.title("Hello World")
			),
			tbone.body(
				tbone.h1("Hello World")
			)
		)
	).toString());
```

# Coming attractions

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
		html.htmlDoc(
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
		).toString()
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
		).toString()
	);
```

