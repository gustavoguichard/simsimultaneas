<?php
/*
 * compatibility with WPML API. See http://wpml.org/documentation/support/wpml-coding-api/
 */

/*
 * defines two WPML constants once the language has been defined
 */
function pll_define_wpml_constants() {
	if(!defined('ICL_LANGUAGE_CODE'))
		define('ICL_LANGUAGE_CODE', pll_current_language());

	if(!defined('ICL_LANGUAGE_NAME'))
		define('ICL_LANGUAGE_NAME', pll_current_language('name'));
}

add_action('pll_language_defined', 'pll_define_wpml_constants');

/*
 * link to the home page in the active language
 */
if (!function_exists('icl_get_home_url')) {
	function icl_get_home_url() {
		return pll_home_url();
	}
}

/*
 * used for building custom language selectors
 * available only on frontend
 */
if (!function_exists('icl_get_languages')) {
	function icl_get_languages($args = '') {
		global $polylang;
		if (!(class_exists('Polylang_Core') && $polylang instanceof Polylang_Core))
			return array();

		$args = extract(wp_parse_args($args));
		$orderby = (isset($orderby) && $orderby == 'code') ? 'slug' : (isset($orderby) && $orderby == 'name' ? 'name' : 'id');
		$order = (!empty($order) && $order == 'desc') ? 'DESC' : 'ASC';

		$arr = array();

		foreach ($polylang->get_languages_list(array('hide_empty' => true, 'orderby' => $orderby, 'order' => $order)) as $lang) {
			$url = $polylang->get_translation_url($lang);

			if (!$url && !empty($skip_missing))
				continue;

			$arr[] = array(
				'id' => $lang->term_id,
				'active' => isset($polylang->curlang->slug) && $polylang->curlang->slug == $lang->slug ? 1 : 0,
				'native_name' => $lang->name,
				'missing' => $url ? 0 : 1,
				'translated_name' => '', // does not exist in Polylang
				'language_code' => $lang->slug,
				'country_flag_url' => $polylang->get_flag($lang, true),
				'url' => $url ? $url :
					(empty($link_empty_to) ? $polylang->get_home_url($lang) :
					str_replace('{$lang}', $lang->slug, $link_empty_to))
			);
		}
		return $arr;
	}
}

/*
 *  used for creating language dependent links in themes
 */
if (!function_exists('icl_link_to_element')) {
	function icl_link_to_element($id, $type = 'post', $text = '', $args = array(), $anchor = '') {
		global $polylang;

		if ($type == 'tag')
			$type = 'post_tag';

		if (isset($polylang) && ($lang = pll_current_language()) && $tr_id = $polylang->get_translation($type, $id, $lang))
			$id = $tr_id;

		if (post_type_exists($type)) {
			$link = get_permalink($id);
			if (empty($text))
				$text = get_the_title($id);
		}
		elseif (taxonomy_exists($type)) {
			$link = get_term_link($id, $type);
			if (empty($text) && ($term = get_term($id, $type)) && !empty($term) && !is_wp_error($term))
				$text = $term->name;
		}

		if (empty($link) || is_wp_error($link))
			return '';

		if (!empty($args))
			$link .= (false === strpos($link, '?') ? '?' : '&' ) . http_build_query($args);

		if (!empty($anchor))
			$link .= '#' . $anchor;

		return sprintf('<a href="%s">%s</a>', esc_url($link), esc_html($text));
	}
}

/*
 * used for calculating the IDs of objects (usually categories) in the current language
 */
if (!function_exists('icl_object_id')) {
	function icl_object_id($id, $type, $return_original_if_missing, $lang = false) {
		global $polylang;
		return isset($polylang) && ($lang = $lang ? $lang : pll_current_language()) && ($tr_id = $polylang->get_translation($type, $id, $lang)) ? $tr_id :
			($return_original_if_missing ? $id : null);
	}
}

/*
 * registers a string for translation in the "strings translation" panel
 * the parameter $context is not used by Polylang
 */
if (!function_exists('icl_register_string')) {
	function icl_register_string($context, $name, $string) {
		pll_register_string($name, $string);
	}
}

/*
 * gets the translated value of a string (previously registered with icl_register_string or pll_register_string)
 * the parameters $context and $name are not used by Polylang
 */
if (!function_exists('icl_t')) {
	function icl_t($context, $name, $string) {
		return pll__($string);
	}
}

/*
 * reads and interprets the file wpml-config.xml
 * see http://wpml.org/documentation/support/language-configuration-files/
 * the language switcher configuration is not interpreted
 * the xml parser has been adapted from http://php.net/manual/en/function.xml-parse-into-struct.php#84261
 * many thanks to wickedfather at hotmail dot com
 */
class Polylang_WPML_Config {
	private $values;
	private $index;
	private $wpml_config;
	private $strings;

	function __construct() {
		add_action('plugins_loaded', array(&$this, 'init'));
	}

	function xml_parse($xml) {
		$parser = xml_parser_create();
		xml_parser_set_option($parser, XML_OPTION_CASE_FOLDING, 0);
		xml_parser_set_option($parser, XML_OPTION_SKIP_WHITE, 1);
		xml_parse_into_struct($parser, $xml, $this->values);
		xml_parser_free($parser);

		$this->index = 0;
		$arr = $this->xml_parse_recursive();
		$arr = $arr['wpml-config'];

		$keys = array(
			array('custom-fields', 'custom-field'),
			array('custom-types','custom-type'),
			array('taxonomies','taxonomy'),
			array('admin_texts','key')
		);

		foreach ($keys as $k) {
			if (isset($arr[$k[0]]) && !isset($arr[$k[0]][$k[1]][0])) {
				$elem = $arr[$k[0]][$k[1]];
				unset($arr[$k[0]][$k[1]]);
				$arr[$k[0]][$k[1]][0] = $elem;
			}
		}

		$this->wpml_config = array_merge_recursive($this->wpml_config, $arr);
	}

