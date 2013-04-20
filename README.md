[![build status](https://secure.travis-ci.org/rsdoiel/tbone.png)](http://travis-ci.org/rsdoiel/tbone)
TBone
=====

TBone is an small JavaScript library for generating valid HTML. It is based
on an article by Jason Grosman, ["Behind the Code: Avoiding Spaghetti"](http://www.npr.org/blogs/inside/2011/02/02/126312263/behind-the-code-avoiding-spaghetti-html). As of version 0.2.x it has been re-written
as a YUI module (mostly so I can learn YUI's toolchain :-)

# Examples

## NodeJS/Mongo Shell example

### sample-0.js

```JavaScript
    var YUI = require("yui").YUI;

    YUI().use("tbone", function (Y) {
	    var TBone = Y.TBone,
		    markup = new TBone.HTML();

	    // Displaying an HTML 5 valid HTML page.
	    Y.log(markup.html(
		    markup.head(
			    markup.title("Hello World")
		    ),
		    markup.body(
			    markup.h1("Hello World")
		    )
	    ));
    });
```

### sample-1.js

```JavaScript
    YUI().use("tbone", function (Y) {
	    var TBone = Y.TBone,
		    markup = new TBone.HTML();
	
	    //
	    // Generate a simple HTML page.
	    //
	    var markup = new TBone.HTML(),
		    page_source = tbone.html(
			    markup.head(
				    "<!-- Test comment -->",
                    markup.title("Simple 0")
			    ),
			    markup.body(
				    markup.h1("Sample 0"),
				    markup.p("Hello World")
			    )
		    );
	
	    // Display it
	    Y.log(page_source);
    });
```

## sample-2.js

```JavaScript
    YUI().use("tbone", function (Y) {
        var TBone = require("tbone");

        //
        // Generate a simple HTML page.
        //
        var markup = new TBone.HTML(),
	        page_source = markup.html(
		        markup.head(
			        markup.title("Simple 1")
		        ),
		        markup.body(
			        markup.h1("Sample 1").attr({"class": "banner"}),
			        markup.p("Hello Again World").attr({"class": "content"})
		        )
	        );

        // Display it
        Y.log(page_source);
```

