export const FONT_TYPES = {
  MEGA_TITLE: 'megaTitle',
  SUPER_TITLE: 'superTitle',
  BIG_TITLE: 'bigTitle',
  TITLE: 'title',
  HEADING: 'heading',
  SUBHEADING: 'subheading',
  BODY: 'body',
  CAPTION: 'caption',
};

export const FONT_SIZES = {
  // Breakpoints: ['400px', '576px', '786px', '992px']
  [FONT_TYPES.MEGA_TITLE]: ['22px', '22px', '22px', '22px'],
  [FONT_TYPES.SUPER_TITLE]: ['22px', '22px', '22px', '22px'],
  [FONT_TYPES.BIG_TITLE]: ['22px', '22px', '22px', '22px'],
  [FONT_TYPES.TITLE]: ['20px', '20px', '20px', '20px'],
  [FONT_TYPES.HEADING]: ['16px', '16px', '16px', '16px'],
  [FONT_TYPES.SUBHEADING]: ['16px', '16px', '16px', '16px'],
  [FONT_TYPES.BODY]: ['16px', '16px', '14px', '14px'],
  [FONT_TYPES.CAPTION]: ['12px', '12px', '12px', '12px'],
};

export const FONT_WEIGHTS = {
  BOLD: 'bold',
  SEMI_BOLD: 600,
  NORMAL: 500,
  LIGHT: 400,
};

export const LINE_HEIGHTS = {
  [FONT_TYPES.MEGA_TITLE]: '2',
  [FONT_TYPES.SUPER_TITLE]: '1.5',
  [FONT_TYPES.BIG_TITLE]: '1.5',
  [FONT_TYPES.TITLE]: '1.5',
  [FONT_TYPES.HEADING]: '1.5',
  [FONT_TYPES.SUBHEADING]: '1.5',
  [FONT_TYPES.BODY]: '1.5',
  [FONT_TYPES.CAPTION]: '1.5',
};
