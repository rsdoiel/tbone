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

class Bones {
/**
 * attributes_string_to_array - parse an attribute string (e.g. 'class="myclass" id="fred"') into an associative array.
 * @param $attributes_string - a list of attributes in string form.
 * @return an associative array representation of the attributes.
 */
public function attributes_string_to_array($attributes_string) {
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
public function assemble_attributes ($attributes = NULL) {
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
public function assemble_tag ($tag, $innerHTML = NULL, $attributes = NULL) {
  if ($innerHTML !== NULL) {
    return '<' . $tag . $this->assemble_attributes($attributes) . '>' . $innerHTML . '</' . $tag . '>'; 
  } else {
    return '<' . $tag . $this->assemble_attributes($attributes) . ' />';
  }
}

/**
 * Html - for the outer HTML and Doctype wrapper for an HTML page.
 * @param $innerHTML - usually a head and body tag with their contents.
 * @param $attributes - usually something like lange="en"
 * @return a string representation of the HTML page.
 */
public function Html ($innerHTML, $attributes = 'lang="en"') {
  return '<!DOCTYPE html>' . PHP_EOL . $this->assemble_tag(
  'html', $innerHTML, $this->assemble_attributes($attributes)) . PHP_EOL;
} /* END: wHtml() */

/**
 * Head - render a head element.
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Head ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('head', $innerHTML, $this->assemble_attributes($attributes)) . PHP_EOL;
}

/**
 * Title - render a title element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Title ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('title', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Base - render a base element
 * @param $href - the base URL for the page.
 * @param $attributes - optional, other attributes to put into tag
 * @return a string representation of the element
 */
public function Base ($href, $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = $this->attributes_string_to_array($attributes);
  }
  $attributes['href'] = $href;
  return $this->assemble_tag('base', NULL, $this->assemble_attributes($attributes));
}

/**
 * Link - render an html link element
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Link ($attributes) {
  return $this->assemble_tag('link', NULL, $this->assemble_attributes($attributes));
}

/**
 * LinkCSS - render a CSS link element
 * @param $href - the URL of the CSS file
 * @param $attributes - optional, other attributes to put into tag
 * @return a string representation of the element
 */
public function LinkCSS ($href, $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = $this->attributes_string_to_array($attributes);
  }
  $attributes['rel'] = 'stylesheet';
  $attributes['type'] = 'text/css';
  $attributes['href'] = $href;
  return $this->assemble_tag('link', NULL, $this->assemble_attributes($attributes));
}

/**
 * Meta - render a meta tag from a list of key/value pairs
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Meta ($attributes) {
  return $this->assemble_tag('meta', NULL, $this->assemble_attributes($attributes));
}

/**
 * Object - render an object element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Object ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('object', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Style - render a style element
 * @param $CSS - the CSS you want to include in the style element.
 * @param $attributes - optional, other attributes to put into tag
 * @return a string representation of the element
 */
public function Style ($CSS, $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = $this->attributes_string_to_array($attributes);
  }
  $attributes['type'] = 'text/css';
  return $this->assemble_tag('style', $CSS, $this->assemble_attributes($attributes));
}
 
/**
 * Body - render a body element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Body ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('body', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * H1 - render an html h1 element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function H1 ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('h1', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * H2 - render an html h2 element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function H2 ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('h2', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * H3 - render an html h3 element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function H3 ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('h3', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * H4 - render an html h4 element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function H4 ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('h4', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * H5 - render an html h5 element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function H5 ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('h5', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * H6 - render an html h6 element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function H6 ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('h6', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * P - render an html paragraph element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function P ($innerHTML = NULL, $attributes = NULL) {
  if ($innerHTML == NULL) {
    return '<p' . $this->assemble_attributes($attributes) . '>';
  } else {
    return $this->assemble_tag('p', $innerHTML, $this->assemble_attributes($attributes));
  }
}

/**
 * A - render an html anchor element
 * @param $innerHTML - the contents of tag
 * @param $href - the href for the anchor tag.
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function A ($innerHTML, $href = '', $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = $this->attributes_string_to_array($attributes);
  }
  if ($href) {
    $attributes['href'] = $href;
  }
  return $this->assemble_tag('a', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Img - render an image element
 * @param $url - the URL of the image
 * @param $attributes - a string or hash of key/values representing attributes
 */
