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
				"br", "img", "command", "hr", "meta"
			],
			open_ended = [
				"p", "area", "base", "embed", "input", "keygen", "link", "track", "wbr"
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
			if (open_ended.indexOf(label) >= 0 &&
					!content) {
				// tags that expected content, e.g. <p>
				return parts.join("");
			}
			
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
		var src = this.toString(),
			label,
			attrs;
		
		if (attributes === undefined) {
			return src;
		}

		if (typeof attributes === "object") {
			attrs = this.assembleAttributes(attributes);
		} else {
			attrs = attributes;
		}
		label = src.match(/<\w+/);
		if (!label) {
			throw "Problem adding attributes to " + src;
		}
		return src.replace(/<\w+/, label[0] + " " + attrs);
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
	
	// Generate a section tag
	HTML.prototype.section = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("section", args, "");
	};

	// Generate a nav tag
	HTML.prototype.nav = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("nav", args, "");
	};
	
	// Generate a script tag
	HTML.prototype.script = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("script", args, "");
	};

	// Generate a script tag
	HTML.prototype.style = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("style", args, "");
	};
	
	// Generate a audio tag
	HTML.prototype.audio = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("audio", args, "");
	};
	
	// Generate a video tag
	HTML.prototype.video = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("video", args, "");
	};
	
	// Generate a abbr tag
	HTML.prototype.abbr = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("abbr", args, "");
	};
	
	// Generate a address tag
	HTML.prototype.address = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("address", args, "");
	};
	
	// Generate a area tag
	HTML.prototype.area = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("area", args, "");
	};
	
	// Generate a article tag
	HTML.prototype.article = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("article", args, "");
	};
	
	// Generate a aside tag
	HTML.prototype.aside = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("aside", args, "");
	};
	
	// Generate a "b" tag
	HTML.prototype.b = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("b", args, "");
	};
	
	// Generate a base tag
	HTML.prototype.base = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("base", args, "");
	};
	
	// Generate a bdi tag
	HTML.prototype.bdi = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("bdi", args, "");
	};
	
	// Generate a bdo tag
	HTML.prototype.bdo = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("bdo", args, "");
	};
	
	// Generate a blockquote tag
	HTML.prototype.blockquote = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("blockquote", args, "");
	};
	
	// Generate a button tag
	HTML.prototype.button = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("button", args, "");
	};
	
	// Generate a canvas tag
	HTML.prototype.canvas = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("canvas", args, "");
	};
	
	// Generate a caption tag
	HTML.prototype.caption = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("caption", args, "");
	};
	
	// Generate a cite tag
	HTML.prototype.cite = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("cite", args, "");
	};
	
	// Generate a code tag
	HTML.prototype.code = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("code", args, "");
	};
	
	// Generate a col tag
	HTML.prototype.col = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("col", args, "");
	};
	
	// Generate a colgroup tag
	HTML.prototype.colgroup = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("colgroup", args, "");
	};
	
	// Generate a command tag
	HTML.prototype.command = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("command", args, "");
	};
	
	// Generate a datalist tag
	HTML.prototype.datalist = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("datalist", args, "");
	};
	
	// Generate a del tag
	HTML.prototype.del = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("del", args, "");
	};
	
	// Generate a details tag
	HTML.prototype.details = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("details", args, "");
	};
	
	// Generate a dfn tag
	HTML.prototype.dfn = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("dfn", args, "");
	};
	
	// Generate a em tag
	HTML.prototype.em = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("em", args, "");
	};
	
	// Generate a embed tag
	HTML.prototype.embed = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("embed", args, "");
	};
	
	// Generate a fieldset tag
	HTML.prototype.fieldset = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("fieldset", args, "");
	};
	
	// Generate a figcaption tag
	HTML.prototype.figcaption = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("figcaption", args, "");
	};
	
	// Generate a figure tag
	HTML.prototype.figure = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("figure", args, "");
	};
	
	// Generate a hgroup tag
	HTML.prototype.hgroup = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("hgroup", args, "");
	};
	
	// Generate a hr tag
	HTML.prototype.hr = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("hr", args, "");
	};
	
	// Generate a hr tag
	HTML.prototype.hr = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("hr", args, "");
	};
	
	// Generate a i tag
	HTML.prototype.i = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("i", args, "");
	};

	// Generate a iframe tag
	HTML.prototype.iframe = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("iframe", args, "");
	};

	// Generate a img tag
	HTML.prototype.img = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("img", args, "");
	};

	// Generate a ins tag
	HTML.prototype.ins = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("ins", args, "");
	};

	// Generate a kbd tag
	HTML.prototype.kbd = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("kbd", args, "");
	};

	// Generate a keygen tag
	HTML.prototype.keygen = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("keygen", args, "");
	};

	// Generate a legend tag
	HTML.prototype.legend = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("legend", args, "");
	};

	// Generate a map tag
	HTML.prototype.map = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("map", args, "");
	};

	// Generate a mark tag
	HTML.prototype.mark = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("mark", args, "");
	};

	// Generate a menu tag
	HTML.prototype.menu = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("menu", args, "");
	};

	// Generate a meta tag
	HTML.prototype.meta = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("meta", args, "");
	};

	// Generate a meter tag
	HTML.prototype.meter = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("meter", args, "");
	};

	// Generate a noscript tag
	HTML.prototype.noscript = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("noscript", args, "");
	};

	// Generate a object tag
	HTML.prototype.object = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("object", args, "");
	};

	// Generate a optgroup tag
	HTML.prototype.optgroup = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("optgroup", args, "");
	};

	// Generate a output tag
	HTML.prototype.output = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("output", args, "");
	};

	// Generate a param tag
	HTML.prototype.param = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("param", args, "");
	};

	// Generate a progress tag
	HTML.prototype.progress = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("progress", args, "");
	};

	// Generate a pre tag
	HTML.prototype.pre = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("pre", args, "");
	};

	// Generate a q tag
	HTML.prototype.q = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("q", args, "");
	};

	// Generate a rp tag
	HTML.prototype.rp = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("rp", args, "");
	};

	// Generate a rt tag
	HTML.prototype.rt = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("rt", args, "");
	};

	// Generate a ruby tag
	HTML.prototype.ruby = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("ruby", args, "");
	};

	// Generate a s tag
	HTML.prototype.s = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("s", args, "");
	};

	// Generate a samp tag
	HTML.prototype.samp = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("samp", args, "");
	};

	// Generate a strong tag
	HTML.prototype.strong = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("strong", args, "");
	};

	// Generate a summary tag
	HTML.prototype.summary = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("summary", args, "");
	};

	// Generate a tbody tag
	HTML.prototype.tbody = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("tbody", args, "");
	};

	// Generate a textarea tag
	HTML.prototype.textarea = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("textarea", args, "");
	};

	// Generate a tfoot tag
	HTML.prototype.tfoot = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("tfoot", args, "");
	};

	// Generate a thead tag
	HTML.prototype.thead = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("thead", args, "");
	};

	// Generate a time tag
	HTML.prototype.time = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("time", args, "");
	};

	// Generate a track tag
	HTML.prototype.track = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("track", args, "");
	};

	// Generate a u tag
	HTML.prototype.u = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("u", args, "");
	};

	// Generate a wbr tag
	HTML.prototype.wbr = function () {
		var args = Array.prototype.slice.call(arguments);
		return this.assembleTag("wbr", args, "");
	};


	try {
		exports.HTML = HTML;
	} catch (err) {
		// Toto, I don't think we're not in Node any more
	}
	global.TBone = {
		HTML: HTML,
	};
}(this));
