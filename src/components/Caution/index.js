import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { space, border, borderColor } from 'styled-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import Text from 'components/Text';
import { FONT_WEIGHTS, FONT_TYPES } from 'components/theme/fonts';
import { COLORS, COLORS_VALUES } from 'components/theme/colors';

const CautionContainer = styled(Flex)`
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
  direction: ${props => (props.isRtl ? 'rtl' : 'ltr')};
  ${space};
  ${border};
  ${borderColor};
`;

const Caution = ({ bgColor, textColor, borderColorProp, children, ...otherProps }) => (
  <CautionContainer
    width={1}
    {...otherProps}
    border="1px solid"
    borderColor={COLORS_VALUES[borderColorProp]}
    bg={bgColor}
    p={2}
  >
    <FontAwesomeIcon icon={faExclamation} color={COLORS_VALUES[textColor]} size="xs" />
    <Text
      mx={1}
      type={FONT_TYPES.BODY}
      color={COLORS_VALUES[textColor]}
      fontWeight={FONT_WEIGHTS.NORMAL}
    >
      {children}
    </Text>
  </CautionContainer>
);

Caution.propTypes = {
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  borderColorProp: PropTypes.string,
  children: PropTypes.string.isRequired,
  isRtl: PropTypes.bool,
};

Caution.defaultProps = {
  bgColor: COLORS.ILLUSTRATION_BACKGROUND,
  textColor: COLORS.WHITE,
  borderColorProp: COLORS.BRANDING_GREEN,
  isRtl: true,
};

export default Caution;
