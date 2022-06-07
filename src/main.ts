export interface GoogleFontFamily {
  fontFamily: string;
  fontWeight: number[];
}

export interface GoogleFontsOptions {
  apiHost?: string;
  fontFamily: string | GoogleFontFamily[];
  fontWeight?: number[];
  display?: string;
}

export const getGoogleFontUrl = (options: GoogleFontsOptions) => {
  if (!options.fontFamily) {
    throw new TypeError('fontFamily should be a non-empty string.');
  }
  const apiHost = options.apiHost || 'fonts.googleapis.com';
  let fontFamily = '';
  let fontWeight = '';
  if (typeof options.fontFamily === 'string') {
    fontFamily = `&family=${options.fontFamily.replace(/\s/g, '+')}`;
    fontWeight = options.fontWeight ? `:wght@${options.fontWeight.join(';')}` : '';
  } else {
    fontFamily = options.fontFamily
      .map((item) => {
        const familyStr = `&family=${item.fontFamily.replace(/\s/g, '+')}`;
        const weightStr = item.fontWeight ? `:wght@${item.fontWeight.join(';')}` : '';
        return `${familyStr}${weightStr}`;
      })
      .join('');
  }
  const display = options.display ? `&display=${options.display}` : '';
  return `https://${apiHost}/css2?${fontFamily.slice(1)}${fontWeight}${display}`;
};

export const lazyloadGoogleFonts = (url: string | GoogleFontsOptions, force = false) => {
  if (typeof url === 'string' && (!url.includes('https://') || !url.includes('css2?'))) {
    throw new TypeError('Invalid Google Fonts stylesheet url.');
  }
  if (document.querySelector('#lazyload-gfont') && !force) {
    console.warn('Google fonts has been loaded.');
    return;
  }
  const cssUrl = typeof url === 'string' ? url : getGoogleFontUrl(url);
  const cssEl = document.createElement('link');
  cssEl.id = 'lazyload-gfont';
  cssEl.href = cssUrl;
  cssEl.rel = 'stylesheet';
  cssEl.type = 'text/css';
  cssEl.crossOrigin = 'anonymous';
  document.querySelector('head')?.appendChild(cssEl);
};
