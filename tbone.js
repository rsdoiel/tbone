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
 * Released under the Simplified BSD License.
 * See: http://opensource.org/licenses/bsd-license.php
 *
 * Notes: runs under NodeJS, Mongo 2.2 shell and web browsers
 */
/*jslint devel: true, node: true, maxerr: 25, indent: 4,  vars: true, sloppy: true */

(function (global) {
	/**
     * trim - a convenience function to Trim the whitespace from the 
     * start and end of a string.
     * @param s - the string to Tri
     * @return a Trimmed string
     */
	var trim = function (s) {
		if (s === undefined) {
			return "";
		}
		return s.replace(/^\s+|\s+$/g, "");
	}; /* End: trim() */

	/**
     * capitalize - capitalize words delimited by a space
     * @param s - the string to capitalize
     * @param positions - one or more word positions to capitalize.
     * @return a capitalized string
     */
	var capitalize = function (s, positions) {
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
				words[i] = words[i].substr(0, 1).toUpperCase() +
					words[i].substr(1);
			}
		}
		return words.join(" ");
	}; /* End: capitalize() */

	// Extend the String object
	var HTML = String;

	// Utility functions
	HTML.prototype.trim = trim;
	HTML.prototype.capitalize = capitalize;
	
	
	/**
	 * assembleAttributes - formats a valid set of attribute strings.
	 * @param attributes - either an associative array or formatted string.
	 * @return a string representation of the attributes.
	 */
	HTML.prototype.assembleAttributes = function (attributes) {
		var attr = '', key, value;
	
		if (attributes === undefined) {
			return '';
		}
		
		if (typeof attributes === 'object') {
			for (key in attributes) {
				if (attributes.hasOwnProperty(key)) {
					if (typeof key !== "function") {
						value = attributes[key];
						if (typeof attributes[key] === 'string') {
							attr += ' ' + key + '="' + trim(attributes[key]) + '"';
						} else {
							attr += ' ' + key;
						}
					}
				}
			}
			return trim(attr);
		}
		
		if (typeof attributes === "string") {
			return trim(attributes);
		}
		throw "assembleAttributes() can't process type " + typeof attributes;
	}; /* END: assembleAttributes() */

	/**
     * disassembleAttributes - parse an attribute string (e.g. 
     * 'class="myclass" id="fred"') into an associative array
     * @param attributes_string - a list of attributes in string form.
     * @return an object representation of the attributes
     */
	HTML.prototype.disassembleAttributes = function (attributes_string) {
		var in_quote = false,
			key = false,
			key_start = 0,
			value_start = 0,
			value = 0,
			attributes = {},
			pos = 0,
			chr = ' ',
			str;
			
		if (typeof attributes_string !== "string") {
			throw "disassembleAttributes() requires a string.";
		}

		str = trim(attributes_string);
		for (pos = 0; pos < str.length; pos += 1) {
			chr = str.substr(pos, 1);
			if (in_quote) {
				// Have we exited quote
				if (chr === in_quote) {
					attributes[key] = str.substr(value_start,
						pos - value_start);
					in_quote = false;
					value = 0;
					key = false;
					key_start = pos + 1;
				} else if (chr === '\\' &&
                        str.substr(pos + 1, 1) === in_quote) {
					pos += 1;
				}
			} else if (chr === '"' || chr === "'") {
				in_quote = chr;
				value_start = pos + 1;
			} else if (chr === '=') {
				key = trim(str.substr(key_start, pos - key_start));
			}
		}
		return attributes;
	}; /* END: disassembleAttributes() */
	
	
    // assembleTag - given a label, some content and attributes
    // assemble an HTML tag as a string.
    // @param label - the tag to assemble (e.g. "div")
    // @param content - a string of content to wrap in the tag
    // @param attributes - a string of attributes to use in opening of the tag
    // @return string
    HTML.prototype.assembleTag = function (label, content, attributes) {
        var parts = [],
			self_closing = [
				"br", "link", "img", "input"
			];
		
		if (typeof content === "object" &&
				typeof content.join === "function") {
			content = content.join("");
		}
		// self inclosing tags, e.g. <br />
		if (label) {
			if (self_closing.indexOf(label) >= 0) {
				// tags that expected content, e.g. <br />
				if (label) {
					parts.push('<');
					parts.push(label);
					if (attributes) {
						parts.push(" ");
						parts.push(attributes);
					}
					parts.push(' />');
				}
				return parts.join("");
			}
			
			if (label === "html") {
				parts.push("<!DOCTYPE html>\n");
			}
			// open ended tags, e.g. <p>
			// tags that expected content, e.g. <h1></h1>
			parts.push('<');
			parts.push(label);
			if (attributes) {
				parts.push(" ");
				parts.push(attributes);
			}
			parts.push('>');
			if (content) {
				parts.push(content);
			}
			parts.push('</');
			parts.push(label);
			parts.push('>');
			return parts.join("");
		}
    
        return content;
    }; /* END: assembleTag() */

	/**
	 * attr - Given some HTML markup, add attributes
	 * and return as a string.
	 * @param attributes - an object or string of attributes
	 * @return string
	 */
    HTML.prototype.attr = function (attributes) {
    	var src = this.toString().replace(/<!DOCTYPE html>\n/, ''),
    		label,
    		content = "",
    		attrs,
    		start, end,
    		toks;

    	// Find the label
    	start = src.match(/<\w+/);
    	label = (start[0]).substr(1);

    	// Check if we're in a self-closing tag
    	if (src.substr(-2) !== "/>") {
			// Now parse for content
			start = src.indexOf('>') + 1;
			end = src.lastIndexOf('<');
			if (start <= end) {
				end = end - start;
				content = src.substr(start, end);
			}
    	}
    	if (typeof attributes === "object") {
			attrs = this.assembleAttributes(attributes);
    	} else {
    		attrs = attributes;
    	}
    	return this.assembleTag(label, content, attrs);
    };

    // Generate a html tag
	HTML.prototype.html = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("html", args, "");
	};

    // Generate a head tag
	HTML.prototype.head = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("head", args, "");
	};

    // Generate a meta tag
	HTML.prototype.meta = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("meta", args, "");
	};

    // Generate a title tag
	HTML.prototype.title = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("title", args, "");
	};

    // Generate a body tag
	HTML.prototype.body = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("body", args, "");
	};

    // Generate a div tag
	HTML.prototype.div = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("div", args, "");
	};

    // Generate a span tag
	HTML.prototype.span = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("span", args, "");
	};

    // Generate a h1 tag
	HTML.prototype.h1 = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("h1", args, "");
	};

    // Generate a h2 tag
	HTML.prototype.h2 = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("h2", args, "");
	};

    // Generate a h3 tag
	HTML.prototype.h3 = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("h3", args, "");
	};

    // Generate a h4 tag
	HTML.prototype.h4 = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("h4", args, "");
	};

    // Generate a h5 tag
	HTML.prototype.h5 = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("h5", args, "");
	};

    // Generate a h6 tag
	HTML.prototype.h6 = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("h6", args, "");
	};

	// Generate a p tag
	HTML.prototype.p = function () {
		var args = Array.prototype.slice.call(arguments);
		if (args.length === 0) {
			return '<p>';
		}
		return this.assembleTag("p", args, "");
	};

	// Generate a br tag
	HTML.prototype.br = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("br", args, "");
	};

	// Generate a link tag
	HTML.prototype.link = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("link", args, "");
	};

	// Generate an anchor tag
	HTML.prototype.a = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("a", args, "");
	};

	// Generate a ul tag
	HTML.prototype.ul = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("ul", args, "");
	};

	// Generate a ol tag
	HTML.prototype.ol = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("ol", args, "");
	};

	// Generate a li tag
	HTML.prototype.li = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("li", args, "");
	};

	// Generate a dl tag
	HTML.prototype.dl = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("dl", args, "");
	};

	// Generate a dt tag
	HTML.prototype.dt = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("dt", args, "");
	};

	// Generate a dd tag
	HTML.prototype.dd = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("dd", args, "");
	};

	// Generate a table tag
	HTML.prototype.table = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("table", args, "");
	};

	// Generate a tr tag
	HTML.prototype.tr = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("tr", args, "");
	};

	// Generate a td tag
	HTML.prototype.td = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("td", args, "");
	};

	// Generate a form tag
	HTML.prototype.form = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("form", args, "");
	};

	// Generate a input tag
	HTML.prototype.input = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("input", args, "");
	};

	// Generate a select tag
	HTML.prototype.select = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("select", args, "");
	};

	// Generate a option tag
	HTML.prototype.option = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("option", args, "");
	};

	// Generate a label tag
	HTML.prototype.label = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("label", args, "");
	};

	// Generate a header tag
	HTML.prototype.header = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("header", args, "");
	};

	// Generate a footer tag
	HTML.prototype.footer = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("footer", args, "");
	};

	var CSS = String;
	var JS = String;

	try {
		exports.HTML = HTML;
		exports.CSS = CSS;
		exports.JS = JS;
	} catch (err) {
		// Toto, I don't think we're not in Node any more
	}
	global.TBone = {
		HTML: HTML,
		CSS: CSS,
		JS: JS
	};
}(this));