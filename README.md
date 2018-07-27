# SVGeoStack Generator

**[Demo Page](https://svgeostack.netlify.com/)**

*Programmatically generated random SVGs – GeoStack style*

Inspired by a [Dribbble shot](https://dribbble.com/shots/4806195-SXSW-Featured-Events-Exploration), I wanted to recreate the geometric design of the stacked boxes. Instead of recreating it exactly, I thought it would be interesting to dynamically generate the SVGs so there would be nearly endless possibilities. 

## Features

- The code for each SVG can be copied to the clipboard
- Each generated SVG can be downloaded
- Once more than one SVG has been generated, all generated SVGs can be nagivated to using the `prev` and `next` buttons

## Accessibility

- Keyboard accessible
- Uses `aria-live` so screenreader users can be updated when:
  - a new SVG is generated
  - code is copied successfully or the copy fails
  - an SVG is downloaded successfully or the download fails
  - history is navigated (the currently displayed SVG index is announced)
- Obvious focus styles to aid users navigating with their keyboard

## Uses

- Vanilla JavaScript (ES6)
- SCSS
- [ClipboardJS](https://clipboardjs.com/)
- Parcel Bundler


