import Color from 'color';
import ColorString from 'color-string';

const baseColors = {
  black: '#000',
  greyDark: '#212121',
  greyMedium: '#303030',
  greyLight: '#424242',
  greyShadeTwo: '#e0e0e0',
  placeholderGrey: '#737373',
  white: '#fff',
  brandingGreen: '#25C281',
  brandingBlue: '#25364B',
  error: '#9C2B2E',
  lightRed: '#E84E4F',
  success: '#28A745',
  warning: '#FFC107',
  primary: '#007BFF',
  transparent: 'transparent',
  cyan: '#008080',
};

const COLORS = {
  BLACK: 'black',
  GREY_DARK: 'greyDark',
  GREY_MEDIUM: 'greyMedium',
  GREY_LIGHT: 'greyLight',
  DISABLED: 'disabled',
  PLACEHOLDER_GREY: 'placeholderGrey',
  WHITE: 'white',
  BRANDING_GREEN: 'brandingGreen',
  BRANDING_BLUE: 'brandingBlue',
  ERROR: 'error',
  LIGHT_RED: 'lightRed',
  SUCCESS: 'success',
  WARNING: 'warning',
  PRIMARY: 'primary',
  TRANSPARENT: 'transparent',
  ILLUSTRATION_BACKGROUND: 'illustrationBackground',
  WHITE_TRANSPARENT_BACKGROUND: 'whiteTransparentBackground',
  CYAN: 'cyan',
};

const COLORS_VALUES = {
  [COLORS.BLACK]: baseColors.black,
  [COLORS.GREY_DARK]: baseColors.greyDark,
  [COLORS.GREY_MEDIUM]: baseColors.greyMedium,
  [COLORS.GREY_LIGHT]: baseColors.greyLight,
  [COLORS.DISABLED]: baseColors.greyShadeTwo,
  [COLORS.PLACEHOLDER_GREY]: baseColors.placeholderGrey,
  [COLORS.WHITE]: baseColors.white,
  [COLORS.BRANDING_GREEN]: baseColors.brandingGreen,
  [COLORS.BRANDING_BLUE]: baseColors.brandingBlue,
  [COLORS.ERROR]: baseColors.error,
  [COLORS.LIGHT_RED]: baseColors.lightRed,
  [COLORS.SUCCESS]: baseColors.success,
  [COLORS.WARNING]: baseColors.warning,
  [COLORS.PRIMARY]: baseColors.primary,
  [COLORS.ILLUSTRATION_BACKGROUND]: ColorString.to.rgb(
    Color(baseColors.brandingOrange)
      .alpha(0.2)
      .rgb()
      .array(),
  ),
  [COLORS.WHITE_TRANSPARENT_BACKGROUND]: ColorString.to.rgb(
    Color(baseColors.white)
      .alpha(0.2)
      .rgb()
      .array(),
  ),
  [COLORS.CYAN]: baseColors.cyan,
};

export { COLORS, COLORS_VALUES };
export default COLORS;
