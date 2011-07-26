<?php
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

define("TBONE_VERSION",2);

/**
 * AssembleAttributes - formats a valid set of attribute strings.
 * @param attributes - either an associative array or formatted string.
 * @return a string representation of the attributes.
 */
function AssembleAttributes ($attributes = NULL) {
	if ($attributes === NULL) {
		return '';
	} else if (is_array($attributes)) {
		$attr = ''; 
		foreach ($attributes as $key => $value) {
		    if (isset($attributes[$key])) {
			    $attr .= ' ' . $key . '="' . trim($value) . '"';
		    } else {
			    $attr .= ' ' . $key;
		    }
		}
		return ' ' . trim($attr);
	} else {
		return ' ' . trim($attributes);
	}
} /* END: AssembleAttributes() */


/**
 * DisassembleAttributes - parse an attribute string (e.g. 'class="myclass" id="fred"') into an associative array.
 * @param attributes_string - a list of attributes in string form.
 * @return an object representation of the attributes.
 */
function DisassembleAttributes($attributes_string) {
	$in_quote = false;
	$key = false;
	$key_start = 0;
	$value_start = 0;
	$attributes = array();
	$pos = 0;
	$chr = '';
	$str = trim($attributes_string);

	for ($pos = 0; $pos < strlen($str); $pos += 1) {
		$chr = substr($str, $pos, 1);
		if ($in_quote) {
			// Have we exited quote
			if ($chr == $in_quote) {
				$attributes[$key] = substr($str, $value_start, $pos - $value_start);
				$in_quote = false;
				$value = 0;
				$key = false;
				$key_start = $pos + 1;
			} else if ($chr == '\\' && substr($str, $pos + 1, 1) == $in_quote) {
				$pos += 1;
			}
		} else if ($chr == '"' || $chr == "'") {
			$in_quote = $chr;
			$value_start = $pos + 1;
		} else if ($chr == '=') {
			$key = trim(substr($str, $key_start, $pos - $key_start));
		}
	}
	return $attributes;
} /* END: DisassembleAttributes() */

/**
 * Html - for the outer HTML and Doctype wrapper for an HTML page.
 * @param innerHTML - usually a head and body tag with their contents.
 * @param attributes - usually something like lange="en"
 * @return a string representation of the HTML page.
 */
function Html($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = "";
	}
	if ($attributes === NULL) {
		$attributes = array('lang' => "en");
	}
	return '<!DOCTYPE html>' . PHP_EOL .
	'<html' . AssembleAttributes($attributes) . '>' . $innerHTML . '</html>';
} /* END: Html() */

/**
 * Head - render a html head element.
 * @param innerHTML - the contents of head tag
 * @param attributes - e.g. a key/value pair of attribute name and value or string like class="myclass"
 * @return a string representation of the head block
 */
function Head($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<head' . AssembleAttributes($attributes) . '>' . $innerHTML . '</head>';
} /* END: Head() */

/**
 * Title - render an html title element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Title($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<title' . AssembleAttributes($attributes) . '>' . $innerHTML . '</title>';
} /* END: Title() */

/**
 * tbLink - an html link element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function tbLink($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<link' . AssembleAttributes($attributes) . ' />';
} /* END: tbLink() */

/**
 * Body - render an html body element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Body($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<body' . AssembleAttributes($attributes) . '>' . $innerHTML . '</body>';
} /* END: Body() */

/**
 * H1 - render an html h1 element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function H1($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<h1' . AssembleAttributes($attributes) . '>' . $innerHTML . '</h1>';
} /* END: H1() */

/**
 * H2 - render an html h2 element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function H2($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<h2' . AssembleAttributes($attributes) . '>' . $innerHTML . '</h2>';
} /* END: H2() */

/**
 * H3 - render an html h3 element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function H3($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<h3' . AssembleAttributes($attributes) . '>' . $innerHTML . '</h3>';
} /* END: H3() */

/**
 * H4 - render an html h4 element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function H4($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
    	$innerHTML = '';
	}
	return '<h4' . AssembleAttributes($attributes) . '>' . $innerHTML . '</h4>';
} /* END: H4() */

/**
 * H5 - render an html h5 element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function H5($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
	}
	return '<h5' . AssembleAttributes($attributes) . '>' . $innerHTML . '</h5>';
} /* END: H5() */

