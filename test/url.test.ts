import { expect } from 'chai';
import { getGoogleFontUrl } from '../src/main';

describe('URL Generate Test', () => {
  it('without fontFamily', () => {
    try {
      getGoogleFontUrl({
        fontFamily: '',
      });
    } catch (err) {
      expect((err as TypeError).message).to.includes('fontFamily should be a non-empty string');
    }
  });
  it('with single fontFamily', () => {
    expect(
      getGoogleFontUrl({
        fontFamily: 'Noto Sans SC',
        fontWeight: [400, 500],
      }),
    ).to.equal('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500');
    expect(
      getGoogleFontUrl({
        fontFamily: 'Noto Sans SC',
        fontWeight: [300],
      }),
    ).to.equal('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300');
    expect(
      getGoogleFontUrl({
        fontFamily: 'Noto Sans SC',
        fontWeight: [300],
        display: 'swap',
      }),
    ).to.equal('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap');
    expect(
      getGoogleFontUrl({
        fontFamily: 'Noto Sans SC',
        fontWeight: [300],
        display: 'swap',
        apiHost: 'gfonts.pwp.link',
      }),
    ).to.equal('https://gfonts.pwp.link/css2?family=Noto+Sans+SC:wght@300&display=swap');
  });
  it('with multi fontFamily', () => {
    expect(
      getGoogleFontUrl({
        fontFamily: [
          {
            fontFamily: 'Noto Sans SC',
            fontWeight: [400, 500],
          },
        ],
      }),
    ).to.equal('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500');
    expect(
      getGoogleFontUrl({
        fontFamily: [
          {
            fontFamily: 'Noto Sans SC',
            fontWeight: [400, 500],
          },
          {
            fontFamily: 'M PLUS Rounded 1c',
            fontWeight: [300],
          },
        ],
        display: 'swap',
      }),
    ).to.equal(
      'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500&family=M+PLUS+Rounded+1c:wght@300&display=swap',
    );
  });
});
