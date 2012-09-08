/*!
 * jQuery serializeObject - v0.2 - 1/20/2010
 * http://benalman.com/projects/jquery-misc-plugins/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */// Whereas .serializeArray() serializes a form into an array, .serializeObject()
// serializes a form into an (arguably more useful) object.
(function(a,b){"$:nomunge";a.fn.serializeObject=function(){var c={};a.each(this.serializeArray(),function(d,e){var f=e.name,g=e.value;c[f]=c[f]===b?g:a.isArray(c[f])?c[f].concat(g):[c[f],g]});return c}})(jQuery);