<?php
/** Preview the bundled design before the explicit page import. */
defined('ABSPATH') || exit;
if (get_option('show_on_front') === 'page' && get_option('page_on_front')) {
    require get_template_directory() . '/index.php';
    return;
}
get_header(); ?>
<main id="main-content"><?php echo do_shortcode(shreelynx_content_urls(file_get_contents(get_template_directory() . '/content/home.html'))); ?></main>
<?php get_footer(); ?>
