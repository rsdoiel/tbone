/**
 * tbone is a simple library for assembling valid HTML. It is available in
 * three languages - Go, JavaScript and PHP.
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
 * Released under New the BSD License.
 * See: http://opensource.org/licenses/bsd-license.php
 *
 */
 
const TBONE_VERSION = "0.0.3e";

var tbone = {
	/**
	 * Mixin - attach the tbone functions to an object.
	 * @params self - the object to have the functions attached to.
	 * If self is undefined Mixin turns into a Factory object.
	 */
	Mixin : function (self) {
		var ky;

		if (self === undefined) {
			var self = {};
		}
		for (ky in this) {
			if (typeof this[ky] === 'function' && 
				ky !== "Mixin") {
				if (self[ky] === undefined) {
					self[ky] = this[ky];
				} else {
					self["tb" + ky] = this[ky];
				}
			}
		}
		return self;
	}, /* End: Mixin() */

	/**
	 * Trim - a convenience function to Trim the whitespace from the 
	 * start and end of a string.
	 * @param s - the string to Trim
	 * @return a Trimmed string
	 */
	Trim : function (s) {
		return s.replace(/\s+$/,'').replace(/^\s+/,'');
	}, /* End: Trim() */

	/**
	 * Capitalize - capitalize words delimited by a space
	 * @param s - the string to capitalize
	 * @param positions - one or more word positions to capitalize.
	 * @return a capitalized string
	 */
	Capitalize : function (s, positions) {
		var i, p, words = s.split(" ");

		if (positions === undefined) {
			positions = [];
			for (i = 0; i < words.length; i += 1) {
				positions.push(i);
			}
		} else if (typeof positions === 'number') {
			p = positions;
			positions = [];
			positions.push(p);
		}
		
		for (p = 0; p < positions.length; p += 1) {
			i = positions[p];
			if (words[i] !== undefined) {
				words[i] = words[i].substr(0,1).toUpperCase() + words[i].substr(1);
			}
		}
		return words.join(" ");
	}, /* End: Capitalize() */
	
	/**
	 * AssembleAttributes - formats a valid set of attribute strings.
	 * @param attributes - either an associative array or formatted string.
	 * @return a string representation of the attributes.
	 */
	AssembleAttributes : function (attributes) {
		var attr = '', key, value;

		if (attributes === undefined) {
			return '';
		} else if (typeof attributes === 'object') {
			for (key in attributes) {
                if (typeof key !== "function") {
					value = attributes[key];
				    if (typeof attributes[key] === 'string') {
					    attr += ' ' + key + '="' + this.Trim(attributes[key]) + '"';
				    } else {
					    attr += ' ' + key;
				    }
                }
			}
			return ' ' + this.Trim(attr);
		} else {
			return ' ' + this.Trim(attributes);
		}
	}, /* END: AssembleAttributes() */

	/**
	 * DisassembleAttributes - parse an attribute string (e.g. 'class="myclass" id="fred"') into an associative array.
	 * @param attributes_string - a list of attributes in string form.
	 * @return an object representation of the attributes.
	 */
	DisassembleAttributes : function (attributes_string) {
		var in_quote = false,
			key = false,
			key_start = 0,
			value_start = 0,
			attributes = {}, 
            pos = 0, 
            chr = ' ', 
            str = this.Trim(attributes_string);

		for(pos = 0; pos < str.Length; pos += 1) {
			chr = str.substr(pos, 1);
			if (in_quote) {
				// Have we exited quote
				if (chr == in_quote) {
					attributes[key] = str.substr(value_start, pos - value_start);
					in_quote = false;
					value = 0;
					key = false;
					key_start = pos + 1;
				} else if (chr == '\\' && str.substr(pos + 1, 1) == in_quote) {
					pos += 1;
				}
			} else if (chr == '"' || chr == "'") {
				in_quote = chr;
				value_start = pos + 1;
			} else if (chr == '=') {
				key = this.Trim(str.substr(key_start, pos - key_start));
			}
		}
		return attributes;
	}, /* END: DisassembleAttributes() */
	
	/**
	 * Html - for the outer HTML and Doctype wrapper for an HTML page.
	 * @param innerHTML - usually a head and body tag with their contents.
	 * @param attributes - usually something like lange="en"
	 * @return a string representation of the HTML page.
	 */
	Html : function (innerHTML, attributes) {
		if (attributes === undefined) {
			attributes = 'lang="en"';
		}
		return '<!DOCTYPE html>' + "\n" +
		'<html' + this.AssembleAttributes(attributes) + '>' + "\n" + innerHTML + '</html>';
	}, /* END: Html() */
	
	/**
	 * Head - render a html head element.
	 * @param innerHTML - the contents of head tag
	 * @param attributes - e.g. a key/value pair of attribute name and value or string like class="myclass"
	 * @return a string representation of the head block
	 */
	Head : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<head' + this.AssembleAttributes(attributes) + '>' + "\n" + innerHTML + '</head>' + "\n";
	}, /* END: Head() */
	
	/**
	 * Title - render an html title element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Title : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<title' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</title>';
	},
	
	/**
	 * Link - an html link element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Link : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<link' + this.AssembleAttributes(attributes) + ' />';
	},
	
	/**
	 * Body - render an html body element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Body : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<body' + this.AssembleAttributes(attributes) + '>' + "\n" + innerHTML + '</body>';
	},
	
	/**
	 * H1 - render an html h1 element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	H1 : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<h1' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</h1>';
	},
	
	/**
	 * H2 - render an html h2 element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	H2 : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<h2' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</h2>';
	},
	
	/**
	 * H3 - render an html h3 element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	H3 : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<h3' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</h3>';
	},
	
	/**
	 * H4 - render an html h4 element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	H4 : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<h4' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</h4>';
	},
	
	/**
	 * H5 - render an html h5 element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	H5 : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<h5' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</h5>';
	},
	
	/**
	 * H6 - render an html h6 element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	H6 : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<h6' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</h6>';
	},
	
	/**
	 * P - render an html paragraph element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	P : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			return '<p' + this.AssembleAttributes(attributes) + '>';
		} else {
			return '<p' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</p>';
		}
	},
	
	/**
	 * A - render an html anchor element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	A : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		if (typeof attributes === "string" && attributes.indexOf("=") < 0) {
			attributes = {'href' : attributes};			
		}
		return this.Trim('<a' + this.AssembleAttributes(attributes)) + '>' + innerHTML + '</a>';
	},
	
	/**
	 * Ul - render an html un-order list element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Ul : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<ul' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</ul>';
	},
	
	
	/**
	 * Ol - render an html order list element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Ol : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<ol' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</ol>';
	},
	
	/**
	 * Li - render an html list item element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Li : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<li' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</li>';
	},
	
	/**
	 * Dl - render an html definition list element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Dl : function (innerHTML, attributes) { 
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<dl' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</dl>';
	},
	
	/**
	 * Dt - render an html definition term element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Dt : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<dt' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</dt>';
	},
	
	/**
	 * Dd - render an html definition defined element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Dd : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<dd' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</dd>';
	},
	
	/**
	 * Table - render an html a table element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Table : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<table' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</table>';
	},
	
	/**
	 * Th - render an html table header element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Th : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<th' + this.AssembleAttributes(attributes) + '>' + 
			innerHTML + '</th>';
	},
	
	/**
	 * Tr - render an html table row element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Tr : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<tr' + this.AssembleAttributes(attributes) + '>' + 
			innerHTML + '</tr>';
	},
	
	/**
	 * Td - render an html table data element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Td : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<td' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</td>';
	},
	
	/**
	 * Form - render an html form element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Form : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<form' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</form>';
	},
	
	/**
	 * Input - render an html input element
	 * @param name - the name of the input field
	 * @param value - the default value of the input field
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Input : function (name, value, attributes) {
		if (name === undefined) {
			name = '';
		}
		if (value === undefined) {
			value = '';
		}
		return '<input name="' + name + '" value="' + value + '"' + this.AssembleAttributes(attributes) + ' />';
	},
	
	/**
	 * Button - create an input button 
	 * @param name - the name of the button
	 * @param value - the value of the button
	 * @attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Button : function (name, value, attributes) {
		var attr = this.DisassembleAttributes(this.AssembleAttributes(attributes));
		attr.type = 'button';
		return this.Input(name, value, attr);
	},
	
	/**
	 * Textarea - render an html textarea element
	 * @param name - the name of a textarea
	 * @param value - the default value of the textarea
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Textarea : function (name, value, attributes) {
		if (value === undefined) {
			value = '';
		}
		return '<textarea name="' + name + '"' + this.AssembleAttributes(attributes) + '>' + value + '</textarea>';
	},
	
	/**
	 * Select - an html select element
	 * @param name - name of the select element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Select : function (name, innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		if (name === undefined) {
			name = '';
		}
		return '<select name="' + name + '"' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</select>';
	},
	
	/**
	 * Option - an html option element
	 * @param value - a value for the element
	 * @param label - for the option
	 * @return a string representation of the element
	 */
	Option : function (value, label, attributes) {
		if (value === undefined) {
			value = '';
		}
		if (label === undefined) {
			label = '';
		}
		return '<option value="' + value + '"' + this.AssembleAttributes(attributes) + '>' + label + '</option>';
	},
	
	/**
	 * Label - an html label element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or hash of key/values representing attributes
	 * @return a string representation of the element
	 */
	Label : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<label' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</label>';
	},
	
	/**
	 * Script - an html script element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or hash of key/values representing attributes
	 * @return a string representation of the element
	 */
	Script : function (url, code, attributes) {
		if (url !== undefined) {
			return '<script type="JavaScript" rel="text/javascript" src="' + url + '"' + this.AssembleAttributes(attributes) + '></script>';
		} else {
			return '<script type="JavaScript" rel="text/javascript"' + this.AssembleAttributes(attributes) + '>' + code + '</script>';
		}
	},
	
	/**
	 * Pre - an html pre element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or hash of key/values representing attributes
	 * @return a string representation of the element
	 */
	Pre : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<pre' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</pre>';
	},
	
	/**
	 * DemoCode - an html composite of code and pre tags
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or hash of key/values representing attributes
	 * @return a string representation of the element
	 */
	DemoCode : function (code_source, attributes) {
		if (code_source === undefined) {
			code_source = '';
		}
		return '<code' + this.AssembleAttributes(attributes) + '>' + Pre( "\n" + code_source + "\n") + '</code>';
	},
	
	/**
	 * Div - an html div element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or hash of key/values representing attributes
	 * @return a string representation of the element
	 */
	Div : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<div' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</div>';
	},
	
	/**
	 * Span - an html span element
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or hash of key/values representing attributes
	 * @return a string representation of the element
	 */
	Span : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<span' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</span>';
	},

	/**
	 * Menu - an HTML5 Menu element
	 * @param label
	 * @param innerHTML
	 * @param attributes
	 * @return a string representation of the element
	 */
	Menu : function (label, innerHTML, attributes) {
		return '<menu label="' + label + '"' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</menu>';
	},
	
	/**
	 * Img - image element
	 * @param src
	 * @param attributes
	 * @return a string representation of the element
	 */
	Img : function (src, attributes) {
		return '<img src="' + src + '"' + this.AssembleAttributes(attributes) + '/>';
	},
	
	/**
	 * Center - render a center tag
	 * @param innerHTML - the contents of tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Center : function (innerHTML, attributes) {
		if (innerHTML === undefined) {
			innerHTML = '';
		}
		return '<center' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</center>';
	},

	/**
	 * Br - render a br tag
	 * @param attributes - a string or object of key/values representing attributes
	 * @return a string representation of the element
	 */
	Br : function (innerHTML, attributes) {
		return '<br' + this.AssembleAttributes(attributes) + '/>';
	},

    /**
     * Base - render a base element
     * @param $href - the base URL for the page.
     * @param attributes - optional, other attributes to put into tag
     * @return a string representation of the element
     */
    Base : function (href, attributes) {
        if (attributes === undefined) {
            attributes = [];
        } else if (typeof attributes === "string") {
	        attributes = this.DisassembleAttributes(attributes);
        }
        attributes.href = href;
        return '<base' + this.AssembleAttributes(attributes) + ' />';
    }, /* END: Base() */
	
    /**
     * Meta - render a meta tag from a list of key/value pairs
     * @param attributes - a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Meta : function (attributes) {
        if (attributes === undefined) {
            attributes = {};
        }
        return '<meta' + this.AssembleAttributes(attributes) + ' />';
    }, /* END: Meta() */

    /**
     * Object - render an object element
     * @param innerHTML - the contents of tag
     * @param attributes - a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Object : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<object' + attributes + '>' + innerHTML + '</object>';
    }, /* END: Object() */
	
    /**
     * Style - render a style element
     * @param $CSS - the CSS you want to include in the style element.
     * @param attributes - optional, other attributes to put into tag
     * @return a string representation of the element
     */
    Style : function (CSS, attributes ) {
        if (CSS === undefined) {
            CSS = '';
        }
        if (attributes === undefined) {
	        attributes = [];
        } else if (is_string(attributes)) {
            attributes = DisassembleAttributes(attributes);
        }
        attributes.type = 'text/css';
        return '<style' + this.AssembleAttributes(attributes) + '>' + CSS + '</style>';
    }, /* END: Style() */

    /**
     * Col - render a col element
     * @param innerHTML - the contents of tag
     * @param attributes - a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Col : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<col' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</col>';
    }, /* END: Col() */

    /**
     * Colgroup - render a colgroup element
     * @param innerHTML - the contents of tag
     * @param attributes - a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Colgroup : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<colgroup' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</colgroup>';
    }, /* END: Colgroup() */

    /**
     * THead - render a caption element
     * @param innerHTML - the contents of tag
     * @param attributes - a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    THead : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<thead' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</thead>';
    }, /* END: THead() */
	
    /**
     * TBody - render a caption element
     * @param innerHTML - the contents of tag
     * @param attributes - a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    TBody : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<tbody' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</tbody>';
    }, /* END: TBody() */

    /**
     * TFoot - render a caption element
     * @param innerHTML - the contents of tag
     * @param attributes - a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    TFoot : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<tfoot' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</tfoot>';
    }, /* END: TFoot() */

    /**
     * optgroup - identifies a group of options in a select list.
     * @param innerHTML - the contents of tag
     * @param attributes - a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Optgroup : function Optgroup (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<optgroup' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</optgroup>';
    }, /* END: Optgroup() */
	
    /**
     * Fieldset - a fieldset element
     * @param innerHTML - the contents of tag
     * @param attributes - a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Fieldset : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<fieldset' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</fieldset>';
    }, /* END: Fieldset() */
	
    /**
     * Legend - a legend fieldset element
     * @param innerHTML - the contents of tag
     * @param attributes - a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Legend : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<legend' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</legend>';
    }, /* END: Legend() */

    /**
     * NoScript - replacement content for scripts
     * @param innerHTML - the contents of tag
     * @param attributes - a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    NoScript : function (innerHTML, attributes ) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<noscript' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</noscript>';
    }, /* END: NoScript() */
	
    /**
     * address - address block
     * @param innerHTML - the contents of tag
     * @param attributes - a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Address : function (innerHTML, attributes ) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<address' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</address>';
    }, /* END: Address() */

    /**
     * blockquote
     * @param innerHTML - the contents of tag
     * @param attributes - a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Blockquote : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<blockquote' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</blockquote>';
    }, /* END: Blockquote() */

    /**
     * del - Marks a deleted section of content
     * @param innerHTML - the contents of tag
     * @param attributes - a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Del : function (innerHTML) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<del' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</del>';
    }, /* END: Del() */

    /**
     * hr - horizontal rule
     * @param attributes - a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Hr : function (attributes ) {
        return '<hr' + this.AssembleAttributes(attributes) + ' />';
    }, /* END: Hr() */
	
    /**
     * Ins - insert content
     * @param innerHTML - the contents of tag
     * @param attributes - a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Ins : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<ins' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</ins>';
    }, /* END: Ins() */

    /**
     * Abbr - Marks an abbreviation, and can make the full form available.
     * @param abbreviation - the abbreviated form (e.g. W3C)
     * @param full_form - the long form (e.g. World Wide Web Consortium)
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Abbr : function (abbreviation, full_form, attributes ) {
        if (abbreviation === undefined) {
            abbreviation = '';
        }
	if (full_form === undefined) {
		full_form = '';
	}
        if (attributes === undefined) {
            attributes = [];
        } else if (is_string(attributes)) {
            attributes = this.DisassembleAttributes(attributes);
        }
        attributes.title = full_form;
        return '<abbr' + this.AssembleAttributes(attributes) + '>' + abbreviation + '</abbr>';
    }, /* END: Abbr() */
	
    /**
     * Acronym - acronym element.
     * @param $acronym - the short form (e.g. HTML)
     * @param $full_form - the long form (e.g. Hyper Text Markup Language)
     * @param attributes - (optional) a string or hash of key/values representing attributes 
     * @return a string representation of the element
     */
    Acronym : function (acronym, full_form, attributes ) {
        if (acronym === undefined) {
            acronym = '';
        }
        if (attributes === undefined) {
            attributes = [];
        } else if (is_string(attributes)) {
            attributes = this.DisassembleAttributes(attributes);
        }
        attributes.title = full_form;
        return '<acronym' + this.AssembleAttributes(attributes) + '>' + acronym + '</acronym>';
    }, /* END: Acronym() */

    /**
     * Dfn - an in-line definition element
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes 
     * @return a string representation of the element
     */
    Dfn : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<dfn' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</dfn>';
    }, /* END: Dfn() */
	
    /**
     * Em - an emphasis element
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes 
     * @return a string representation of the element
     */
    Em : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<em' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</em>';
    }, /* END: Em() */
	
    /**
     * Strong - a strong element
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes 
     * @return a string representation of the element
     */
    Strong : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<strong' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</strong>';
    }, /* END: Strong() */
	
    /**
     * Code - an code element
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Code : function (innerHTML, attributes ) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<code' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</code>';
    }, /* END: Code() */

    /**
     * Samp - a sample output element
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Samp : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<samp' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</samp>';
    }, /* END: Samp() */
	
    /**
     * Kbr - a "text to be entered by the user" element
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Kbr : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<kbr' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</kbr>';
    }, /* END: Kbr() */
	
    /**
     * B - a bold element. Sets font to boldface where possible.
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    B : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<b' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</b>';
    }, /* END: B() */
	
    /**
     * I - a intalics element. Sets font to italic where possible.
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    I : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<i' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</i>';
    }, /* END: I() */
	
    /**
     * Big - a big element. Increases font size (bigger text).
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Big : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<big' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</big>';
    }, /* END: Big() */
	
    /**
     * Small - a small element. Decreases font size (smaller text).
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Small : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<small' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</small>';
    }, /* END: Small() */
	
    /**
     * Sub - a subscript element.
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Sub : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<sub' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</sub>';
    }, /* END: Sub() */
	
    /**
     * Sup - a super script element.
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Sup : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<sup' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</sup>';
    }, /* END: Sup() */
	
    /**
     * Tt - a teletype element. Fixed-width font (typewriter-like)
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Tt : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<tt' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</tt>';
    }, /* END: Tt() */
	
    /**
     * Bdo - a bdo element. Marks an inline section of text in which 
     * the reading direction is the opposite from that of the parent element.
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Bdo : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<bdo' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</bdo>';
    }, /* END: Bdo() */
	
    /**
     * Cite - an html span element
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Cite : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<cite'.this.AssembleAttributes(attributes) + '>' + innerHTML + '</ >';
    }, /* END: Cite() */
	
    /**
     * Q - an in-line quotation element
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Q : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<q' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</q>';
    }, /* END: Q() */
	
    /**
     * Area - an area element
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Area : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<area' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</area>';
    }, /* END: Area() */
	
    /**
     * Map - a map element
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Map : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
    	return '<map' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</map>';
    }, /* END: Map() */
	
    /**
     * Frame - render a frame element
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Frame : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<frame'.this.AssembleAttributes(attributes) + '>' + innerHTML + '</frame>';
    }, /* END: Frame() */
	
    /**
     * NoFrame - render a noframe element
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    NoFrame : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<noframe'.this.AssembleAttributes(attributes) + '>' + innerHTML + '</noframe>';
    }, /* END: NoFrame() */
	
    /**
     * IFrame - render a frame element
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    IFrame: function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<iframe'.this.AssembleAttributes(attributes) + '>' + innerHTML + '</iframe>';
    }, /* END: IFrame() */
	
    /**
     * HGroup - an hgroup element
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    HGroup : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<hgroup' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</hgroup>';
    }, /* END: HGroup() */

    /**
     * Header - a header element
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Header : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<header' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</header>';
    }, /* END: Header() */

    /**
     * Footer- a footer element
     * @param innerHTML - the contents of tag
     * @param attributes - (optional) a string or hash of key/values representing attributes
     * @return a string representation of the element
     */
    Footer : function (innerHTML, attributes) {
        if (innerHTML === undefined) {
            innerHTML = '';
        }
        return '<footer' + this.AssembleAttributes(attributes) + '>' + innerHTML + '</footer>';
    }, /* END: Footer() */
}; /* END: tbone definition */