/**
 * H6 - render an html h6 element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function H6($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
	return '<h6' . AssembleAttributes($attributes) . '>' . $innerHTML . '</h6>';
} /* END: H6() */

/**
 * P - render an html paragraph element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function P($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		return '<p' . AssembleAttributes($attributes) . '>';
	} else {
		return '<p' . AssembleAttributes($attributes) . '>' . $innerHTML . '</p>';
	}
}
	
/**
 * A - render an html anchor element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function A($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	if (is_string($attributes) && strpos($attributes, "=") === false) {
	        $tmp = $attributes;
		$attributes = array('href' => $tmp);
	}
	return '<a' . AssembleAttributes($attributes) . '>' . $innerHTML . '</a>';
}
	
/**
 * Ul - render an html un-order list element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Ul($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<ul' . AssembleAttributes($attributes) . '>' . $innerHTML . '</ul>';
}
	
/**
 * Ol - render an html order list element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Ol($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<ol' . AssembleAttributes($attributes) . '>' . $innerHTML . '</ol>';
}
	
/**
 * Li - render an html list item element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Li($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<li' . AssembleAttributes($attributes) . '>' . $innerHTML . '</li>';
}
	
/**
 * tbDl - render an html definition list element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function tbDl($innerHTML = NULL, $attributes = NULL) { 
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<dl' . AssembleAttributes($attributes) . '>' . $innerHTML . '</dl>';
}
	
/**
 * Dt - render an html definition term element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Dt($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<dt' . AssembleAttributes($attributes) . '>' . $innerHTML . '</dt>';
}
	
/**
 * Dd - render an html definition defined element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Dd($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<dd' . AssembleAttributes($attributes) . '>' . $innerHTML . '</dd>';
}

/**
 * Table - render an html a table element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Table($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<table' . AssembleAttributes($attributes) . '>' . $innerHTML . '</table>';
}
	
/**
 * Th - render an html table header element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Th($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<th' . AssembleAttributes($attributes) . '>' . $innerHTML . '</th>';
}
	
/**
 * Tr - render an html table row element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Tr($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<tr' . AssembleAttributes($attributes) . '>' . $innerHTML . '</tr>';
} /* END: Tr() */
	
/**
 * Td - render an html table data element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Td($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<td' . AssembleAttributes($attributes) . '>' . $innerHTML . '</td>';
} /* END: Td() */
	
/**
 * Form - render an html form element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Form($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<form' . AssembleAttributes($attributes) . '>' . $innerHTML . '</form>';
} /* END: Form() */
	
/**
 * Input - render an html input element
 * @param name - the name of the input field
 * @param value - the default value of the input field
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Input($name = NULL, $value = NULL, $attributes = NULL) {
	if ($name === NULL) {
		$name = '';
	}
	if ($value === NULL) {
		$value = '';
	}
	return '<input name="' . $name . '" value="' . $value . '"' . AssembleAttributes($attributes) . ' />';
} /* END: Input() */
	
/**
 * Button - create an input button 
 * @param name - the name of the button
 * @param value - the value of the button
 * @attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Button($name = NULL, $value = NULL, $attributes = NULL) {
	$attr = DisassembleAttributes(AssembleAttributes($attributes));
	$attr['type'] = 'button';
	return Input($name, $value, $attr);
} /* END: Button() */
	
/**
 * Textarea - render an html textarea element
 * @param name - the name of a textarea
 * @param value - the default value of the textarea
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Textarea($name = NULL, $value = NULL, $attributes = NULL) {
	if ($value === NULL) {
		$value = '';
	}
	return '<textarea name="' . $name . '"' . AssembleAttributes($attributes) . '>' . $value . '</textarea>';
} /* END: Textarea() */
	
/**
 * Select - an html select element
 * @param name - name of the select element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Select($name = NULL, $innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	if ($name === NULL) {
		$name = '';
	}
	return '<select name="' . $name . '"' . AssembleAttributes($attributes) . '>' . $innerHTML . '</select>';
} /* END: Select() */
	
/**
 * Option - an html option element
 * @param value - a value for the element
 * @param label - for the option
 * @return a string representation of the element
 */
function Option($value = NULL, $label = NULL, $attributes = NULL) {
	if ($value === NULL) {
		$value = '';
	}
	if ($label === NULL) {
		$label = '';
	}
	return '<option value="' . $value . '"' . AssembleAttributes($attributes) . '>' . $label . '</option>';
} /* END: Option() */
	
