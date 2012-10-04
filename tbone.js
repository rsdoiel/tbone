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
		return s.replace(/^\s+|\s+$/g,"");
	}; /* End: Trim() */

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

	var HTML = function (config) {
		var i;
		this.label = "";
		this.content = "";
		this.attributes = "";
		
		for (i in config) {
			if (config.hasOwnProperty(i)) {
				this[i] = config[i];
			}
		}
	};

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
		} else if (typeof attributes === 'object') {
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
		} else if (typeof attributes === "string") {
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
	
	HTML.prototype.attr = function (attributes) {
		var ky, attrs = {};

		if (this.attributes) {
			attrs = this.disassembleAttributes(this.attributes);
			for (ky in attributes) {
				if (attributes.hasOwnProperty(ky)) {
					attrs[ky] = attributes[ky];
				}
			}
			this.attributes = this.assembleAttributes(attrs);
			return this;
		}
		this.attributes = this.assembleAttributes(attributes);
		return this;
	}; /* END: attr(), sets attributes */
	
	HTML.prototype.toString = function () {
		var parts = [],
			self_closing = [
				"a", "br", "link", "img", "input"
			];
		
		// self inclosing tags, e.g. <br />
		if (this.label) {
			if (self_closing.indexOf(this.label) >= 0) {
				// tags that expected content, e.g. <br />
				if (this.label) {
					parts.push('<');
					parts.push(this.label);
					if (this.attributes) {
						parts.push(" ");
						parts.push(this.attributes);
					}
					parts.push(' />');
				}
				return parts.join("");
			}
			
			// open ended tags, e.g. <p>
			// tags that expected content, e.g. <h1></h1>
			if (this.label) {
				parts.push('<');
				parts.push(this.label);
				if (this.attributes) {
					parts.push(" ");
					parts.push(this.attributes);
				}
				parts.push('>');
			}
			if (this.content) {
				parts.push(this.content);
			}
			if (this.label) {
				parts.push('</');
				parts.push(this.label);
				parts.push('>');
			}
			return parts.join("");
		}
		return this.content;
	}; /* END: toString() */


	HTML.prototype.p = function () {
		this.label = "p";
		return this;
	};

	try {
		exports.HTML = HTML;
	} catch (err) {
		// We're not in node
		global.HTML = HTML;
	}
}(this));