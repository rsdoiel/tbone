/**
 * bones.js - a simple library for assembling valid HTML content
 *
 * Inspiration "Behind the Code: Avoiding Spaghetti" by Jason Grosman
 * http://www.npr.org/blogs/inside/2011/02/02/126312263/behind-the-code-avoiding-spaghetti-html
 *
 * HTML markup reference was http://en.wikipedia.org/wiki/HTML_element#HTML401
 *
 * author R. S. Doiel, <rsdoiel@gmail.com>
 *
 * copyright (c) 2011 all rights reserved
 *
 * Notes: this should work in the browser or under NodeJS, test-bones.js is designed to run under NodeJS
 */

/**
 * trim - a convenience function to trim the whitespace from the 
 * start and end of a string.
 * @param s - the string to trim
 * @return a trimmed string
 */
trim = function (s) {
  return s.replace(/\s+$/,'').replace(/^\s+/,'');
};

/**
 * assemble_attributes - formats a valid set of attribute strings.
 * @param attributes - either an associative array or formatted string.
 * @return a string representation of the attributes.
 */
assemble_attributes = function (attributes) {
  if (attributes == undefined) {
    return '';
  } else if (typeof attributes === 'object') {
    var attr = '';
    for (key in attributes) {
      value = attributes[key];
      if (attributes[key] !== null) {
        attr += ' ' + key + '="' + trim(attributes[key]) + '"';
      } else {
        attr += ' ' + key;
      }
    }
    return ' ' + trim(attr);
  } else {
    return ' ' + trim(attributes);
  }
}; /* END: assemble_attributes() */

/**
 * Html - for the outer HTML and Doctype wrapper for an HTML page.
 * @param innerHTML - usually a head and body tag with their contents.
 * @param attributes - usually something like lange="en"
 * @return a string representation of the HTML page.
 */
Html = function (innerHTML, attributes) {
  if (attributes === undefined) {
    attributes = 'lang="en"';
  }
  return '<!DOCTYPE html>' + "\n" +
  '<html' + assemble_attributes(attributes) + '>' + "\n" + innerHTML + '</html>';
}; /* END: Html() */

/**
 * Head - render a html head element.
 * @param innerHTML - the contents of head tag
 * @param attributes - e.g. a key/value pair of attribute name and value or string like class="myclass"
 * @return a string representation of the head block
 */
Head = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<head' + assemble_attributes(attributes) + '>' + "\n" + innerHTML + '</head>' + "\n";
};

/**
 * Title - render an html title element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
Title = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<title' + assemble_attributes(attributes) + '>' + innerHTML + '</title>';
};

/**
 * Link - an html link element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
Link = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<link' + assemble_attributes(attributes) + ' />';
};

/**
 * Body - render an html body element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
Body = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<body' + assemble_attributes(attributes) + '>' + "\n" + innerHTML + '</body>';
};

/**
 * H1 - render an html h1 element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
H1 = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<h1' + assemble_attributes(attributes) + '>' + innerHTML + '</h1>';
};

/**
 * H2 - render an html h2 element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
H2 = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<h2' + assemble_attributes(attributes) + '>' + innerHTML + '</h2>';
};

/**
 * H3 - render an html h3 element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
H3 = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<h3' + assemble_attributes(attributes) + '>' + innerHTML + '</h3>';
};

/**
 * H4 - render an html h4 element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
H4 = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<h4' + assemble_attributes(attributes) + '>' + innerHTML + '</h4>';
};

/**
 * H5 - render an html h5 element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
H5 = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<h5' + assemble_attributes(attributes) + '>' + innerHTML + '</h5>';
};

/**
 * H6 - render an html h6 element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
H6 = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<h6' + assemble_attributes(attributes) + '>' + innerHTML + '</h6>';
};

/**
 * P - render an html paragraph element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
P = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    return '<p' + assemble_attributes(attributes) + '>';
  } else {
    return '<p' + assemble_attributes(attributes) + '>' + innerHTML + '</p>';
  }
};

/**
 * A - render an html anchor element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
A = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<a' + assemble_attributes(attributes) + '>' + innerHTML + '</a>';
};

/**
 * Ul - render an html un-order list element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
Ul = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<ul' + assemble_attributes(attributes) + '>' + innerHTML + '</ul>';
};


/**
 * Ol - render an html order list element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
Ol = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<ol' + assemble_attributes(attributes) + '>' + innerHTML + '</ol>';
};

/**
 * Li - render an html list item element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
Li = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<li' + assemble_attributes(attributes) + '>' + innerHTML + '</li>';
};

/**
 * Dl - render an html definition list element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
Dl = function (innerHTML, attributes) { 
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<dl' + assemble_attributes(attributes) + '>' + innerHTML + '</dl>';
};

/**
 * Dt - render an html definition term element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
Dt = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<dt' + assemble_attributes(attributes) + '>' + innerHTML + '</dt>';
};

/**
 * Dd - render an html data definition element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
Dd = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<dd' + assemble_attributes(attributes) + '>' + innerHTML + '</dd>';
};

/**
 * Table - render an html a table element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
Table = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<table' + assemble_attributes(attributes) + '>' + innerHTML + '</table>';
};

/**
 * Th - render an html table header element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
Th = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<th' + assemble_attributes(attributes) + '>' + 
	  innerHTML + '</th>';
};

/**
 * Tr - render an html table row element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
Tr = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<tr' + assemble_attributes(attributes) + '>' + 
	  innerHTML + '</tr>';
};

/**
 * Td - render an html table data element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
Td = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<td' + assemble_attributes(attributes) + '>' + innerHTML + '</td>';
};

/**
 * Form - render an html form element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
Form = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<form' + assemble_attributes(attributes) + '>' + innerHTML + '</form>';
};

/**
 * Input - render an html input element
 * @param name - the name of the input field
 * @param value - the default value of the input field
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
Input = function (name, value, attributes) {
  if (name === undefined) {
    name = '';
  }
  if (value === undefined) {
    value = '';
  }
  return '<input name="' + name + '" value="' + value + '"' + assemble_attributes(attributes) + ' />';
};

/**
 * TextArea - render an html textarea element
 * @param name - the name of a textarea
 * @param value - the default value of the textarea
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
TextArea = function (name, value, attributes) {
  if (value === undefined) {
    value = '';
  }
  return '<textarea name="' + name + '"' + assemble_attributes(attributes) + '>' + value + '</textarea>';
};

/**
 * Select - an html select element
 * @param name - name of the select element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
Select = function (name, innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  if (name === undefined) {
    name = '';
  }
  return '<select name="' + name + '"' + assemble_attributes(attributes) + '>' + innerHTML + '</select>';
};

/**
 * Option - an html option element
 * @param value - a value for the element
 * @param label - for the option
 * @return a string representation of the element
 */
