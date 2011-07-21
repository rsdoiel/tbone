Development Notes
=================
revision 0.0.2
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
| Mixin | exposes the object's functions to an external namespace | Mixin(this) | N/A | N/A |
| Trim(string) | removes preceeding and trailing spaces | trim(" this is padding with spaces ") | N/A | N/A |
| AssembleAttributes(string or key/value pairs) | Assembles the attributes for the elements. | AssembleAttributes({class : "myclass", id : "myId" }) |  - | - |


# Function element mapping

Notes: innerHTML is any text to be place inside the tags while attributes can be either a string version of an elements attributes (e.g. 'class="footer"') or key/value pairs (e.g. an Object in JavaScript, associative array in PHP). If an attribute takes no arguments then pass it a null value. Usually innerHTML and attributes can be ommit if not needed.

| element | JavaScript | Go | PHP |
| Html | Html(innerHTML, attributes) | - | Html($innerHTML, $attributes) |
| Head | Head(innerHTML, attributes) | - | Head($innerHTML, $attributes) |
| Title | Title(innerHTML, attributes) | - | Title($innerHTML, $attributes) |
| Link | Link(attributes) | - | tbLink($attributes) |
| Body | Body(innerHTML, attributes) | - | Body($innerHTML, $attributes) |
| H1 | H1(innerHTML, attributes) | - | H1($innerHTML, $attributes) |
| H2 | H2(innerHTML, attributes) | - | H2($innerHTML, $attributes) |
| H3 | H3(innerHTML, attributes) | - | H3() |
| H4 | H4(innerHTML, attributes) | - | H4() |
| H5 | H5(innerHTML, attributes) | - | H5() |
| H6 | H6(innerHTML, attributes) | - | H6() |
| P | P(innerHTML, attributes) | - | P() |
| Br | Br() | - | Br() |
| A | A(innerHTML, attributes) OR A(innerHTML, href) | - | A() |
| Ul | Ul(innerHTML, attributes) | - | Ul() |
| Ol | Ol(innerHTML, attributes) | - | - |
| Li | Li(innerHTML, attributes) | - | - |
| Dl | Dl(innerHTML, attributes) | - | - |
| Dt | Dt(innerHTML, attributes) | - | - |
| Dd | Dd(innerHTML, attributes) | - | - |
| Table | Table(innerHTML, attributes) | - | - |
| Th | Th(innerHTML, attributes) | - | - |
| Tr | Tr(innerHTML, attributes) | - | - |
| Td | Td(innerHTML, attributes) | - | - |
| Form | Form(innerHTML, attributes) | - | - |
| Input | Input(name, value, attributes) | - | - |
| Textarea | Textarea(name, value, attributes) | - | - |
| Select | Select(innerHTML, attributes) | - | - |
| Option | Option(value, label) | - | - |
| Label | Label(innerHTML, attributes) | - | - |
| Script | Script(innerHTML, attributes) | - | - |
| Pre | Pre(innerHTML, attributes) | - | - |
| DemoCode | DemoCode(innerHTML, attributes) | - | - |
| Div | Div(innerHTML, attributes) | - | - |
| Span | Span(innerHTML, attributes) | - | - |
| Menu | Menu(innerHTML, attributes) | - | - |
| Img | Img(src, attributes) | - | - |
| Center | Center(innerHTML, attributes) | - | - |
| Base | Base(innerHTML, attributes) | - | - |
| Meta | Meta(attributes) | - | - |
| Object | Object(innerHTML, attributes) | - | - |
| Style | Style(innerHTML, attributes) | - | - |
| Col | Col(innerHTML, attributes) | - | - |
| Colgroup | Colgroup(innerHTML, attributes) | - | - |
| THead | THead(innerHTML, attributes) | - | - |
| TBody | TBody(innerHTML, attributes) | - | - |
| TFoot | TFoot(innerHTML, attributes) | - | - |
| Optgroup | Optgroup(innerHTML, attributes) | - | - |
| Fieldset | Fieldset(innerHTML, attributes) | - | - |
| Legend | Legend(innerHTML, attributes) | - | - |
| NoScript | NoScript(innerHTML, attributes) | - | - |
| Address | Address(innerHTML, attributes) | - | - |
| Blockquote | Blockquote(innerHTML, attributes) | - | - |
| Del | Del(innerHTML, attributes) | - | - |
| Hr | Hr(innerHTML, attributes) | - | - |
| Ins | Ins(innerHTML, attributes) | - | - |
| Abbr | Abbr(innerHTML, attributes) | - | - |
| Acronym | Acronym(innerHTML, attributes) | - | - |
| Dfn | Dfn(innerHTML, attributes) | - | - |
| Em | Em(innerHTML, attributes) | - | - |
| Strong | Strong(innerHTML, attributes) | - | - |
| Code | Code(innerHTML, attributes) | - | - |
| Samp | Samp(innerHTML, attributes) | - | - |
| Kbr | Kbr(innerHTML, attributes) | - | - |
| B | B(innerHTML, attributes) | - | - |
| I | I(innerHTML, attributes) | - | - |
| Big | Big(innerHTML, attributes) | - | - |
| Small | Small(innerHTML, attributes) | - | - |
| Sub | Sub(innerHTML, attributes) | - | - |
| Sup | Sup(innerHTML, attributes) | - | - |
| Tt | Tt(innerHTML, attributes) | - | - |
| Br | Br(innerHTML, attributes) | - | - |
| Bdo | Bdo(innerHTML, attributes) | - | - |
| Cite | Cite(innerHTML, attributes) | - | - |
| Q | Q(innerHTML, attributes) | - | - |
| Area | Area(innerHTML, attributes) | - | - |
| Map | Map(innerHTML, attributes) | - | - |
| Frame | Frame(innerHTML, attributes) | - | Frame() |
| NoFrame | NoFrame(innerHTML, attributes) | - | NoFrame() |
| IFrame | IFrame(innerHTML, attributes) | - | IFrame() |
| HGroup | HGroup(innerHTML, attributes) | - | HGroup() |

