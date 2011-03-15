<?php
/**
 * bones.php - an ultra simple programatic template library.
 * It provides trivial construction of HTML elements with
 * a simple way inner HTML and attributes.
 * 
 * Inspiration "Behind the Code: Avoiding Spaghetti" by Jason Grosman
 * http://www.npr.org/blogs/inside/2011/02/02/126312263/behind-the-code-avoiding-spaghetti-html
 *
 * HTML markup reference was http://en.wikipedia.org/wiki/HTML_element#HTML401
 *
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 *
 * copyright (c) 2011 all rights reserved
 *
 * Released under the BSD License.
 * See: http://opensource.org/licenses/bsd-license.php
 */

/**
 * attributes_string_to_array - parse an attribute string (e.g. 'class="myclass" id="fred"') into an associative array.
 * @param $attributes_string - a list of attributes in string form.
 * @return an associative array representation of the attributes.
 */
function attributes_string_to_array($attributes_string) {
  $in_quote = false;
  $key = false;
  $key_start = 0;
  $value_start = 0;
  $attributes = array();
  $string = trim($attributes_string);
  for($pos = 0; $pos < strlen($string); $pos++) {
    $char = substr($string, $pos, 1);
    if ($in_quote) {
      // Have we exited quote
      if ($char == $in_quote) {
        $attributes[$key] = substr($string, $value_start, $pos - $value_start);
        $in_quote = false;
        $value = 0;
        $key = false;
        $key_start = $pos + 1;
      } else if ($char == '\\' && substr($string, $pos + 1, 1) == $in_quote) {
        $pos += 1;
      }
    } else if ($char == '"' || $char == "'") {
      $in_quote = $char;
      $value_start = $pos + 1;
    } else if ($char == '=') {
      $key = trim(substr($string, $key_start, $pos - $key_start));
    }
  }
  return $attributes;
} /* END: attributes_string_to_array() */

/**
 * assemble_attributes - format a set of attribute strings for a tag.
 * @param $attributes - either an associative array or formatted string.
 * @return a string representation of the attributes.
 */
function assemble_attributes ($attributes = NULL) {
  if ($attributes == NULL) {
    return '';
  } else if (is_array($attributes)) {
    $attr = '';
    foreach ($attributes as $key => $value) {
      if ($value !== NULL) {
        $attr .= ' ' . $key . '="' . addslashes($value) . '"';
      } else {
        $attr .= ' ' . $key;
      }
    }
    return ' ' . trim($attr);
  } else {
    return ' ' . trim($attributes);
  }
} /* END: assemble_attributes() */

/**
 * assemble_tag - assemble an HTML tag in an valid manner.
 * @param $tag - the name of the tag you want to assemble (e.g. p, h1, div)
 * @param $innerHTML - the inner contents of the HTML tag (could be other
 * HTML content)
 * @param $attributes - an associate array or string presentation of the 
 * tag attributes.
 * @return string of the assemble HTML tag.
 */
function assemble_tag ($tag, $innerHTML = NULL, $attributes = NULL) {
  if ($innerHTML !== NULL) {
    return '<' . $tag . assemble_attributes($attributes) . '>' . $innerHTML . '</' . $tag . '>'; 
  } else {
    return '<' . $tag . assemble_attributes($attributes) . ' />';
  }
}

/**
 * wHtml - for the outer HTML and Doctype wrapper for an HTML page.
 * @param $innerHTML - usually a head and body tag with their contents.
 * @param $attributes - usually something like lange="en"
 * @return a string representation of the HTML page.
 */
function wHtml ($innerHTML, $attributes = 'lang="en"') {
  return '<!DOCTYPE html>' . PHP_EOL . assemble_tag(
  'html', $innerHTML, assemble_attributes($attributes)) . PHP_EOL;
} /* END: wHtml() */

/**
 * wHead - render a head element.
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wHead ($innerHTML, $attributes = NULL) {
  return assemble_tag('head', $innerHTML, assemble_attributes($attributes)) . PHP_EOL;
}

/**
 * wTitle - render a title element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wTitle ($innerHTML, $attributes = NULL) {
  return assemble_tag('title', $innerHTML, assemble_attributes($attributes));
}

/**
 * wBase - render a base element
 * @param $href - the base URL for the page.
 * @param $attributes - optional, other attributes to put into tag
 * @return a string representation of the element
 */
