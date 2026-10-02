# Paste checklist — https://www.medtronic.com/en-us/index.html

The migration agents generated the page content as HTML files in this branch. da.live has no credential-free
API for writing document content, so this last step is a copy/paste (each takes about a minute).

1. **en-us/index** — open `.migration/medtronic-com/content/en-us/index.html` in a browser, select all (Ctrl+A) and copy (Ctrl+C).
   Open https://da.live/edit#/pradeepgupta-eds/med-poc/en-us/index, create the document if it does not exist yet, paste (Ctrl+V), then Preview.
2. **header** — open `.migration/medtronic-com/content/header.html` in a browser, select all (Ctrl+A) and copy (Ctrl+C).
   Open https://da.live/edit#/pradeepgupta-eds/med-poc/header, select and delete the existing placeholder content, paste (Ctrl+V), then Preview.
3. **footer** — open `.migration/medtronic-com/content/footer.html` in a browser, select all (Ctrl+A) and copy (Ctrl+C).
   Open https://da.live/edit#/pradeepgupta-eds/med-poc/footer, select and delete the existing placeholder content, paste (Ctrl+V), then Preview.

4. Open https://migration-a0ec29ff--med-poc--pradeepgupta-eds.aem.page/en-us/index and compare it with https://www.medtronic.com/en-us/index.html.
5. Happy with it? Open a pull request from `migration-a0ec29ff` into `main`.

Notes from the analysis of https://www.medtronic.com/en-us/index.html:
- Section vision-2 is a horizontally scrolling carousel with tiles cropped at the viewport edges. It needs touch and keyboard navigation.
- A cookie consent banner overlays the page in the screenshot, over the communities and innovation sections. Exclude it from the migration and handle consent separately.
- The screenshot shows a floating share button at the right edge of the hero. It may be a sticky element and needs a decision.
- The header (logo, search, utility nav) and footer (links, social icons, legal) are outside these section ids. They should be built as the standard header and footer blocks with fragments.
- Every CTA href in the scraped data is empty, so the real link targets must be recovered from the source site.
- Several sections use large background photos with overlaid text. Use createOptimizedPicture and check the text contrast.
- Two sections have bottom bars of icon tiles over a photo. Check how they behave on mobile, where they will probably need to stack.
- I could not use these MCP connectors because they need authorization: claude.ai Atlassian, Atlassian JIRA, Atlassian Rovo, Atlassian for HC Forward, Figma, PubMed and microsoft Learn. This session is non-interactive, so I could not run the OAuth flow. To use them, authorize them in your claude.ai connector settings or with /mcp in an interactive session. They are unavailable until then, and this analysis did not need them.
- The phone screenshot of the live page was cut off at 6000px, so the lower part of the phone layout is not planned.
- The body was planned from the screenshots of the live page: 8 sections and 12 pictures cut from it. Header (0-133) and footer (from about 5158) excluded. Cookie bar overlays the communities-teaser band and hides part of its content. The MCP servers (claude.ai Atlassian, Atlassian JIRA, Atlassian Rovo, Atlassian for HC Forward, Figma, PubMed, Microsoft Learn) need authorization. This session is non-interactive, so I couldn't run the OAuth flow. Please authorize them through your claude.ai connector settings, or use /mcp in an interactive session. Their tools are unavailable until then.
- Left out pictures cut from the desktop screenshot that were not pictures worth keeping: 1 under a floating widget, 1 too small.
- The pictures of 5 desktop sections were looked at again and 1 boxes were tightened.
- 1 of the desktop pictures already show their section's own text (drawn once, by the picture).
- Left out pictures cut from the mobile screenshot that were not pictures worth keeping: 2 too small.
- The pictures of 7 mobile sections were looked at again and 8 boxes were tightened.

## Documents to paste

- **header**: https://da.live/edit#/pradeepgupta-eds/med-poc/header (version `93636fa0`, generated 2026-10-02T18:18:38.356Z, source revision `b44f63d7`) — a shared path: pasting replaces any page already there (DA content is not isolated by git branches).
- **footer**: https://da.live/edit#/pradeepgupta-eds/med-poc/footer (version `c1913c07`, generated 2026-10-02T17:59:35.098Z, source revision `b44f63d7`) — a shared path: pasting replaces any page already there (DA content is not isolated by git branches).
- **en-us/index**: https://da.live/edit#/pradeepgupta-eds/med-poc/en-us/index (version `604c045e`, generated 2026-10-02T17:53:54.650Z, source revision `b44f63d7`) — a shared path: pasting replaces any page already there (DA content is not isolated by git branches).