/**
 * Label - an html label element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Label($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<label' . AssembleAttributes($attributes) . '>' . $innerHTML . '</label>';
} /* END: Label() */
	
/**
 * Script - an html script element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Script($url = NULL, $code = NULL, $attributes = NULL) {
	if ($url !== NULL) {
		return '<script type="JavaScript" rel="text/javascript" src="' . $url . '"' . AssembleAttributes($attributes) . '></script>';
	} else {
		return '<script type="JavaScript" rel="text/javascript"' . AssembleAttributes($attributes) . '>' . $code . '</script>';
	}
} /* END: Script() */
	
/**
 * Pre - an html pre element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Pre($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<pre' . AssembleAttributes($attributes) . '>' . $innerHTML . '</pre>';
} /* END: Pre() */
	
/**
 * DemoCode - an html composite of code and pre tags
 * @param code_source - the contents of tag
 * @param attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function DemoCode($code_source = NULL, $attributes = NULL) {
	if ($code_source === NULL) {
		$code_source = '';
	}
	return '<code' . AssembleAttributes($attributes) . '>' . Pre( PHP_EOL . $code_source . PHP_EOL) . '</code>';
} /* END: DemoCode() */

/**
 * Div - an html div element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Div($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<div' . AssembleAttributes($attributes) . '>' . $innerHTML . '</div>';
} /* END: Div() */

/**
 * Span - an html span element
 * @param innerHTML - the contents of tag
 * @param attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Span($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<span' . AssembleAttributes($attributes) . '>' . $innerHTML . '</span>';
} /* END: Span() */

/**
 * Menu - an HTML5 Menu element
 * @param label
 * @param innerHTML
 * @param attributes
 * @return a string representation of the element
 */
function Menu($label = NULL, $innerHTML = NULL, $attributes = NULL) {
	return '<menu label="' . $label . '"' . AssembleAttributes($attributes) . '>' . $innerHTML . '</menu>';
} /* END: Menu() */
	
/**
 * Img - image element
 * @param src
 * @param attributes
 * @return a string representation of the element
 */
function Img($src, $attributes = NULL) {
	return '<img src="' . $src . '"' . AssembleAttributes($attributes) . '/>';
} /* END: Img() */
	
/**
 * Center - render a center tag
 * @param innerHTML - the contents of tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Center($innerHTML = NULL, $attributes = NULL) {
	if ($innerHTML === NULL) {
		$innerHTML = '';
	}
	return '<center' . AssembleAttributes($attributes) . '>' . $innerHTML . '</center>';
} /* END: Center() */

/**
 * Br - render a br tag
 * @param attributes - a string or object of key/values representing attributes
 * @return a string representation of the element
 */
function Br($innerHTML = NULL, $attributes = NULL) {
	return '<br' . AssembleAttributes($attributes) . ' />';
} /* END: Br() */

/**
 * Base - render a base element
 * @param $href - the base URL for the page.
 * @param $attributes - optional, other attributes to put into tag
 * @return a string representation of the element
 */
function Base ($href, $attributes = NULL) {
  if ($attributes === NULL) {
	$attributes = array();
  } else if (is_string($attributes)) {
	$attributes = DisassembleAttributes($attributes);
  }
  $attributes['href'] = $href;
  return '<base' . AssembleAttributes($attributes) . ' />';
} /* END: Base() */
	
/**
 * Meta - render a meta tag from a list of key/value pairs
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Meta ($attributes = NULL) {
  return '<meta' . AssembleAttributes($attributes) . ' />';
} /* END: Meta() */

/**
 * Object - render an object element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Object ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<object' . $attributes . '>' . $innerHTML . '</object>';
} /* END: Object() */
	
/**
 * Style - render a style element
 * @param $CSS - the CSS you want to include in the style element.
 * @param $attributes - optional, other attributes to put into tag
 * @return a string representation of the element
 */
function Style ($CSS, $attributes = NULL) {
    if ($attributes === NULL) {
	    $attributes = array();
    } else if (is_string($attributes)) {
        $attributes = DisassembleAttributes($attributes);
    }
    $attributes['type'] = 'text/css';
    return '<style' . AssembleAttributes($attributes) . '>' . $CSS . '</style>';
} /* END: Style() */

/**
 * Col - render a col element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Col ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<col' . AssembleAttributes($attributes) . '>' . $innerHTML . '</col>';
} /* END: Col() */

