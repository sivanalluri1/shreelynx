<?php
/** ShreeLynx theme setup and explicit, non-destructive content import. */
defined('ABSPATH') || exit;

function shreelynx_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('automatic-feed-links');
    add_theme_support('html5', array('search-form', 'gallery', 'caption', 'style', 'script'));
}
add_action('after_setup_theme', 'shreelynx_setup');

function shreelynx_page_url($slug) {
    $page = get_page_by_path($slug);
    return $page ? get_permalink($page) : home_url($slug === 'home' ? '/' : '/' . $slug . '/');
}

function shreelynx_assets() {
    $uri = get_template_directory_uri();
    wp_enqueue_style('shreelynx', get_stylesheet_uri(), array(), '2.0.1');
    wp_enqueue_script('shreelynx-icons', $uri . '/assets/lucide.min.js', array(), '0.468.0', true);
    wp_enqueue_script('shreelynx', $uri . '/script.js', array('shreelynx-icons'), '2.0.1', true);
    wp_localize_script('shreelynx', 'shreelynx', array(
        'page' => is_page() ? get_post_field('post_name', get_queried_object_id()) : '',
        'pageUrl' => is_singular() ? get_permalink() : home_url('/'),
        'talentUrl' => shreelynx_page_url('talent'),
        'aboutUrl' => shreelynx_page_url('about'),
    ));
}
add_action('wp_enqueue_scripts', 'shreelynx_assets');

/** Resolve original relative references at render time, including subdirectory installs. */
function shreelynx_content_urls($content) {
    $content = preg_replace_callback('/\b(href|src)="assets\/([^"<>]+)"/', function ($match) {
        return $match[1] . '="' . esc_url(get_template_directory_uri() . '/assets/' . $match[2]) . '"';
    }, $content);
    return preg_replace_callback('/\bhref="(index|services|talent|industries|about|insights|careers|contact)\.html([?#][^"<>]*)?"/', function ($match) {
        $url = shreelynx_page_url($match[1] === 'index' ? 'home' : $match[1]);
        $suffix = isset($match[2]) ? $match[2] : '';
        if (strpos($suffix, '?') === 0) {
            $parts = wp_parse_url($suffix);
            $args = array(); parse_str(isset($parts['query']) ? $parts['query'] : '', $args);
            $url = add_query_arg($args, $url);
            if (isset($parts['fragment'])) { $url .= '#' . $parts['fragment']; }
        } else { $url .= $suffix; }
        return 'href="' . esc_url($url) . '"';
    }, $content);
}
add_filter('the_content', 'shreelynx_content_urls', 20);

/** Preserve the supplied layout: do not insert automatic paragraph tags into imported HTML. */
function shreelynx_content_formatting() {
    if (is_singular() && get_post_meta(get_queried_object_id(), '_shreelynx_imported', true)) {
        remove_filter('the_content', 'wpautop');
    }
}
add_action('wp', 'shreelynx_content_formatting');

function shreelynx_setup_menu() {
    add_theme_page('ShreeLynx Setup', 'ShreeLynx Setup', 'manage_options', 'shreelynx-setup', 'shreelynx_setup_screen');
}
add_action('admin_menu', 'shreelynx_setup_menu');

function shreelynx_setup_screen() {
    if (!current_user_can('manage_options')) { return; }
    ?>
    <div class="wrap"><h1>ShreeLynx Setup</h1>
    <p>Create the eight supplied pages and set the imported Home page as the homepage. New pages are created without overwriting existing content. Select the update option below to refresh pages previously imported by this theme; their current content is backed up first.</p>
    <p>Page content is editable in Pages using the Code editor. Keep the HTML classes and data attributes to preserve the design and interactions.</p>
    <?php if (isset($_GET['imported'])) : ?><div class="notice notice-success"><p>Setup finished. Check Pages to review the imported design. Updated page content has a backup in post metadata and WordPress revisions when enabled.</p></div><?php endif; ?>
    <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
    <input type="hidden" name="action" value="shreelynx_import">
    <?php wp_nonce_field('shreelynx_import'); ?>
    <p><label><input type="checkbox" name="refresh_imported" value="1"> Update previously imported ShreeLynx pages to the new design (backs up current page content).</label></p>
    <?php submit_button('Install / update ShreeLynx pages'); ?>
    </form></div>
    <?php
}

