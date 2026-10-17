<?php defined('ABSPATH') || exit; get_header(); ?>
<main id="main-content">
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<?php if (!is_page()) : ?><article class="container prose"><h1><?php the_title(); ?></h1><?php endif; ?>
<?php the_content(); ?>
<?php if (!is_page()) : ?></article><?php endif; ?>
<?php endwhile; else : ?><section class="page-hero"><div class="container"><span class="eyebrow">A different direction</span><h1>Let’s get you<br><em>back on track.</em></h1><p class="lede">We couldn’t find that page. Explore our capabilities or start a conversation.</p><div class="hero-actions"><a class="button" href="<?php echo esc_url(home_url('/')); ?>">Back to home <i data-lucide="arrow-up-right"></i></a></div></div></section><?php endif; ?>
</main><?php get_footer(); ?>