//
// fromHtmlEntities(), toHtmlEntities() are content normalization
// methods to improve the quality of the tbone output
//
// References notes were
// See: http://theorem.ca/~mvcorks/code/charsets/latin1.html
// See: http://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references

var sbquo = '&sbquo;',
	cc_sbquo = String.fromCharCode(8218),
	sbquo_encodings = [
		// iso-8859-1
		String.fromCharCode(130),
		'&#130;',
		// html entity
		cc_sbquo,
		'&#8218;',
		sbquo
	].join("|"),
	re_sbquo = new RegExp(sbquo_encodings, 'g'),

	bdquo = '&bdquo;',
	cc_bdquo = String.fromCharCode(8222),
	bdquo_encodings = [
		// iso-8859-1
		String.fromCharCode(132),
		'&#132;',
		// html entity
		cc_bdquo,
		'&#8222;',
		bdquo
	].join("|"),
	re_bdquo = new RegExp(bdquo_encodings, 'g'),

	hellip = '&hellip;',
	cc_hellip = String.fromCharCode(8230),
	hellip_encodings = [
		// iso-8859-1
		String.fromCharCode(133),
		'&#133;',
		// html entity
		cc_hellip,
		'&#8230;',
		hellip
	].join("|"),
	re_hellip = new RegExp(hellip_encodings, 'g'),

	dagger = '&dagger;',
	cc_dagger = String.fromCharCode(8224),
	dagger_encodings = [
		// iso-8859-1
		String.fromCharCode(134),
		'&#134;',
		// html entity
		cc_dagger,
		'&#8224;',
		dagger
	].join("|"),
	re_dagger = new RegExp(dagger_encodings, 'g'),

	Dagger = '&Dagger;',
	cc_Dagger = String.fromCharCode(8225),
	Dagger_encodings = [
		// iso-8859-1
		String.fromCharCode(135),
		'&#135;',
		// html entity
		cc_Dagger,
		'&#8225;',
		Dagger
	].join("|"),
	re_Dagger = new RegExp(Dagger_encodings, 'g'),

	// standard quotes
	quot = '&quot;',
	cc_quot = String.fromCharCode(34),
	quot_encodings = [
		'&#34;',
		'&amp;quot;',
		// cc_quot not included because of role in HTML markup
		quot
	].join("|"),
	re_quot = new RegExp(quot_encodings, 'g'),

	apos = '&apos;',
	cc_apos = String.fromCharCode(39),
	apos_encodings = [
		'&amp;apos;',
		// cc_apos not included because of role in HTML markup
		'&#39;',
		apos
	].join("|"),
	re_apos = new RegExp(apos_encodings, "g"),
	
	acute = '&acute;',
	cc_acute = String.fromCharCode(180),
	acute_encodings = [
		'&#180;',
		cc_acute,
		acute
	].join("|"),
	re_acute = new RegExp(acute_encodings, "g"),

	// Left single quotes
	lsquo = '&lsquo;',
	cc_lsquo = String.fromCharCode(8216),
	lsquo_encodings = [
		// single quote in iso-8856-1
		String.fromCharCode(145),
		// html entity
		cc_lsquo,
		'&#145;',
		'&#8216;',
		lsquo
	].join("|"),
	re_lsquo = new RegExp(lsquo_encodings, 'g'),

	// Right Single Quotes
	rsquo = '&rsquo;',
	cc_rsquo = String.fromCharCode(8217)
	rsquo_encodings = [
		// single quote in iso-8856-1
		String.fromCharCode(146),
		// html entity
		cc_rsquo,
		'&#146;',
		'&#8217;',
		rsquo
	].join("|"),
	re_rsquo = new RegExp(rsquo_encodings, 'g'),
	
	// double quotes in iso-8856-1
	ldquo = '&ldquo;',
	cc_ldquo = String.fromCharCode(8220),
	ldquo_encodings = [
		// double quote in iso-8856-1
		String.fromCharCode(147),
		// html entity
		cc_ldquo,
		'&#147;',
		'&#8220;',
		ldquo
	].join("|"),
	re_ldquo = new RegExp(ldquo_encodings, 'g'),
	
	laquo = '&laquo;',
	cc_laquo = String.fromCharCode(171),
	laquo_encodings = [
		// iso-8859-1
		String.fromCharCode(171),
		// html entity
		laquo
	].join("|"),
	re_laquo = new RegExp(laquo_encodings, 'g'), 

	raquo = '&raquo;',
	cc_raquo = String.fromCharCode(187),
	raquo_encodings = [
		// iso-8859-1
		String.fromCharCode(187),
		// html entity
		raquo
	].join("|"),
	re_raquo = new RegExp(raquo_encodings, 'g'), 

	rdquo = '&rdquo;',
	cc_rdquo = String.fromCharCode(8221),
	rdquo_encodings = [
		// double quote in iso-8856-1
		String.fromCharCode(148),
		'&#148;',
		// html entity
		cc_rdquo,
		'&#8221;',
		rdquo
	].join("|"),
	re_rdquo = new RegExp(rdquo_encodings, 'g'),

	bull = '&bull;',
	cc_bull = String.fromCharCode(149),
	bull_encodings = [
		cc_bull,
		'&#149;',
		bull
	].join("|"),
	re_bull = new RegExp(bull_encodings, 'g'),

	ndash = '&ndash;',
	cc_ndash = String.fromCharCode(8211),
	ndash_encodings = [
		String.fromCharCode(150),
		'&#150;',
		cc_ndash,
		'&#8211;',
		ndash
	].join("|"),
	re_ndash = new RegExp(ndash_encodings, 'g'),

	mdash = '&mdash;',
	cc_mdash = String.fromCharCode(8212),
	mdash_encodings = [
		// iso-8859-1
		String.fromCharCode(151),
		String.fromCharCode(226),
		'&#151;',
		'&#226;',
		cc_mdash,
		'&#8212;',
		mdash
	].join("|"),
	re_mdash = new RegExp(mdash_encodings, 'g'),

	copyright_mark = '&copy;',
	cc_copyright_mark = String.fromCharCode(169),
	copy_encodings = [
		cc_copyright_mark,
		'&#169;',
		copyright_mark
	].join("|"),
	re_copy = new RegExp(copy_encodings, 'g'),
	
	nbsp = '&nbsp;',
	cc_nbsp = String.fromCharCode(160),
	nbsp_encodings = [
		cc_nbsp,
		'&#160;',
		nbsp
	].join("|"),
	re_nbsp = new RegExp(nbsp_encodings, 'g'),

	// A new line variants
	NewLine = '&NewLine;',
	cc_NewLine = "\n",
	new_line_encodings = [
		"\n", "\r", "\f",
		String.fromCharCode(10), 
		String.fromCharCode(8232),
		//String.fromCharCode(65533),
		NewLine
	].join("|"),
	re_NewLine = new RegExp(new_line_encodings, 'g');

	