/**
 * Colgroup - render a colgroup element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Colgroup ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<colgroup' . AssembleAttributes($attributes) . '>' . $innerHTML . '</colgroup>';
} /* END: Colgroup() */
	
/**
 * THead - render a caption element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function THead ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
  return '<thead' . AssembleAttributes($attributes) . '>' . $innerHTML . '</thead>';
} /* END: THead() */
	
/**
 * TBody - render a caption element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function TBody ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<tbody' . AssembleAttributes($attributes) . '>' . $innerHTML . '</tbody>';
} /* END: TBody() */
	
/**
 * TFoot - render a caption element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function TFoot ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<tfoot' . AssembleAttributes($attributes) . '>' . $innerHTML . '</tfoot>';
} /* END: TFoot() */
	
/**
 * optgroup - identifies a group of options in a select list.
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Optgroup ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<optgroup' . AssembleAttributes($attributes) . '>' . $innerHTML . '</optgroup>';
} /* END: Optgroup() */
	
/**
 * Fieldset - a fieldset element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Fieldset ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<fieldset' . AssembleAttributes($attributes) . '>' . $innerHTML . '</fieldset>';
} /* END: Fieldset() */
	
/**
 * Legend - a legend fieldset element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Legend ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<legend' . AssembleAttributes($attributes) . '>' . $innerHTML .'</legend>';
} /* END: Legend() */
	
/**
 * NoScript - replacement content for scripts
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function NoScript ($innerHTML = NULL , $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<noscript' . AssembleAttributes($attributes) . '>' . $innerHTML . '</noscript>';
} /* END: NoScript() */
	
/**
 * address - address block
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Address($innerHTML = NULL , $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<address' . AssembleAttributes($attributes) . '>' . $innerHTML . '</address>';
} /* END: Address() */
	
/**
 * blockquote
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Blockquote($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<blockquote' . AssembleAttributes($attributes) . '>' . $innerHTML . '</blockquote>';
} /* END: Blockquote() */
	
/**
 * del - Marks a deleted section of content
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Del($innerHTML) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<del' . AssembleAttributes($attributes) . '>' . $innerHTML . '</del>';
} /* END: Del() */
	
/**
 * hr - horizontal rule
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Hr($attributes = NULL) {
    return '<hr' . AssembleAttributes($attributes) . ' />';
} /* END: Hr() */
	
/**
 * Ins - insert content
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Ins($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<ins' . AssembleAttributes($attributes) . '>' . $innerHTML . '</ins>';
} /* END: Ins() */
	
/**
 * Abbr - Marks an abbreviation, and can make the full form available.
 * @param $abbreviation - the abbreviated form (e.g. W3C)
 * @param $full_form - the long form (e.g. World Wide Web Consortium)
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Abbr ($abbreviation, $full_form = '', $attributes = NULL) {
  if ($attributes === NULL) {
	$attributes = array();
  } else if (is_string($attributes)) {
	$attributes = DisassembleAttributes($attributes);
  }
  $attributes['title'] = $full_form;
  return '<abbr' . AssembleAttributes($attributes) . '>' . $abbreviation . '</abbr>';
} /* END: Abbr() */
	
/**
 * Acronym - acronym element.
 * @param $acronym - the short form (e.g. HTML)
 * @param $full_form - the long form (e.g. Hyper Text Markup Language)
 * @param $attributes - (optional) a string or hash of key/values representing attributes 
 * @return a string representation of the element
 */
function Acronym ($acronym, $full_form, $attributes = NULL) {
  if ($attributes === NULL) {
	$attributes = array();
  } else if (is_string($attributes)) {
	$attributes = DisassembleAttributes($attributes);
  }
  $attributes['title'] = $full_form;
  return '<acronym' . AssembleAttributes($attributes) . '>' . $acronym . '</acronym>';
} /* END: Acronym() */
	
/**
 * Dfn - an in-line definition element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes 
 * @return a string representation of the element
 */
function Dfn ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<dfn' . AssembleAttributes($attributes) . '>' . $innerHTML . '</dfn>';
} /* END: Dfn() */
	
/**
 * Em - an emphasis element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes 
 * @return a string representation of the element
 */
function Em ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<em' . AssembleAttributes($attributes) . '>' . $innerHTML . '</em>';
} /* END: Em() */
	
/**
 * Strong - a strong element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes 
 * @return a string representation of the element
 */
