# Design Direction: Artistic Journey (Three Museum Rooms)

The site follows three reference images in `Refference/`. The references set the look; the TXT file and `src/content/` set every word.

| Room | Reference | Where in code |
| --- | --- | --- |
| Homepage | `homepage.png`: a huge serif wordmark split by hairlines over a four-column fact row. By request the hero sits on The School of Athens (cropped as a background, under a dark wash); the Featured Artwork section (`FeaturedArtworkSection.tsx`, placed after My Favorite Masterpiece) shows the painting whole | `HeroProfileSection.tsx` |
| Exhibition | `artworkexhibition.png`: green damask wall, gilt frames in a salon hang on wires, wood wainscot, parquet floor | `GallerySection.tsx`, `ArtworkCard.tsx` |
| Exhibition details | `artworkdetails.png`: a tall burgundy wall panel of text beside the painting lit on a burgundy wall, with a small wall label | `ArtworkModal.tsx` |

All shared styles live in `src/styles/museum.css`; site-wide tokens (palette, fonts, spacing) in the `:root` block of `src/styles/main.css`.

## Shared rules

- **Page:** cream `#FBEFDC`, ink `#110D0A`, 1px ink hairlines. One container: `min(100% - 2 × gutter, 1480px)`.
- **Type:** DM Serif Display for display and headings (one weight, italic for the second line of a split heading); Hanken Grotesk for nav, body, labels and buttons; Anton, italic and uppercase, only for the artwork title on the details panel.
- **Nav:** one plain text row spread across the measure, `Light/Dark` switch at the end (current word in ink, the other muted). Below 1100px: wordmark, music, switch and a Menu button that opens large serif links.
- **Buttons:** square, 1px ink border, 44px tall. Solid ink for the main action, outline for the second. Hover inverts.
- **Frames:** one gilt frame for every painting (gallery and details), sized from the painting's own width and height. Paintings are never cropped or stretched.
- **Wall label:** ivory card, serif title, sans artist and facts. Used under gallery frames and beside the painting in details.
- **Walls:** Western wing green, Asian wing burgundy, details room burgundy. Walls stay the same in light and dark mode.
- **Music:** one `<audio>` element (looping), mounted once in `App.tsx`. The only control is the round ink button fixed bottom-left (`AmbientMusicPlayer.tsx`); its panel holds Play/Pause, Mute, Volume and status. Autoplay is attempted once; if the browser blocks it, a gilt ring pulses on the button until the visitor presses Play.
- **Final Reflection:** an inverted pyramid on desktop (12-column grid): answers 1 to 3 across the top, 4 and 5 centred below, Closing Thoughts as a narrower burgundy panel at the bottom, joined by short gilt lines. Tablet: 2 + 2, the fifth centred, closing full width. Phone: one column.
- **Backgrounds:** cream rooms (Introduction, Gallery heading, Masterpiece heading, Featured Artwork, Credits, footer) carry a fine paper grain (`--paper-grain`); the beige reading rooms (Highlights, My Artwork, Final Reflection) add a faint watermark of the gallery leaf motif (`--paper-motif`). The hero, the Western/Asian rooms and the masterpiece showcase keep their own backgrounds.
- **Labels:** no "Part N" labels anywhere; section titles carry the names.
- **Motion:** frames lift 5px and the spotlight brightens on hover; the homepage painting's grain fades on hover. Transform and opacity only, all off under `prefers-reduced-motion`.

## Content rules

- Answers and reflections come from `Art App Requirments/Student Complete Name- Ma. Syhra Dl.txt` through `src/content/`. Blank answers stay blank (`.blank-answer-slot`).
- Artwork images live in `public/images/`; their `width` and `height` in `src/content/` must match the files.