toHtml5Entities = function (s) {
	return s.replace(re_NewLine, NewLine).replace(re_quot, quot).replace(re_apos, apos).replace(re_acute, acute).replace(re_sbquo, sbquo).replace(re_bdquo, bdquo).replace(re_hellip, hellip).replace(re_dagger, dagger).replace(re_Dagger, Dagger).replace(re_lsquo, lsquo).replace(re_rsquo, rsquo).replace(re_ldquo, ldquo).replace(re_rdquo, rdquo).replace(re_bull, bull).replace(re_ndash, ndash).replace(re_mdash, mdash).replace(re_copy, copyright_mark).replace(re_nbsp, nbsp).replace(re_laquo, laquo).replace(re_raquo, raquo);
};

fromHtml5Entities = function (s) {
	return s.replace(re_NewLine, cc_NewLine).replace(re_quot,  cc_quot).replace(re_apos, cc_apos).replace(re_acute, cc_acute).replace(re_sbquo, cc_sbquo).replace(re_bdquo, cc_bdquo).replace(re_hellip, cc_hellip).replace(re_dagger, cc_dagger).replace(re_Dagger, cc_Dagger).replace(re_lsquo, cc_lsquo).replace(re_rsquo, cc_rsquo).replace(re_ldquo, cc_ldquo).replace(re_rdquo, cc_rdquo).replace(re_bull, cc_bull).replace(re_ndash, cc_ndash).replace(re_mdash, cc_mdash).replace(re_copy, cc_copyright_mark).replace(re_nbsp, cc_nbsp).replace(re_laquo, cc_laquo).replace(re_raquo, cc_raquo);
};

