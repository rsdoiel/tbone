Development Notes
=================
revision 0.0.1
--------------

# Overview

tbone is a library for programitically generating HTML5 markup. It shares a common design approach between three langauges - JavaScript, PHP and Go. It was inspired by article by Jason Grosman, "Behind the Code: Avoiding Spaghetti"; http://www.npr.org/blogs/inside/2011/02/02/126312263/behind-the-code-avoiding-spaghetti-html.

# HTML elements as function calls

The approach suggested by the article is to create a series of functions which generate the HTML elements. As much as is reasonable the function parameters should be consistant between them so it is easy to remember the functions without having to resort to looking things up in documentation. The functions that generated the elements all return a string which is the formatted results of what was requested. E.g.

    H1("This is the contents of h1",{class:"example-title"});

or

    H1("This is the contents of h1", 'class="example-title"');

Both these examples should render -

    <h1 class="example-title">This is the contest of h1</a>

The function names start with a capital letter and proceed with lower case letters (E.g. a div would be Div()). The order of arguments tends to be innerHTML followed by a string or hash of the elements attributes. The advantage of using a function approach is that it avoids mismatch brackets and quotes (i.e. the compiler will probably catch those) and it allows for the opportunity to limit the mix-language coding typical in applications where the innerHTML or the attributes of the element need to be calculated.

There are a set of elements where consistant parameters didn't make sense. These are elements which never have an innerHTML (e.g. <br />, <img />, <input />). For these exceptions an adjustment in parameters was made to favor convienence.

There are cases where the element name is a reserved word or the name of a standard library function (e.g. in PHP link() is a standard library function used for creating a hard link on the file system). In these cases the function name has been prefixed with a lowercase tb (e.g. Link() becomes tbLink()).

# Utility functions

| name | description | JavaScript | Go | PHP |
| Mixin | exposes the object's functions to an external namespace | tbone.Mixin(this) | N/A | N/A |
| Trim(string) | removes preceeding and trailing spaces | tbone.trim(" this is padding with spaces ") | N/A | N/A |
| AssembleAttributes(string or key/value pairs) | Assembles the attributes for the elements. | tbone.AssembleAttributes({class : "myclass", id : "myId" }) |  - | - |


# Function element mapping

| element | JavaScript | Go | PHP |

