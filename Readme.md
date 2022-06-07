# lazyload-gfonts

An util for lazy loading Google Fonts.

## Usage

Step 1: Install this package

```bash
$ npm install lazyload-gfonts
```

Step 2: Use it as a normal method

```ts
import { lazyloadGoogleFonts } from 'lazyload-gfonts';

lazyloadGoogleFonts({
  fontFamily: 'Noto Sans SC',
  fontWeight: [400, 500],
  display: 'swap',
  apiHost: '', // You can specify the host of Google Font API for special usage.
});

// or you can directly pass an url to it

lazyloadGoogleFonts('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500');
```

## License

MIT