function shreelynx_import() {
    if (!current_user_can('manage_options') || !current_user_can('unfiltered_html')) {
        wp_die('Administrator access with unfiltered HTML permission is required to import these page layouts.');
    }
    check_admin_referer('shreelynx_import');
    $pages = array('home' => 'Home', 'services' => 'Services', 'talent' => 'Talent', 'industries' => 'Industries', 'about' => 'About', 'insights' => 'Insights', 'careers' => 'Careers', 'contact' => 'Contact');
    foreach ($pages as $slug => $title) {
        $page = get_page_by_path($slug);
        if ($page && (empty($_POST['refresh_imported']) || !get_post_meta($page->ID, '_shreelynx_imported', true))) { continue; }
        $content = file_get_contents(get_template_directory() . '/content/' . $slug . '.html');
        if ($content === false) { wp_die('Could not read the bundled page content.'); }
        if ($page) {
            wp_save_post_revision($page->ID);
            add_post_meta($page->ID, '_shreelynx_design_backup', array('date' => current_time('mysql'), 'content' => $page->post_content));
        }
        $id = wp_insert_post(wp_slash(array(
            'ID' => $page ? $page->ID : 0,
            'post_type' => 'page', 'post_status' => 'publish', 'post_title' => $title,
            'post_name' => $slug, 'post_content' => '<!-- wp:html -->' . $content . '<!-- /wp:html -->',
        )), true);
        if (is_wp_error($id)) { wp_die(esc_html($id->get_error_message())); }
        update_post_meta($id, '_shreelynx_imported', 1);
        update_post_meta($id, '_shreelynx_design_version', '2.0.1');
    }
    $home = get_page_by_path('home');
    if ($home && get_post_meta($home->ID, '_shreelynx_imported', true)) {
        update_option('show_on_front', 'page');
        update_option('page_on_front', $home->ID);
    }
    wp_safe_redirect(admin_url('themes.php?page=shreelynx-setup&imported=1'));
    exit;
}
add_action('admin_post_shreelynx_import', 'shreelynx_import');

/** Make the required content setup visible immediately after activation. */
function shreelynx_setup_notice() {
    if (!current_user_can('manage_options') || get_page_by_path('home')) { return; }
    echo '<div class="notice notice-warning"><p><strong>Finish ShreeLynx setup:</strong> import the supplied pages to enable the homepage and navigation. <a href="' . esc_url(admin_url('themes.php?page=shreelynx-setup')) . '">Open ShreeLynx Setup</a></p></div>';
}
add_action('admin_notices', 'shreelynx_setup_notice');
function shreelynx_favicon() {
    if (!has_site_icon()) {
        echo '<link rel="icon" href="' . esc_url(get_template_directory_uri() . '/assets/shreelynx-mark.png') . '">';
    }
}
add_action('wp_head', 'shreelynx_favicon');