function wBase ($href, $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = attributes_string_to_array($attributes);
  }
  $attributes['href'] = $href;
  return assemble_tag('base', NULL, assemble_attributes($attributes));
}

/**
 * wLink - render an html link element
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wLink ($attributes) {
  return assemble_tag('link', NULL, assemble_attributes($attributes));
}

/**
 * wLinkCSS - render a CSS link element
 * @param $href - the URL of the CSS file
 * @param $attributes - optional, other attributes to put into tag
 * @return a string representation of the element
 */
function wLinkCSS ($href, $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = attributes_string_to_array($attributes);
  }
  $attributes['rel'] = 'stylesheet';
  $attributes['type'] = 'text/css';
  $attributes['href'] = $href;
  return assemble_tag('link', NULL, assemble_attributes($attributes));
}

/**
 * wMeta - render a meta tag from a list of key/value pairs
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wMeta ($attributes) {
  return assemble_tag('meta', NULL, assemble_attributes($attributes));
}

/**
 * wObject - render an object element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wObject ($innerHTML, $attributes = NULL) {
  return assemble_tag('object', $innerHTML, assemble_attributes($attributes));
}

/**
 * wStyle - render a style element
 * @param $CSS - the CSS you want to include in the style element.
 * @param $attributes - optional, other attributes to put into tag
 * @return a string representation of the element
 */
function wStyle ($CSS, $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = attributes_string_to_array($attributes);
  }
  $attributes['type'] = 'text/css';
  return assemble_tag('style', $CSS, assemble_attributes($attributes));
}
 
/**
 * wBody - render a body element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wBody ($innerHTML, $attributes = NULL) {
  return assemble_tag('body', $innerHTML, assemble_attributes($attributes));
}

/**
 * wH1 - render an html h1 element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wH1 ($innerHTML, $attributes = NULL) {
  return assemble_tag('h1', $innerHTML, assemble_attributes($attributes));
}

/**
 * wH2 - render an html h2 element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wH2 ($innerHTML, $attributes = NULL) {
  return assemble_tag('h2', $innerHTML, assemble_attributes($attributes));
}

/**
 * wH3 - render an html h3 element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wH3 ($innerHTML, $attributes = NULL) {
  return assemble_tag('h3', $innerHTML, assemble_attributes($attributes));
}

/**
 * wH4 - render an html h4 element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wH4 ($innerHTML, $attributes = NULL) {
  return assemble_tag('h4', $innerHTML, assemble_attributes($attributes));
}

/**
 * wH5 - render an html h5 element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wH5 ($innerHTML, $attributes = NULL) {
  return assemble_tag('h5', $innerHTML, assemble_attributes($attributes));
}

/**
 * wH6 - render an html h6 element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wH6 ($innerHTML, $attributes = NULL) {
  return assemble_tag('h6', $innerHTML, assemble_attributes($attributes));
}

/**
 * wP - render an html paragraph element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wP ($innerHTML = NULL, $attributes = NULL) {
  if ($innerHTML == NULL) {
    return '<p' . assemble_attributes($attributes) . '>';
  } else {
    return assemble_tag('p', $innerHTML, assemble_attributes($attributes));
  }
}

/**
 * wA - render an html anchor element
 * @param $innerHTML - the contents of tag
 * @param $href - the href for the anchor tag.
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wA ($innerHTML, $href = '', $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = attributes_string_to_array($attributes);
  }
  if ($href) {
    $attributes['href'] = $href;
  }
  return assemble_tag('a', $innerHTML, assemble_attributes($attributes));
}

/**
 * wImg - render an image element
 * @param $url - the URL of the image
 * @param $attributes - a string or hash of key/values representing attributes
 */
function wImg ($url, $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = attributes_string_to_array($attributes);
  }
  $attributes['src'] = $url;
  return assemble_tag('img', NULL, assemble_attributes($attributes));
}

