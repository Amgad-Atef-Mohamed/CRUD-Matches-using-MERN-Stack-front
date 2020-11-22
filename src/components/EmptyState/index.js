import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from 'styled-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex } from '@rebass/grid';
import { COLORS, COLORS_VALUES } from 'components/theme/colors';
import { FONT_TYPES } from 'components/theme/fonts';
import Text from 'components/Text';

const EmptyStateContainer = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  ${space};
`;

const EmptyState = props => {
  const {
    icon,
    iconSize,
    iconColor,
    text,
    textCaption,
    textSize,
    textCaptionSize,
    textColor,
    children,
    spin,
  } = props;

  return (
    <EmptyStateContainer p={3} flexDirection="column">
      <FontAwesomeIcon icon={icon} size={iconSize} color={COLORS_VALUES[iconColor]} spin={spin} />
      <Text mt={4} type={textSize} color={textColor} textAlign="center">
        {text}
      </Text>
      {textCaption && (
        <Text mt={4} type={textCaptionSize} color={textColor} textAlign="center">
          {textCaption}
        </Text>
      )}
      {children}
    </EmptyStateContainer>
  );
};

EmptyState.propTypes = {
  text: PropTypes.string,
  textCaption: PropTypes.string,
  icon: PropTypes.shape({}).isRequired,
  iconSize: PropTypes.string,
  iconColor: PropTypes.string,
  textSize: PropTypes.string,
  textCaptionSize: PropTypes.string,
  textColor: PropTypes.string,
  children: PropTypes.element,
  spin: PropTypes.bool,
};

EmptyState.defaultProps = {
  text: '',
  textCaption: undefined,
  textSize: FONT_TYPES.SUPER_TITLE,
  textCaptionSize: FONT_TYPES.TITLE,
  iconSize: '8x',
  iconColor: COLORS.GREY_LIGHT,
  textColor: COLORS.GREY_LIGHT,
  children: undefined,
  spin: false,
};

export default EmptyState;