public function Img ($url, $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = $this->attributes_string_to_array($attributes);
  }
  $attributes['src'] = $url;
  return $this->assemble_tag('img', NULL, $this->assemble_attributes($attributes));
}

/**
 * Ul - render an html un-order list element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Ul ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('ul', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Ol - render an html order list element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Ol ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('ol', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Li - render an html list item element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Li ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('li', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Dl - render an html definition list element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Dl ($innerHTML, $attributes = NULL) { 
  return $this->assemble_tag('dl', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Dt - render an html definition term element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Dt ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('dt', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Dd - render an html data definition element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Dd ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('dd', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Table - render an html a table element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Table ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('table', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Th - render an html table header element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Th ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('th', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Tr - render an html table row element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Tr ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('tr', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Col - render a col element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Col ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('col', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Colgroup - render a colgroup element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Colgroup ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('colgroup', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * THead - render a caption element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function THead ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('thead', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * TBody - render a caption element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function TBody ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('tbody', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * TFoot - render a caption element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function TFoot ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('tfoot', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Td - render an html table data element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Td ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('td', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Form - render an html form element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Form ($innerHTML, $attributes) {
  return $this->assemble_tag('form', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Label - render a label element
 * @param $innerHTML - the contents of the tag
 * @param $attributes - (optional) a string or hash of key/value representing attributes
 * @return a string representation of the element
 */