/**
 * wUl - render an html un-order list element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wUl ($innerHTML, $attributes = NULL) {
  return assemble_tag('ul', $innerHTML, assemble_attributes($attributes));
}

/**
 * wOl - render an html order list element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wOl ($innerHTML, $attributes = NULL) {
  return assemble_tag('ol', $innerHTML, assemble_attributes($attributes));
}

/**
 * wLi - render an html list item element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wLi ($innerHTML, $attributes = NULL) {
  return assemble_tag('li', $innerHTML, assemble_attributes($attributes));
}

/**
 * wDl - render an html definition list element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wDl ($innerHTML, $attributes = NULL) { 
  return assemble_tag('dl', $innerHTML, assemble_attributes($attributes));
}

/**
 * wDt - render an html definition term element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wDt ($innerHTML, $attributes = NULL) {
  return assemble_tag('dt', $innerHTML, assemble_attributes($attributes));
}

/**
 * wDd - render an html data definition element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wDd ($innerHTML, $attributes = NULL) {
  return assemble_tag('dd', $innerHTML, assemble_attributes($attributes));
}

/**
 * wTable - render an html a table element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wTable ($innerHTML, $attributes = NULL) {
  return assemble_tag('table', $innerHTML, assemble_attributes($attributes));
}

/**
 * wTh - render an html table header element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wTh ($innerHTML, $attributes = NULL) {
  return assemble_tag('th', $innerHTML, assemble_attributes($attributes));
}

/**
 * wTr - render an html table row element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wTr ($innerHTML, $attributes = NULL) {
  return assemble_tag('tr', $innerHTML, assemble_attributes($attributes));
}

/**
 * wCol - render a col element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wCol ($innerHTML, $attributes = NULL) {
  return assemble_tag('col', $innerHTML, assemble_attributes($attributes));
}

/**
 * wColgroup - render a colgroup element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wColgroup ($innerHTML, $attributes = NULL) {
  return assemble_tag('colgroup', $innerHTML, assemble_attributes($attributes));
}

/**
 * wTHead - render a caption element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wTHead ($innerHTML, $attributes = NULL) {
  return assemble_tag('thead', $innerHTML, assemble_attributes($attributes));
}

/**
 * wTBody - render a caption element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wTBody ($innerHTML, $attributes = NULL) {
  return assemble_tag('tbody', $innerHTML, assemble_attributes($attributes));
}

/**
 * wTFoot - render a caption element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wTFoot ($innerHTML, $attributes = NULL) {
  return assemble_tag('tfoot', $innerHTML, assemble_attributes($attributes));
}

/**
 * wTd - render an html table data element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wTd ($innerHTML, $attributes = NULL) {
  return assemble_tag('td', $innerHTML, assemble_attributes($attributes));
}

/**
 * wForm - render an html form element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wForm ($innerHTML, $attributes) {
  return assemble_tag('form', $innerHTML, assemble_attributes($attributes));
}

/**
 * wLabel - render a label element
 * @param $innerHTML - the contents of the tag
 * @param $attributes - (optional) a string or hash of key/value representing attributes
 * @return a string representation of the element
 */
function wLabel($innerHTML, $attributes = NULL) {
  return assemble_tag('label', $innerHTML, assemble_attributes($attributes));
}

/**
 * wInput - render an html input element
 * @param $name - the name of the input field
 * @param $value - the default value of the input field
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wInput ($name, $value = '', $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = attributes_string_to_array($attributes);
  }
  $attributes['name'] = $name;
  $attributes['value'] = $value;
  return assemble_tag('input', NULL, assemble_attributes($attributes));
}

/**
 * wTextarea - render an html textarea element
 * @param $name - the name of a textarea
 * @param $value - the default value of the textarea
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wTextarea ($name, $value = '', $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = attributes_string_to_array($attributes);
  }
  $attributes['name'] = $name;
  return assemble_tag('textarea', $value, assemble_attributes($attributes));
}

/**
 * wSelect - an html select element
 * @param $name - name of the select element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wSelect ($name, $innerHTML, $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = attributes_string_to_array($attributes);
  }
  $attributes['name'] = $name;
  return assemble_tag('select', $innerHTML, assemble_attributes($attributes));
}

/**
 * wOption - an html option element
 * @param $value - a value for the element
 * @param $label - for the option
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wOption ($value, $label, $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = attributes_string_to_array($attributes);
  }
  $attributes['value'] = $value;
  return assemble_tag('option', $label, assemble_attributes($attributes));
}

/**
 * optgroup - identifies a group of options in a select list.
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wOptgroup ($innerHTML, $attributes = NULL) {
  return assemble_tag('optgroup', $innerHTML, assemble_attributes($attributes));
}

/**
 * wButton - a button element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wButton ($innerHTML, $attributes = NULL) {
  return assemble_tag('button', $innerHTML, assemble_attributes($attributes));
}

/**
 * wFieldset - a fieldset element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wFieldset ($innerHTML, $attributes = NULL) {
  return assemble_tag('fieldset', $innerHTML, assemble_attributes($attributes));
}

/**
 * wLegend - a legend fieldset element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wLegend ($innerHTML, $attributes = NULL) {
  return assemble_tag('legend', $innerHTML, assemble_attributes($attributes));
}

/**
 * wScript - an html script element
 * @param $url - location JavaScript source file
 * @param $code - JavaScript code
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wScript ($url = '', $code = '', $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = attributes_string_to_array($attributes);
  }
  $attributes['type'] = 'text/javascript';
  if ($url) {
    $attributes['src'] = $url;
    return assemble_tag('script', '', assemble_attributes($attributes));
  } else {
    return assemble_tag('script', $code, assemble_attributes($attributes));
  }
}

/**
 * wNoScript - replacement content for scripts
 * @param $innerHTML - the contents of tag
 * @return a string representation of the element
 */
