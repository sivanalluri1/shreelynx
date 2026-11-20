# ShreeLynx WordPress theme — version 2.1.0

An original redesign for a software and technology consulting business. The theme uses warm white, forest green, a dark editorial section, expressive typography, and an original vector mesh sculpture. It includes eight pages: Home, Services, Industries, About, Talent, Careers, Insights, and Contact.

## Install or update

1. Back up your WordPress site and database.
2. Under Appearance → Themes → Add Theme → Upload Theme, upload `shreelynx-wordpress-production.zip`. For an existing installation, choose to replace the current theme with the uploaded version.
3. Activate ShreeLynx if needed.
4. Open Appearance → ShreeLynx Setup. On a fresh site, click **Install / update ShreeLynx pages**.
5. To upgrade the initial ShreeLynx design, select **Update previously imported ShreeLynx pages to the new design**, then click the install/update button. This refreshes only pages marked as imported by this theme. Existing unrelated pages are preserved. Previous content is saved in `_shreelynx_design_backup` post metadata and WordPress revisions where enabled. Inspect page content and the homepage after updating.
6. Contact and career inquiries are fixed to `info@shreelynx.com`, with the visitor’s validated address as Reply-To. Configure Settings → Local Mail on the managed host to send from this mailbox.
7. Configure and test email delivery on your host before launching.

The production theme is live at https://shreelynx.com/. All eight pages were imported, HTTPS was configured, and a production test inquiry was confirmed in the info@shreelynx.com inbox. The business mailing address and email appear on Contact, About, and the footer. Contact begins with the inquiry form. SMTP credentials and live WordPress settings are managed on the host and are not stored in this repository.

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

The destination and sender are `info@shreelynx.com`; old Customizer recipient settings are ignored. Configure the host's mail service or an SMTP plugin, verify the sender domain as required, and send a real delivery test before publishing. The Local environment's mail catcher does not test production inbox delivery.

## Assets and references

The header uses an inline SVG brand mark and styled ShreeLynx text for a seamless background and crisp rendering. The original raster logo remains bundled as a reference asset. The sculptural hero and interface illustrations are original SVG/CSS artwork. Lucide 0.468.0 is bundled locally with its license in the library header. DM Sans and Manrope load through Google Fonts; system fonts provide fallbacks.

The supplied references informed the overall content hierarchy, service breadth, and editorial approach, particularly [Eureka Infotech](https://www.eurekainfotech.com/), [IB Systems](https://ibsysinc.com/), [InfiGlobe Solutions](https://infiglobesolutions.com/), and [Eternal Talent](https://eternaltalent.in/). Additional supplied sites were reviewed where accessible. Conizo, Solar6, and SRKEPL were unavailable to the research tool; Vertuel AI also failed live browser DNS resolution. No reference-site code, copy, testimonials, client logos, or performance figures were reused.

## Validation

See the accompanying QA report. PHP syntax, JavaScript syntax, all eight routes, desktop and phone overflow, anchors and assets, menu behavior, keyboard navigation, tab panels, search, filters, article expansion, native form validation, and local mail acceptance were checked. Tablet layout was spot-checked. Production installation and inbox delivery have also been verified. The existing draft privacy policy and missing robots.txt remain follow-up items.

## Business contact details

The Contact and About pages use `[shreelynx_business_contact]` for the public email and business mailing address. The footer shows the same details on every page. The provided Sheridan address is labeled as a business mailing address. Uploading the theme updates the footer immediately upon activation; bundled page changes require an explicit content import/update.