stripFontTags = function (s) {
	var reFontTag = new RegExp(
		'(<font(\ |\\\\+|[a-z]+|[A-Z]+|=|,|[0-9]|\"|-|#)+>|</font>|<font>)',
		'gi'
	);

	return s.replace(reFontTag,'');
};

// Defined some exports if running under NodeJS
try {
	if (exports !== undefined) {
		exports.Mixin = tbone.Mixin;
		exports.Trim = tbone.Trim;
		exports.Capitalize = tbone.Capitalize;
		exports.AssembleAttributes = tbone.AssembleAttributes;
		exports.Html = tbone.Html;
		exports.Head = tbone.Head;
		exports.Title = tbone.Title;
		exports.Link = tbone.Link;
		exports.Body = tbone.Body;
		exports.Header = tbone.Header;
		exports.Footer = tbone.Footer;
		exports.H1 = tbone.H1;
		exports.H2 = tbone.H2;
		exports.H3 = tbone.H3;
		exports.H4 = tbone.H4;
		exports.H5 = tbone.H5;
		exports.H6 = tbone.H6;
		exports.P = tbone.P;
		exports.Br = tbone.Br;
		exports.A = tbone.A;
		exports.Ul = tbone.Ul;
		exports.Ol = tbone.Ol;
		exports.Li = tbone.Li;
		exports.Dl = tbone.Dl;
		exports.Dt = tbone.Dt;
		exports.Dd = tbone.Dd;
		exports.Table = tbone.Table;
		exports.Th = tbone.Th;
		exports.Tr = tbone.Tr;
		exports.Td = tbone.Td;
		exports.Form = tbone.Form;
		exports.Input = tbone.Input;
		exports.Textarea = tbone.Textarea;
		exports.Select = tbone.Select;
		exports.Option = tbone.Option;
		exports.Label = tbone.Label;
		exports.Script = tbone.Script;
		exports.Pre = tbone.Pre;
		exports.DemoCode = tbone.DemoCode;
		exports.Div = tbone.Div;
		exports.Span = tbone.Span;
		exports.Menu = tbone.Menu;
		exports.Img = tbone.Img;
		exports.Center = tbone.Center;
        exports.Base = tbone.Base;
        exports.Meta = tbone.Meta;
        exports.Object = tbone.Object;
        exports.Style = tbone.Style;
        exports.Col = tbone.Col;
        exports.Colgroup = tbone.Colgroup;
        exports.THead = tbone.THead;
        exports.TBody = tbone.TBody;
        exports.TFoot = tbone.TFoot;
        exports.Optgroup = tbone.Optgroup;
        exports.Fieldset = tbone.Fieldset;
        exports.Legend = tbone.Legend;
        exports.NoScript = tbone.NoScript;
        exports.Address = tbone.Address;
        exports.Blockquote = tbone.Blockquote;
        exports.Del = tbone.Del;
        exports.Hr = tbone.Hr;
        exports.Ins = tbone.Ins;
        exports.Abbr = tbone.Abbr;
        exports.Acronym = tbone.Acronym;
        exports.Dfn = tbone.Dfn;
        exports.Em = tbone.Em;
        exports.Strong = tbone.Strong;
        exports.Code = tbone.Code;
        exports.Samp = tbone.Samp;
        exports.Kbr = tbone.Kbr;
        exports.B = tbone.B;
        exports.I = tbone.I;
        exports.Big = tbone.Big;
        exports.Small = tbone.Small;
        exports.Sub = tbone.Sub;
        exports.Sup = tbone.Sup;
        exports.Tt = tbone.Tt;
        exports.Bdo = tbone.Bdo;
        exports.Cite = tbone.Cite;
        exports.Q = tbone.Q;
        exports.Area = tbone.Area;
        exports.Map = tbone.Map;
        exports.Frame = tbone.Frame;
        exports.NoFrame = tbone.NoFrame;
        exports.IFrame = tbone.IFrame;
        exports.HGroup = tbone.HGroup;
        
        // Markup normalization methods
        exports.fromHtml5Entities = fromHtml5Entities;
        exports.toHtml5Entities = toHtml5Entities;
        exports.stripFontTags = stripFontTags;
        
	} // END: defining exports
} catch(err) {
	// Ignore if exports not supported. E.g. in the browser
};