function wNoScript ($innerHTML) {
  return assemble_tag('noscript', $innerHTML);
}

/**
 * address - address block
 * @param $innerHTML - the contents of tag
 * @return a string representation of the element
 */
function wAddress($innerHTML) {
  return assemble_tag('address', $innerHTML);
}

/**
 * blockquote
 * @param $innerHTML - the contents of tag
 * @return a string representation of the element
 */
function wBlockquote($innerHTML) {
  return assemble_tag('blockquote', $innerHTML);
}

/**
 * del - Marks a deleted section of content
 * @param $innerHTML - the contents of tag
 * @return a string representation of the element
 */
function wDel($innerHTML) {
  return assemble_tag('del', $innerHTML);
}

/**
 * hr - horizontal rule
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wHr($attributes = NULL) {
  return assemble_tag('hr', NULL, assemble_attributes($attributes));
}

/**
 * ins - insert content
 * @param $innerHTML - the contents of tag
 * @return a string representation of the element
 */
function wIns($innerHTML) {
  return assemble_tag('ins', $innerHTML);
}

/**
 * wPre - an html pre element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wPre($innerHTML, $attributes = NULL) {
  return assemble_tag('pre', $innerHTML, assemble_attributes($attributes));
}

/**
 * wDiv - an html div element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wDiv ($innerHTML, $attributes = NULL) {
  return assemble_tag('div', $innerHTML, assemble_attributes($attributes));
}

/**
 * wSpan - an html span element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wSpan ($innerHTML, $attributes) {
  return assemble_tag('span', $innerHTML, assemble_attributes($attributes));
}

/**
 * wAbbr - Marks an abbreviation, and can make the full form available.
 * @param $abbreviation - the abbreviated form (e.g. W3C)
 * @param $full_form - the long form (e.g. World Wide Web Consortium)
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wAbbr ($abbreviation, $full_form = '', $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = attributes_string_to_array($attributes);
  }
  $attributes['title'] = $full_form;
  return assemble_tag('abbr', $abbreviation, assemble_attributes($attributes));
}

/**
 * wAcronym - acronym element.
 * @param $acronym - the short form (e.g. HTML)
 * @param $full_form - the long form (e.g. Hyper Text Markup Language)
 * @param $attributes - (optional) a string or hash of key/values representing attributes 
 * @return a string representation of the element
 */
function wAcronym ($acronym, $full_form, $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = attributes_string_to_array($attributes);
  }
  $attributes['title'] = $full_form;
  return assemble_tag('acronym', $acronym, assemble_attributes($attributes));
}

/**
 * wDfn - an in-line definition element
 * @param $innerHTML - the contents of tag
 * @return a string representation of the element
 */
function wDfn ($innerHTML) {
  return assemble_tag('dfn', $innerHTML);
}

/**
 * wEm - an emphasis element
 * @param $innerHTML - the contents of tag
 * @return a string representation of the element
 */
function wEm ($innerHTML) {
  return assemble_tag('em', $innerHTML);
}

