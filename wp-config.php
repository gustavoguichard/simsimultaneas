<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'sim_simultaneas');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost:8889');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '&cr.deHrhzg6eM@5Gr+-v.h^Ixaf*_7k#s;)&xbb{rD/RU,SFoZJn3.M`pmVBHy ');
define('SECURE_AUTH_KEY',  'q|@^u$_j!Z,qa6Zbr%Ha>WVR,A_ U}-n]Gj3 `v#O&Cd-sLACE/+5l}5k*,gKpM6');
define('LOGGED_IN_KEY',    'l51/#/-xLNDK6=Ynu5#epW|/+TD/Fm YM[4uB0CxM8|yrZ}T$+&SvuU -@j]J>`6');
define('NONCE_KEY',        'c-Z_BU^I)<4?zUMzi`JQ!+8p$ZZL]A(oi)[Mp{iV0|=>$:_S`,vn^/+&}pF$hqWP');
define('AUTH_SALT',        ':+TOL_<>s`]#sCf/S5bch385c!J{Ems]{</:WQ5@CKZJT+%P/d|r|M8T1(8G_<|-');
define('SECURE_AUTH_SALT', 'pqb?3cRzD`,i^cAK|p7+&4eJ&V@.*C:tZkMCOY-lbHB`cXxYu3-`uvz_YKRK2Top');
define('LOGGED_IN_SALT',   'PwIy(y?lYk*J0ohyRt8WnN|G)*$8]/#~lp?i%%2W6bFuVq57/t|<%b`DMA7475.+');
define('NONCE_SALT',       ']TlF:$/JD~@~>Q}#%X|dJ6^l8P3z[gR%CFtDc;U!CNm21)${,>(~V,nXbOe-vp09');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