/** A native, accessible inquiry form; delivery uses the site's configured WordPress mail. */
function shreelynx_contact_form($attributes) {
    $attributes = shortcode_atts(array('context' => 'project'), $attributes);
    $careers = $attributes['context'] === 'careers';
    $prefix = $careers ? 'career' : 'inquiry';
    $status = isset($_GET['inquiry_status']) ? sanitize_key(wp_unslash($_GET['inquiry_status'])) : '';
    $messages = array(
        'sent' => 'Thank you. Your inquiry was accepted for email delivery. Our team will follow up using the address you provided.',
        'invalid' => 'Please enter your name, a valid email address, an area of interest, and a message.',
        'unavailable' => 'Your inquiry could not be sent. Please try again later.',
        'limited' => 'Please wait a minute before submitting another inquiry.',
        'expired' => 'This form expired. Reload the page and try again.',
    );
    $interests = array('consulting' => 'Strategy & consulting', 'engineering' => 'Software development', 'data-ai' => 'Data & AI', 'cloud' => 'Cloud & DevOps', 'quality' => 'Quality & security', 'managed' => 'Managed services', 'experience' => 'Experience & commerce', 'enterprise' => 'Enterprise solutions', 'talent' => 'Technology talent', 'careers' => 'Career opportunities', 'other' => 'Something else');
    $selected = $careers ? 'careers' : (isset($_GET['interest']) ? sanitize_key(wp_unslash($_GET['interest'])) : '');
    ob_start();
    if (isset($messages[$status])) {
        echo '<div id="inquiry-feedback" class="form-message' . ($status === 'sent' ? '' : ' error') . '" role="status" tabindex="-1">' . esc_html($messages[$status]) . '</div>';
    }
    ?>
    <form class="form-card" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="post">
    <input type="hidden" name="action" value="shreelynx_inquiry">
    <input type="hidden" name="context" value="<?php echo $careers ? 'careers' : 'project'; ?>">
    <?php wp_nonce_field('shreelynx_inquiry', 'shreelynx_nonce', false); ?>
    <div class="form-trap" aria-hidden="true"><label>Leave this field empty<input name="company_website" tabindex="-1" autocomplete="off"></label></div>
    <div class="form-grid">
      <div class="field"><label for="<?php echo esc_attr($prefix); ?>-name">Your name <span>(required)</span></label><input id="<?php echo esc_attr($prefix); ?>-name" name="full_name" autocomplete="name" maxlength="120" required></div>
      <div class="field"><label for="<?php echo esc_attr($prefix); ?>-email">Email address <span>(required)</span></label><input id="<?php echo esc_attr($prefix); ?>-email" name="email" type="email" autocomplete="email" maxlength="200" required></div>
      <div class="field full"><label for="<?php echo esc_attr($prefix); ?>-company"><?php echo $careers ? 'Your specialty or current role' : 'Company'; ?> <span>(optional)</span></label><input id="<?php echo esc_attr($prefix); ?>-company" name="company" autocomplete="organization" maxlength="200"></div>
      <div class="field full"><label for="<?php echo esc_attr($prefix); ?>-interest">I’m interested in <span>(required)</span></label><select id="<?php echo esc_attr($prefix); ?>-interest" name="interest" required><option value="">Choose an area</option><?php foreach ($interests as $value => $label) : ?><option value="<?php echo esc_attr($value); ?>" <?php selected($selected, $value); ?>><?php echo esc_html($label); ?></option><?php endforeach; ?></select></div>
      <div class="field full"><label for="<?php echo esc_attr($prefix); ?>-message"><?php echo $careers ? 'Tell us about your skills and interests' : 'A little about your project'; ?> <span>(required)</span></label><textarea id="<?php echo esc_attr($prefix); ?>-message" name="message" placeholder="A short overview is a great place to start…" maxlength="6000" required></textarea></div>
      <div class="field full"><button class="button" type="submit">Send your inquiry <i data-lucide="arrow-up-right" aria-hidden="true"></i></button><p class="form-privacy">By submitting, you ask ShreeLynx to use these details to respond to your inquiry. Please do not include sensitive or confidential information.</p></div>
    </div></form>
    <?php return ob_get_clean();
}
add_shortcode('shreelynx_contact_form', 'shreelynx_contact_form');