/**
 * wStrong - a strong element
 * @param $innerHTML - the contents of tag
 * @return a string representation of the element
 */
function wStrong ($innerHTML) {
  return assemble_tag('strong', $innerHTML);
}

/**
 * wCode - an code element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wCode ($innerHTML, $attributes = NULL) {
  return assemble_tag('code', $innerHTML, assemble_attributes($attributes));
}

/**
 * wSamp - a sample output element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wSamp ($innerHTML, $attributes = NULL) {
  return assemble_tag('samp', $innerHTML, assemble_attributes($attributes));
}

/**
 * wKbr - a "text to be entered by the user" element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wKbr ($innerHTML, $attributes = NULL) {
  return assemble_tag('kbr', $innerHTML, assemble_attributes($attributes));
}

/**
 * wVar - a "variable" element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wVar ($innerHTML, $attributes = NULL) {
  return assemble_tag('var', $innerHTML, assemble_attributes($attributes));
}

/**
 * wB - a bold element. Sets font to boldface where possible.
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wB ($innerHTML, $attributes = NULL) {
  return assemble_tag('b', $innerHTML, assemble_attributes($attributes));
}

/**
 * wI - a intalics element. Sets font to italic where possible.
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wI ($innerHTML, $attributes = NULL) {
  return assemble_tag('i', $innerHTML, assemble_attributes($attributes));
}

/**
 * wBig - a big element. Increases font size (bigger text).
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wBig ($innerHTML, $attributes = NULL) {
  return assemble_tag('big', $innerHTML, assemble_attributes($attributes));
}

/**
 * wSmall - a small element. Decreases font size (smaller text).
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wSmall ($innerHTML, $attributes = NULL) {
  return assemble_tag('small', $innerHTML, assemble_attributes($attributes));
}

/**
 * wSub - a subscript element.
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wSub ($innerHTML, $attributes = NULL) {
  return assemble_tag('sub', $innerHTML, assemble_attributes($attributes));
}

/**
 * wSup - a super script element.
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wSup ($innerHTML, $attributes = NULL) {
  return assemble_tag('sup', $innerHTML, assemble_attributes($attributes));
}

/**
 * wTt - a teletype element. Fixed-width font (typewriter-like)
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wTt ($innerHTML, $attributes = NULL) {
  return assemble_tag('tt', $innerHTML, assemble_attributes($attributes));
}

/**
 * wBr - A forced line-break element.
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wBr ($attributes = NULL) {
  return assemble_tag('br', NULL, assemble_attributes($attributes));
}


/**
 * wBdo - a bdo element. Marks an inline section of text in which 
 * the reading direction is the opposite from that of the parent element.
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wBdo ($innerHTML, $attributes = NULL) {
  return assemble_tag('bdo', $innerHTML, assemble_attributes($attributes));
}

/**
 * wCite - an html span element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wCite ($innerHTML, $attributes = NULL) {
  return assemble_tag('cite', $innerHTML, assemble_attributes($attributes));
}

/**
 * wQ - an in-line quotation element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wQ ($innerHTML, $attributes = NULL) {
  return assemble_tag('q', $innerHTML, assemble_attributes($attributes));
}

/**
 * wArea - an area element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wArea ($innerHTML, $attributes = NULL) {
  return assemble_tag('area', $innerHTML, assemble_attributes($attributes));
}

/**
 * wMap - a map element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wMap ($innerHTML, $attributes = NULL) {
  return assemble_tag('map', $innerHTML, assemble_attributes($attributes));
}

/**
 * wFrame - render a frame element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wFrame ($innerHTML, $attributes = NULL) {
  return assemble_tag('frame', $innerHTML, assemble_attributes($attributes));
}

/**
 * wNoFrame - render a noframe element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wNoFrame ($innerHTML, $attributes = NULL) {
  return assemble_tag('noframe', $innerHTML, assemble_attributes($attributes));
}

/**
 * wIFrame - render a frame element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wIFrame ($innerHTML, $attributes = NULL) {
  return assemble_tag('iframe', $innerHTML, assemble_attributes($attributes));
}

/**
 * wHGroup - an hgroup element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
function wHGroup ($innerHTML, $attributes = NULL) {
  return assemble_tag('hgroup', $innerHTML, $attributes);
}


?>