Option = function (value, label, attributes) {
  if (value === undefined) {
    value = '';
  }
  if (label === undefined) {
    label = '';
  }
  return '<option value="' + value + '"' + assemble_attributes(attributes) + '>' + label + '</option>';
};

/**
 * Label - an html label element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
Label = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<label' + assemble_attributes(attributes) + '>' + innerHTML + '</label>';
};

/**
 * Script - an html script element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
Script = function (url, code, attributes) {
  if (url !== undefined) {
    return '<script type="JavaScript" rel="text/javascript" src="' + url + '"' + assemble_attributes(attributes) + '></script>';
  } else {
    return '<script type="JavaScript" rel="text/javascript"' + assemble_attributes(attributes) + '>' + code + '</script>';
  }
};

/**
 * Pre - an html pre element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
Pre = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<pre' + assemble_attributes(attributes) + '>' + innerHTML + '</pre>';
};

/**
 * DemoCode - an html composite of code and pre tags
 * @param innerHTML - the contents of tag
 * @param attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
DemoCode = function (code_source, attributes) {
  if (code_source === undefined) {
    code_source = '';
  }
  return '<code' + assemble_attributes(attributes) + '>' + Pre( "\n" + code_source + "\n") + '</code>';
};

/**
 * Div - an html div element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
Div = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<div' + assemble_attributes(attributes) + '>' + innerHTML + '</div>';
};

/**
 * Span - an html span element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
Span = function (innerHTML, attributes) {
  if (innerHTML === undefined) {
    innerHTML = '';
  }
  return '<span' + assemble_attributes(attributes) + '>' + innerHTML + '</span>';
};


// Defined some exports if running under NodeJS
(function () {
	try {
		exports.trim = trim;
		exports.assemble_attributes = assemble_attributes;
		exports.Html = Html;
		exports.Head = Head;
		exports.Title = Title;
		exports.Link = Link;
		exports.Body = Body;
		exports.H1 = H1;
		exports.H2 = H2;
		exports.H3 = H3;
		exports.H4 = H4;
		exports.H5 = H5;
		exports.H6 = H6;
		exports.P = P;
		exports.A = A;
		exports.Ul = Ul;
		exports.Ol = Ol;
		exports.Li = Li;
		exports.Dl = Dl;
		exports.Dt = Dt;
		exports.Dd = Dd;
		exports.Table = Table;
		exports.Th = Th;
		exports.Tr = Tr;
		exports.Td = Td;
		exports.Form = Form;
		exports.Input = Input;
		exports.TextArea = TextArea;
		exports.Select = Select;
		exports.Option = Option;
		exports.Label = Label;
		exports.Script = Script;
		exports.Pre = Pre;
		exports.DemoCode = DemoCode;
		exports.Div = Div;
		exports.Span = Span;
	} catch(err) {
		// Skip since we're not running NodeJS
	}
})();