	function xml_parse_recursive() {
		$found = array();
		$tagCount = array();

		while (isset($this->values[$this->index])) {
			extract($this->values[$this->index]);
			$this->index++;

			if ($type == 'close')
				return $found;

			if (isset($tagCount[$tag])) {
				if ($tagCount[$tag] == 1)
					$found[$tag] = array($found[$tag]);

				$tagRef = &$found[$tag][$tagCount[$tag]];
				$tagCount[$tag]++;
			}
			else {
				$tagCount[$tag] = 1;
				$tagRef = &$found[$tag];
			}

			if ($type == 'open') {
				$tagRef = $this->xml_parse_recursive();
				if (isset($attributes))
					$tagRef['attributes'] = $attributes;
			}

			if ($type == 'complete') {
				if (isset($attributes)) {
					$tagRef['attributes'] = $attributes;
					$tagRef = &$tagRef['value'];
				}
				if (isset($value))
					$tagRef = $value;
			}					}

		return $found;
	}

	function init() {
		$this->wpml_config = array();

		// child theme
		if (($template = get_template_directory()) != ($stylesheet = get_stylesheet_directory()) && file_exists($file = $stylesheet.'/wpml-config.xml'))
			$this->xml_parse(file_get_contents($file)); // FIXME fopen + fread + fclose quicker ?

		// theme
		if (file_exists($file = $template.'/wpml-config.xml'))
 			$this->xml_parse(file_get_contents($file));

		// plugins
		foreach (get_option('active_plugins') as $plugin) {
			if (file_exists($file = WP_PLUGIN_DIR.'/'.dirname($plugin).'/wpml-config.xml'))
				$this->xml_parse(file_get_contents($file));
		}

		if (isset($this->wpml_config['custom-fields']))
			add_filter('pll_copy_post_metas', array(&$this, 'copy_post_metas'), 10, 2);

		if (isset($this->wpml_config['custom-types']))
			add_filter('pll_get_post_types', array(&$this, 'translate_types'), 10, 2);

		if (isset($this->wpml_config['taxonomies']))
			add_filter('pll_get_taxonomies', array(&$this, 'translate_taxonomies'), 10, 2);

		if (!isset($this->wpml_config['admin-texts']))
			return;

		foreach ($this->wpml_config['admin-texts'] as $keys)
			$this->strings = $this->admin_texts_recursive($keys);

		foreach ($this->strings as $option_name=>$value) {
			if (is_admin()) {
				$option = get_option($option_name);
				if (is_string($option) && $value == 1)
					pll_register_string($option_name, $option);
				if (is_array($option) && is_array($value))
					$this->register_string_recursive($value, $option);
			}
			else
				add_filter('option_'.$option_name, array(&$this, 'translate_strings'));
		}
	}

	function admin_texts_recursive($keys) {
		if (!isset($keys[0])) {
			$elem = $keys;
			unset($keys);
			$keys[0] = $elem;
		}
		foreach ($keys as $key)
			$strings[$key['attributes']['name']] = isset($key['key']) ? $this->admin_texts_recursive($key['key']) : 1;

		return $strings;
	}

	function register_string_recursive($strings, $options) {
		foreach ($options as $name=>$value) {
			if (isset($strings[$name])) {
				if (is_string($value) && $strings[$name] == 1)
					pll_register_string($name, $value);
				if (is_array($value) && is_array($strings[$name]))
					$this->register_string_recursive($strings[$name], $value);
			}
		}
	}

	function copy_post_metas($metas, $sync) {
		foreach ($this->wpml_config['custom-fields']['custom-field'] as $cf) {
			if (!$sync || $cf['attributes']['action'] == 'copy')
				$metas[] = $cf['value'];
			elseif ($sync && $cf['attributes']['action'] == 'translate')
				$metas = array_diff($metas,  array($cf)); // do not synchronize
		}
		return $metas;
	}

	function translate_types($types, $hide) {
		// the author decided to translate the post type so don't allow the user to change this
		if (!$hide) {
			foreach ($this->wpml_config['custom-types']['custom-type'] as $pt) {
				if ($pt['attributes']['translate'] == 1)
					$types[$pt['value']] = $pt['value'];
			}
		}
		return $types;
	}

	function translate_taxonomies($taxonomies, $hide) {
		// the author decided to translate the taxonomy so don't allow the user to change this
		if (!$hide) {
			foreach ($this->wpml_config['taxonomies']['taxonomy'] as $tax) {
				if ($tax['attributes']['translate'] == 1)
					$taxonomies[$tax['value']] = $tax['value'];
			}
		}
		return $taxonomies;
	}

	function translate_strings($value) {
		$option = substr(current_filter(), 7);
		return is_array($value) ? $this->translate_strings_recursive($this->strings[$option], $value) : pll__($value);
	}

	function translate_strings_recursive($strings, $values) {
		foreach ($values as $name=>$value) {
			if (isset($strings[$name])) {
				if (is_string($value) && $strings[$name] == 1)
					$values[$name] = pll__($value);
				if (is_array($value) && is_array($strings[$name]))
					$value = $this->translate_strings_recursive($strings[$name], $value);
			}
		}
		return $values;
	}

}

new Polylang_WPML_Config();
