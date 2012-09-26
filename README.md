tbone
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

## Folding in CSS/JS with concatination

tbone proviles a limited facility to concatinate CSS or JavaScript files.
it would then render it in-line or write out a file and include it back via
a relative link with the _.as()_.

```JavaScript
	var tbone = require("tbone");

	tbone.CSS.import("css/reset.js");
	tbone.CSS.import("css/responsive.js");
	tbone.CSS.import("css/ie-fixes.js");

	tbone.JS.import("js/jquery-1.8.0.min.js");
	tbone.JS.import("js/the-app.js");
	
	// Displaying an HTML 5 valid HTML page.
	console.log(tbone.htmlDoc(
		tbone.html(
			tbone.head(
				tbone.title("Hello World"),
				tbone.CSS.inline()
			),
			tbone.body(
				tbone.h1("Hello World"),
				tbone.JS.as("js/combined.js")	
			)
		)
	).toString());
```

## Generating self contained widgets with CSS and HTML fragments.

```JavaScript
	var tbone = require("tbone");

	tbone.CSS.import("css/reset.js");
	tbone.CSS.import("css/responsive.js");
	tbone.CSS.import("css/ie-fixes.js");

	tbone.JS.import("js/jquery-1.8.0.min.js");
	tbone.JS.import("js/the-app.js");
	
	// Displaying an HTML 5 friendly div with CSS
	// writting in-line and JS combined at bottom of div.
	console.log(tbone.widget(
			tbone.div(
				tbone.h1("Hello World"),
			),
		tbone.CSS.inline(),
		tbone.JS.as("js/combined.js")	
		)
	).toString());
```