public function Label($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('label', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Input - render an html input element
 * @param $name - the name of the input field
 * @param $value - the default value of the input field
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Input ($name, $value = '', $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = $this->attributes_string_to_array($attributes);
  }
  $attributes['name'] = $name;
  $attributes['value'] = $value;
  return $this->assemble_tag('input', NULL, $this->assemble_attributes($attributes));
}

/**
 * Textarea - render an html textarea element
 * @param $name - the name of a textarea
 * @param $value - the default value of the textarea
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Textarea ($name, $value = '', $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = $this->attributes_string_to_array($attributes);
  }
  $attributes['name'] = $name;
  return $this->assemble_tag('textarea', $value, $this->assemble_attributes($attributes));
}

/**
 * Select - an html select element
 * @param $name - name of the select element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Select ($name, $innerHTML, $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = $this->attributes_string_to_array($attributes);
  }
  $attributes['name'] = $name;
  return $this->assemble_tag('select', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Option - an html option element
 * @param $value - a value for the element
 * @param $label - for the option
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Option ($value, $label, $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = $this->attributes_string_to_array($attributes);
  }
  $attributes['value'] = $value;
  return $this->assemble_tag('option', $label, $this->assemble_attributes($attributes));
}

/**
 * optgroup - identifies a group of options in a select list.
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Optgroup ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('optgroup', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Button - a button element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Button ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('button', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Fieldset - a fieldset element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Fieldset ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('fieldset', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Legend - a legend fieldset element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Legend ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('legend', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Script - an html script element
 * @param $url - location JavaScript source file
 * @param $code - JavaScript code
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Script ($url = '', $code = '', $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = $this->attributes_string_to_array($attributes);
  }
  $attributes['type'] = 'text/javascript';
  if ($url) {
    $attributes['src'] = $url;
    return $this->assemble_tag('script', '', $this->assemble_attributes($attributes));
  } else {
    return $this->assemble_tag('script', $code, $this->assemble_attributes($attributes));
  }
}

/**
 * NoScript - replacement content for scripts
 * @param $innerHTML - the contents of tag
 * @return a string representation of the element
 */
public function NoScript ($innerHTML) {
  return $this->assemble_tag('noscript', $innerHTML);
}

/**
 * address - address block
 * @param $innerHTML - the contents of tag
 * @return a string representation of the element
 */
public function Address($innerHTML) {
  return $this->assemble_tag('address', $innerHTML);
}

/**
 * blockquote
 * @param $innerHTML - the contents of tag
 * @return a string representation of the element
 */
public function Blockquote($innerHTML) {
  return $this->assemble_tag('blockquote', $innerHTML);
}

/**
 * del - Marks a deleted section of content
 * @param $innerHTML - the contents of tag
 * @return a string representation of the element
 */
public function Del($innerHTML) {
  return $this->assemble_tag('del', $innerHTML);
}

/**
 * hr - horizontal rule
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Hr($attributes = NULL) {
  return $this->assemble_tag('hr', NULL, $this->assemble_attributes($attributes));
}

/**
 * ins - insert content
 * @param $innerHTML - the contents of tag
 * @return a string representation of the element
 */
public function Ins($innerHTML) {
  return $this->assemble_tag('ins', $innerHTML);
}

/**
 * Pre - an html pre element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Pre($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('pre', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Div - an html div element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Div ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('div', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Span - an html span element
 * @param $innerHTML - the contents of tag
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Span ($innerHTML, $attributes) {
  return $this->assemble_tag('span', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Abbr - Marks an abbreviation, and can make the full form available.
 * @param $abbreviation - the abbreviated form (e.g. W3C)
 * @param $full_form - the long form (e.g. World Wide Web Consortium)
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Abbr ($abbreviation, $full_form = '', $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = $this->attributes_string_to_array($attributes);
  }
  $attributes['title'] = $full_form;
  return $this->assemble_tag('abbr', $abbreviation, $this->assemble_attributes($attributes));
}

/**
 * Acronym - acronym element.
 * @param $acronym - the short form (e.g. HTML)
 * @param $full_form - the long form (e.g. Hyper Text Markup Language)
 * @param $attributes - (optional) a string or hash of key/values representing attributes 
 * @return a string representation of the element
 */
public function Acronym ($acronym, $full_form, $attributes = NULL) {
  if ($attributes === NULL) {
    $attributes = array();
  } else if (is_string($attributes)) {
    $attributes = $this->attributes_string_to_array($attributes);
  }
  $attributes['title'] = $full_form;
  return $this->assemble_tag('acronym', $acronym, $this->assemble_attributes($attributes));
}

/**
 * Dfn - an in-line definition element
 * @param $innerHTML - the contents of tag
 * @return a string representation of the element
 */
public function Dfn ($innerHTML) {
  return $this->assemble_tag('dfn', $innerHTML);
}

/**
 * Em - an emphasis element
 * @param $innerHTML - the contents of tag
 * @return a string representation of the element
 */
public function Em ($innerHTML) {
  return $this->assemble_tag('em', $innerHTML);
}

/**
 * Strong - a strong element
 * @param $innerHTML - the contents of tag
 * @return a string representation of the element
 */
public function Strong ($innerHTML) {
  return $this->assemble_tag('strong', $innerHTML);
}

/**
 * Code - an code element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Code ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('code', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Samp - a sample output element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Samp ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('samp', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Kbr - a "text to be entered by the user" element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Kbr ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('kbr', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * B - a bold element. Sets font to boldface where possible.
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function B ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('b', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * I - a intalics element. Sets font to italic where possible.
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function I ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('i', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Big - a big element. Increases font size (bigger text).
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Big ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('big', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Small - a small element. Decreases font size (smaller text).
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Small ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('small', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Sub - a subscript element.
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Sub ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('sub', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Sup - a super script element.
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Sup ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('sup', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Tt - a teletype element. Fixed-width font (typewriter-like)
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Tt ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('tt', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Br - A forced line-break element.
 * @param $attributes - a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Br ($attributes = NULL) {
  return $this->assemble_tag('br', NULL, $this->assemble_attributes($attributes));
}


/**
 * Bdo - a bdo element. Marks an inline section of text in which 
 * the reading direction is the opposite from that of the parent element.
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Bdo ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('bdo', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Cite - an html span element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Cite ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('cite', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Q - an in-line quotation element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Q ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('q', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Area - an area element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Area ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('area', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Map - a map element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Map ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('map', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * Frame - render a frame element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function Frame ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('frame', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * NoFrame - render a noframe element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function NoFrame ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('noframe', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * IFrame - render a frame element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function IFrame ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('iframe', $innerHTML, $this->assemble_attributes($attributes));
}

/**
 * HGroup - an hgroup element
 * @param $innerHTML - the contents of tag
 * @param $attributes - (optional) a string or hash of key/values representing attributes
 * @return a string representation of the element
 */
public function HGroup ($innerHTML, $attributes = NULL) {
  return $this->assemble_tag('hgroup', $innerHTML, $attributes);
}

} /* END: class Bones */

?>
