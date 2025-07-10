// Design principle constants
const BASE_FONT_SIZE = 16;
const TYPE_SCALE = 1.25;
export const typeScale = (exponent: number) =>
  `${(BASE_FONT_SIZE / 16) * Math.pow(TYPE_SCALE, exponent)}rem`;

export const fontConstants = {
  htmlFontSize: BASE_FONT_SIZE,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  lineHeight: 1.5,
};

export default function themeTypography() {
  return {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    // Heading hierarchy
    h1: {
      fontSize: typeScale(4),
      fontWeight: 700,
      lineHeight: fontConstants.lineHeight,
      margin: 0,
    },
    h2: {
      fontSize: typeScale(3),
      fontWeight: 700,
      lineHeight: fontConstants.lineHeight,
      margin: 0,
    },
    h3: {
      fontSize: typeScale(2),
      fontWeight: 600,
      lineHeight: fontConstants.lineHeight,
      margin: 0,
    },
    h4: {
      fontSize: typeScale(1),
      fontWeight: 600,
      lineHeight: fontConstants.lineHeight,
      margin: 0,
    },
    h5: {
      fontSize: typeScale(0.5),
      fontWeight: 500,
      lineHeight: fontConstants.lineHeight,
      margin: 0,
    },
    h6: {
      fontSize: typeScale(0),
      fontWeight: 500,
      lineHeight: fontConstants.lineHeight,
    },

    // Body text variants
    body1: {
      fontSize: typeScale(-1),
      lineHeight: fontConstants.lineHeight,
      margin: 0,
    },
    body2: {
      fontSize: typeScale(-1.25),
      lineHeight: fontConstants.lineHeight,
      margin: 0,
    },

    // Subtitle variants
    subtitle1: {
      fontSize: typeScale(0.25),
      fontWeight: 500,
      lineHeight: fontConstants.lineHeight,
      margin: 0,
    },
    subtitle2: {
      fontSize: typeScale(-0.125),
      fontWeight: 400,
      lineHeight: fontConstants.lineHeight,
      margin: 0,
    },

    // Caption and overline
    caption: {
      fontSize: typeScale(-0.5),
      fontWeight: 400,
      lineHeight: fontConstants.lineHeight,
      margin: 0,
    },
    overline: {
      fontSize: typeScale(-0.75),
      fontWeight: 500,
      lineHeight: fontConstants.lineHeight,
      margin: 0,
    },
  };
}
