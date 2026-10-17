# ShreeLynx WordPress theme — version 2.0.1

An original redesign for a software and technology consulting business. The theme uses warm white, forest green, a dark editorial section, expressive typography, and an original vector mesh sculpture. It includes eight pages: Home, Services, Industries, About, Talent, Careers, Insights, and Contact.

## Install or update

1. Back up your WordPress site and database.
2. Under Appearance → Themes → Add Theme → Upload Theme, upload `shreelynx-wordpress-v2.zip`. For an existing installation, choose to replace the current theme with the uploaded version.
3. Activate ShreeLynx if needed.
4. Open Appearance → ShreeLynx Setup. On a fresh site, click **Install / update ShreeLynx pages**.
5. To upgrade the initial ShreeLynx design, select **Update previously imported ShreeLynx pages to the new design**, then click the install/update button. This refreshes only pages marked as imported by this theme. Existing unrelated pages are preserved. Previous content is saved in `_shreelynx_design_backup` post metadata and WordPress revisions where enabled. Inspect page content and the homepage after updating.
6. Open Appearance → Customize → ShreeLynx inquiries and set the recipient email.
7. Configure and test email delivery on your host before launching.

The theme is already installed, updated, and tested in the running Local site at `http://shreelynx.local/`. Local catches outgoing email in its development mail tool. No live hosting deployment was performed.

Your host must allow custom theme uploads. This is a standard PHP WordPress theme; no Node.js process, React server, paid builder, or build command is required on the hosting server.

## Content editing

Pages are stored in the WordPress database as Custom HTML blocks. Use Pages → Edit → Code editor to change the copy while preserving classes, IDs, and data attributes. The layout is not a collection of individually editable visual blocks. Bundled defaults live in `shreelynx/content/`; changing those files only affects pages after you explicitly run the update action.

The inquiry form uses the shortcode `[shreelynx_contact_form]`, or `[shreelynx_contact_form context="careers"]` on the Careers page. Preserve the shortcode when editing those pages.

Header and footer are in `header.php` and `footer.php`. Global design lives in `style.css`; progressive interactions live in `script.js`. Keep changes under source control or in a child theme before replacing future theme versions. If you edit page content locally, a theme ZIP alone does not migrate those database changes; export/import the pages or migrate the site.

## Included interactions

- Click-operated desktop mega menus and an accessible mobile navigation drawer; Escape, outside-click, focus-leave, and breakpoint dismissal.
- Service, industry, and delivery explorers with arrow-key, Home, and End navigation and ARIA tab semantics.
- Searchable technology role families and an empty state.
- Filterable perspectives with complete expandable articles; deep links open the related article.
- Contact FAQs, scroll progress, back-to-top, hover feedback, and pointer-responsive hero artwork.
- Reduced-motion preferences disable decorative animation and smooth scrolling.

## Inquiry delivery

Forms submit to WordPress and use `wp_mail`; they no longer open the visitor's email application. They include native required-field validation, server validation, a nonce, a honeypot, and a one-minute rate limit per hashed client IP. User-supplied values are sanitized; the reply-to address is validated. Forms do not save inquiry content in the WordPress database. A positive message means the configured mail transport accepted the email, not that it reached the recipient's inbox.

The destination defaults to the WordPress administrator email until changed in the Customizer. Configure the host's mail service or an SMTP plugin, verify the sender domain as required, and send a real delivery test before publishing. The Local environment's mail catcher does not test production inbox delivery.

## Assets and references

The header uses an inline SVG brand mark and styled ShreeLynx text for a seamless background and crisp rendering. The original raster logo remains bundled as a reference asset. The sculptural hero and interface illustrations are original SVG/CSS artwork. Lucide 0.468.0 is bundled locally with its license in the library header. DM Sans and Manrope load through Google Fonts; system fonts provide fallbacks.

The supplied references informed the overall content hierarchy, service breadth, and editorial approach, particularly [Eureka Infotech](https://www.eurekainfotech.com/), [IB Systems](https://ibsysinc.com/), [InfiGlobe Solutions](https://infiglobesolutions.com/), and [Eternal Talent](https://eternaltalent.in/). Additional supplied sites were reviewed where accessible. Conizo, Solar6, and SRKEPL were unavailable to the research tool; Vertuel AI also failed live browser DNS resolution. No reference-site code, copy, testimonials, client logos, or performance figures were reused.

## Validation

See the accompanying QA report. PHP syntax, JavaScript syntax, all eight routes, desktop and phone overflow, anchors and assets, menu behavior, keyboard navigation, tab panels, search, filters, article expansion, native form validation, and local mail acceptance were checked. Tablet layout was spot-checked. Production-host compatibility and production inbox delivery remain to be verified.
