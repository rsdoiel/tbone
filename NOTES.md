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
| AssembleTag(element_name, innerHTML, attributes) | N/A | N/A | AssembleTag( string, string, map[string]string) string |


# Function element mapping

Notes: innerHTML is any text to be place inside the tags while attributes can be either a string version of an elements attributes (e.g. 'class="footer"') or key/value pairs (e.g. an Object in JavaScript, associative array in PHP). If an attribute takes no arguments then pass it a null value. Usually innerHTML and attributes can be ommit if not needed.

| element | JavaScript | Go | PHP |
| Html | Html(innerHTML, attributes) | Html(string, map[string]string) string | Html($innerHTML, $attributes) |
| Head | Head(innerHTML, attributes) | Head(string, map[string]string) string | Head($innerHTML, $attributes) |
| Title | Title(innerHTML, attributes) | Title(string, map[string]string) string | Title($innerHTML, $attributes) |
| Link | Link(attributes) | Link(string, map[string]string) string | tbLink($attributes) |
| Body | Body(innerHTML, attributes) | Body(string, map[string]string) string | Body($innerHTML, $attributes) |
| H1 | H1(innerHTML, attributes) | H1(string, map[string]string) string | H1($innerHTML, $attributes) |
| H2 | H2(innerHTML, attributes) | H2(string, map[string]string) string | H2($innerHTML, $attributes) |
| H3 | H3(innerHTML, attributes) | H3(string, map[string]string) string | H3($innerHTML, $attributes) |
| H4 | H4(innerHTML, attributes) | H4(string, map[string]string) string | H4($innerHTML, $attributes) |
| H5 | H5(innerHTML, attributes) | H5(string, map[string]string) string | H5($innerHTML, $attributes) |
| H6 | H6(innerHTML, attributes) | H6(string, map[string]string) string | H6($innerHTML, $attributes) |
| P | P(innerHTML, attributes) | P(string, map[string]string) string | P($innerHTML, $attributes) |
| Br | Br(attributes) | Br(map[string]string) string | Br($attributes) |
| A | A(innerHTML, attributes) OR A(innerHTML, href) | A(string, map[string]string) string | A($innerHTML, $attributes) OR A($innerHTML, $href) |
| Ul | Ul(innerHTML, attributes) | Ul(string, map[string]string) string | Ul($innerHTML, $attributes) |
| Ol | Ol(innerHTML, attributes) | Ol(string, map[string]string) string | Ol($innerHTML, $attributes) |
| Li | Li(innerHTML, attributes) | Li(string, map[string]string) string | Li($innerHTML, $attributes) |
| Dl | Dl(innerHTML, attributes) | Dl(string, map[string]string) string | tbDl($innerHTML, $attributes) |
| Dt | Dt(innerHTML, attributes) | Dt(string, map[string]string) string | Dt($innerHTML, $attributes) |
| Dd | Dd(innerHTML, attributes) | Dd(string, map[string]string) string | Dd($innerHTML, $attributes) |
| Table | Table(innerHTML, attributes) | Table(string, map[string]string) string | Table($innerHTML, $attributes) |
| Th | Th(innerHTML, attributes) | Th(string, map[string]string) string | Th($innerHTML, $attributes) |
| Tr | Tr(innerHTML, attributes) | Tr(string, map[string]string) string | Tr($innerHTML, $attributes) |
| Td | Td(innerHTML, attributes) | Td(string, map[string]string) string | Td($innerHTML, $attributes) |
| Form | Form(innerHTML, attributes) | Form(string, map[string]string) string | Form($innerHTML, $attributes) |
| Input | Input(name, value, attributes) | Input(string, string, map[string]string) string | Input($innerHTML, $attributes) |
| Textarea | Textarea(name, value, attributes) | Textarea(string, string, map[string]string) string | Textarea($innerHTML, $attributes) |
| Select | Select(name, attributes) | Select(string, map[string]string) string | Select($name, $attributes) |
| Option | Option(value, label) | Options(string, string, map[string]string) string | Options($value, $label) |
| Label | Label(innerHTML, attributes) | Label(string, map[string]string) string | Label($innerHTML, $attributes) |
| Script | Script(innerHTML, attributes) | Script(string, map[string]string) string | Script($innerHTML, $attributes) |
| Pre | Pre(innerHTML, attributes) | Pre(string, map[string]string) string | Pre($innerHTML, $attributes) |
| DemoCode | DemoCode(innerHTML, attributes) | DemoCode(string, map[string]string) string | DemoCode($innerHTML, $attributes) |
| Div | Div(innerHTML, attributes) | Div(string, map[string]string) string | Div($innerHTML, $attributes) |
| Span | Span(innerHTML, attributes) | Span(string, map[string]string) string | Span($innerHTML, $attributes) |
| Menu | Menu(innerHTML, attributes) | Menu(string, map[string]string) string | Menu($innerHTML, $attributes) |
| Img | Img(src, attributes) | Img(string, map[string]string) string | Img($innerHTML, $attributes) |
| Center | Center(innerHTML, attributes) | Center(string, map[string]string) string | Center($innerHTML, $attributes) |
| Base | Base(innerHTML, attributes) | Base(string, map[string]string) string | Base($innerHTML, $attributes) |
| Meta | Meta(attributes) | Meta(map[string]string) string | Meta($innerHTML, $attributes) |
| Object | tbObject(innerHTML, attributes) | Object(string, map[string]string) string | Object($innerHTML, $attributes) |
| Style | Style(innerHTML, attributes) | Style(string, map[string]string) string | Style($innerHTML, $attributes) |
| Col | Col(innerHTML, attributes) | Col(string, map[string]string) string | Col($innerHTML, $attributes) |
| Colgroup | Colgroup(innerHTML, attributes) | Colgroup(string, map[string]string) string | Colgroup($innerHTML, $attributes) |
| THead | THead(innerHTML, attributes) | THead(string, map[string]string) string | THead($innerHTML, $attributes) |
| TBody | TBody(innerHTML, attributes) | TBody(string, map[string]string) string | TBody($innerHTML, $attributes) |
| TFoot | TFoot(innerHTML, attributes) | TFoot(string, map[string]string) string | TFoot($innerHTML, $attributes) |
| Optgroup | Optgroup(innerHTML, attributes) | Optgroup(string, map[string]string) string | Optgroup($innerHTML, $attributes) |
| Fieldset | Fieldset(innerHTML, attributes) | Fieldset(string, map[string]string) string | Fieldset($innerHTML, $attributes) |
| Legend | Legend(innerHTML, attributes) | Legend(string, map[string]string) string | Legend($innerHTML, $attributes) |
| NoScript | NoScript(innerHTML, attributes) | NoScript(string, map[string]string) string | NoScript($innerHTML, $attributes) |
| Address | Address(innerHTML, attributes) | Address(string, map[string]string) string | Address($innerHTML, $attributes) |
| Blockquote | Blockquote(innerHTML, attributes) | Blockquote(string, map[string]string) string | Blockquote($innerHTML, $attributes) |
| Del | Del(innerHTML, attributes) | Del(string, map[string]string) string | Del($innerHTML, $attributes) |
| Hr | Hr(innerHTML, attributes) | Hr(string, map[string]string) string | Hr($innerHTML, $attributes) |
| Ins | Ins(innerHTML, attributes) | Ins(string, map[string]string) string | Ins($innerHTML, $attributes) |
| Abbr | Abbr(innerHTML, attributes) | Abbr(string, map[string]string) string | Abbr($innerHTML, $attributes) |
| Acronym | Acronym(innerHTML, attributes) | Acronym(string, map[string]string) string | Acronym($innerHTML, $attributes) |
| Dfn | Dfn(innerHTML, attributes) | Dfn(string, map[string]string) string | Dfn($innerHTML, $attributes) |
| Em | Em(innerHTML, attributes) | Em(string, map[string]string) string | Em($innerHTML, $attributes) |
| Strong | Strong(innerHTML, attributes) | Strong(string, map[string]string) string | Strong($innerHTML, $attributes) |
| Code | Code(innerHTML, attributes) | Code(string, map[string]string) string | Code($innerHTML, $attributes) |
| Samp | Samp(innerHTML, attributes) | Samp(string, map[string]string) string | Samp($innerHTML, $attributes) |
| Kbr | Kbr(innerHTML, attributes) | Kbr(string, map[string]string) string | Kbr($innerHTML, $attributes) |
| B | B(innerHTML, attributes) | B(string, map[string]string) string | B($innerHTML, $attributes) |
| I | I(innerHTML, attributes) | I(string, map[string]string) string | I($innerHTML, $attributes) |
| Big | Big(innerHTML, attributes) | Big(string, map[string]string) string | Big($innerHTML, $attributes) |
| Small | Small(innerHTML, attributes) | Small(string, map[string]string) string | Small($innerHTML, $attributes) |
| Sub | Sub(innerHTML, attributes) | Sub(string, map[string]string) string | Sub($innerHTML, $attributes) |
| Sup | Sup(innerHTML, attributes) | Sup(string, map[string]string) string | Sup($innerHTML, $attributes) |
| Tt | Tt(innerHTML, attributes) | Tt(string, map[string]string) string | Tt($innerHTML, $attributes) |
| Br | Br(innerHTML, attributes) | Br(string, map[string]string) string | Br($innerHTML, $attributes) |
| Bdo | Bdo(innerHTML, attributes) | Bdo(string, map[string]string) string | Bdo($innerHTML, $attributes) |
| Cite | Cite(innerHTML, attributes) | Cite(string, map[string]string) string | Cite($innerHTML, $attributes) |
| Q | Q(innerHTML, attributes) | Q(string, map[string]string) string | Q($innerHTML, $attributes) |
| Area | Area(innerHTML, attributes) | Area(string, map[string]string) string | Area($innerHTML, $attributes) |
| Map | Map(innerHTML, attributes) | Map(string, map[string]string) string | Map($innerHTML, $attributes) |
| Frame | Frame(innerHTML, attributes) | Frame(string, map[string]string) string | Frame($innerHTML, $attributes) |
| NoFrame | NoFrame(innerHTML, attributes) | NoFrame(string, map[string]string) string | NoFrame($innerHTML, $attributes) |
| IFrame | IFrame(innerHTML, attributes) | IFrame(string, map[string]string) string | IFrame($innerHTML, $attributes) |
| HGroup | HGroup(innerHTML, attributes) | HGroup(string, map[string]string) string | HGroup($innerHTML, $attributes) |