function shreelynx_handle_inquiry() {
    $context = isset($_POST['context']) && $_POST['context'] === 'careers' ? 'careers' : 'contact';
    $return = shreelynx_page_url($context);
    $finish = function ($status) use ($return) {
        wp_safe_redirect(add_query_arg('inquiry_status', $status, $return) . '#inquiry-feedback');
        exit;
    };
    foreach (array('shreelynx_nonce', 'company_website', 'full_name', 'email', 'company', 'interest', 'message') as $field) {
        if (isset($_POST[$field]) && !is_string($_POST[$field])) { $finish('invalid'); }
    }
    if (empty($_POST['shreelynx_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['shreelynx_nonce'])), 'shreelynx_inquiry')) { $finish('expired'); }
    if (!empty($_POST['company_website'])) { $finish('unavailable'); }
    $name = isset($_POST['full_name']) ? sanitize_text_field(wp_unslash($_POST['full_name'])) : '';
    $email = isset($_POST['email']) ? sanitize_email(wp_unslash($_POST['email'])) : '';
    $company = isset($_POST['company']) ? sanitize_text_field(wp_unslash($_POST['company'])) : '';
    $interest = isset($_POST['interest']) ? sanitize_text_field(wp_unslash($_POST['interest'])) : '';
    $message = isset($_POST['message']) ? sanitize_textarea_field(wp_unslash($_POST['message'])) : '';
    if (!$name || !is_email($email) || !in_array($interest, array('consulting', 'engineering', 'data-ai', 'cloud', 'quality', 'managed', 'experience', 'enterprise', 'talent', 'careers', 'other'), true) || !$message || strlen($name) > 480 || strlen($company) > 800 || strlen($email) > 200 || strlen($message) > 24000) { $finish('invalid'); }
    $ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : '';
    $key = 'shreelynx_inquiry_' . hash_hmac('sha256', $ip, wp_salt('nonce'));
    if (get_transient($key)) { $finish('limited'); }
    set_transient($key, 1, MINUTE_IN_SECONDS);
    $recipient = get_theme_mod('shreelynx_inquiry_email', get_option('admin_email'));
    if (!is_email($recipient)) { $finish('unavailable'); }
    $subject = '[ShreeLynx] ' . ($context === 'careers' ? 'Career inquiry' : 'Website inquiry');
    $body = "Name: $name\nEmail: $email\nCompany / specialty: $company\nInterest: $interest\n\n$message";
    $sent = wp_mail($recipient, $subject, $body, array('Reply-To: ' . $email));
    $finish($sent ? 'sent' : 'unavailable');
}
add_action('admin_post_shreelynx_inquiry', 'shreelynx_handle_inquiry');
add_action('admin_post_nopriv_shreelynx_inquiry', 'shreelynx_handle_inquiry');

function shreelynx_customize($customizer) {
    $customizer->add_section('shreelynx_contact', array('title' => 'ShreeLynx inquiries', 'priority' => 35));
    $customizer->add_setting('shreelynx_inquiry_email', array('default' => get_option('admin_email'), 'sanitize_callback' => 'sanitize_email'));
    $customizer->add_control('shreelynx_inquiry_email', array('label' => 'Inquiry recipient email', 'description' => 'Contact and career inquiries are sent here. Configure and test WordPress mail delivery before launch.', 'section' => 'shreelynx_contact', 'type' => 'email'));
}
add_action('customize_register', 'shreelynx_customize');

function shreelynx_description() {
    $descriptions = array(
        'home' => 'ShreeLynx connects technology consulting, software development, cloud, data, AI, cybersecurity, and specialist talent to help your business move forward.',
        'services' => 'Explore ShreeLynx capabilities across software engineering, technology consulting, AI, cloud, security, digital experience, and managed services.',
        'industries' => 'Technology solutions shaped around healthcare, financial services, manufacturing, retail, logistics, and enterprise organizations.',
        'talent' => 'Build technology capacity with specialist staffing, dedicated engineering teams, and flexible workforce solutions from ShreeLynx.',
        'about' => 'Meet ShreeLynx: connected thinking and practical delivery across technology consulting, engineering, and talent.',
        'careers' => 'Connect with ShreeLynx about your skills and interests across software, cloud, data, AI, quality, and technology delivery.',
        'insights' => 'Practical ShreeLynx perspectives on software modernization, responsible AI adoption, cloud platforms, and building technology teams.',
        'contact' => 'Start a conversation with ShreeLynx about software development, technology consulting, cloud, data, and talent needs.',
    );
    $slug = is_front_page() ? 'home' : get_post_field('post_name', get_queried_object_id());
    if (isset($descriptions[$slug])) { echo '<meta name="description" content="' . esc_attr($descriptions[$slug]) . '">'; }
}
add_action('wp_head', 'shreelynx_description', 2);
function shreelynx_home_title($title) {
    if (is_front_page()) { $title['title'] = 'ShreeLynx — Technology. Talent. Possibility.'; unset($title['tagline']); }
    return $title;
}
add_filter('document_title_parts', 'shreelynx_home_title');