function Strong ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<strong' . AssembleAttributes($attributes) . '>' . $innerHTML . '</strong>';
} /* END: Strong() */
	
/**
 * Code - an code element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Code ($innerHTML, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<code' .  AssembleAttributes($attributes) . '>' . $innerHTML . '</code>';
} /* END: Code() */

/**
 * Samp - a sample output element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Samp ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<samp' . AssembleAttributes($attributes) . '>' . $innerHTML . '</samp>';
} /* END: Samp() */
	
/**
 * Kbr - a "text to be entered by the user" element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Kbr ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<kbr' . AssembleAttributes($attributes) . '>' . $innerHTML . '</kbr>';
} /* END: Kbr() */
	
/**
 * B - a bold element. Sets font to boldface where possible.
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function B ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<b' . AssembleAttributes($attributes) . '>' . $innerHTML . '</b>';
} /* END: B() */
	
/**
 * I - a intalics element. Sets font to italic where possible.
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function I ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<i' . AssembleAttributes($attributes) . '>' . $innerHTML . '</i>';
} /* END: I() */
	
/**
 * Big - a big element. Increases font size (bigger text).
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Big ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<big' .  AssembleAttributes($attributes) . '>' . $innerHTML . '</big>';
} /* END: Big() */
	
/**
 * Small - a small element. Decreases font size (smaller text).
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Small ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<small' . AssembleAttributes($attributes) . '>' . $innerHTML . '</small>';
} /* END: Small() */
	
/**
 * Sub - a subscript element.
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Sub ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<sub' . AssembleAttributes($attributes) . '>' . $innerHTML . '</sub>';
} /* END: Sub() */
	
/**
 * Sup - a super script element.
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Sup ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<sup' . AssembleAttributes($attributes) . '>' . $innerHTML . '</sup>';
} /* END: Sup() */
	
/**
 * Tt - a teletype element. Fixed-width font (typewriter-like)
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Tt ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<tt' . AssembleAttributes($attributes) . '>' . $innerHTML . '</tt>';
} /* END: Tt() */
	
/**
 * Bdo - a bdo element. Marks an inline section of text in which 
 * the reading direction is the opposite from that of the parent element.
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Bdo ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<bdo' . AssembleAttributes($attributes) . '>' . $innerHTML . '</bdo>';
} /* END: Bdo() */
	
/**
 * Cite - an html span element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Cite ($innerHTML = NULL, $attributes = NULL) {
    return '<cite'. AssembleAttributes($attributes) . '>' . $innerHTML . '</ >';
} /* END: Cite() */
	
/**
 * Q - an in-line quotation element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Q ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<q' . AssembleAttributes($attributes) . '>' . $innerHTML . '</q>';
} /* END: Q() */
	
/**
 * Area - an area element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Area ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<area' . AssembleAttributes($attributes) . '>' . $innerHTML . '</area>';
} /* END: Area() */
	
/**
 * Map - a map element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Map ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
	return '<map' . AssembleAttributes($attributes) . '>' . $innerHTML . '</map>';
} /* END: Map() */
	
/**
 * Frame - render a frame element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Frame ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<frame'. AssembleAttributes($attributes) . '>' . $innerHTML . '</frame>';
} /* END: Frame() */
	
/**
 * NoFrame - render a noframe element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function NoFrame ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<noframe'. AssembleAttributes($attributes) . '>' . $innerHTML . '</noframe>';
} /* END: NoFrame() */
	
/**
 * IFrame - render a frame element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function IFrame ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<iframe'. AssembleAttributes($attributes) . '>' . $innerHTML . '</iframe>';
} /* END: IFrame() */
	
/**
 * HGroup - an hgroup element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function HGroup ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<hgroup' . AssembleAttributes($attributes) . '>' . $innerHTML . '</hgroup>';
} /* END: HGroup() */

/**
 * Header - a header element
 * @param $innerHTML - the contents of the element
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Header ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<header' . AssembleAttributes($attributes) . '>' . $innerHTML . '</header>';
}

/**
 * Footer - a footer element
 * @param $innerHTML - the contents of the element
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function Footer ($innerHTML = NULL, $attributes = NULL) {
    if ($innerHTML === NULL) {
        $innerHTML = '';
    }
    return '<footer' . AssembleAttributes($attributes) . '>' . $innerHTML . '</footer>';
}

?>
