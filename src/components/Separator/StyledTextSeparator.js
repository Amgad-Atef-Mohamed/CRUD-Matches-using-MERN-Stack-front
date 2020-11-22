import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex } from '@rebass/grid';
import { width, space } from 'styled-system';
import Text from '../Text';
import { COLORS, COLORS_VALUES } from '../theme/colors';
import { FONT_TYPES, FONT_WEIGHTS } from '../theme/fonts';
import Space from '../theme/space';

const StyledLine = styled.div`
  background-color: ${COLORS_VALUES[COLORS.GREY_LIGHT]};
  height: 1px;
  ${width};
  ${space};
`;

const SeparatorText = styled(Text)`
  color: ${COLORS_VALUES[COLORS.GREY_LIGHT]};
  font-weight: ${FONT_WEIGHTS.LIGHT};
  display: inline-table;
  margin: 0 ${Space[2]}px;
  white-space: nowrap;
`;

const TextSeparator = props => {
  const { text } = props;

  return (
    <Flex alignItems="center" justifyContent="center" {...props}>
      <StyledLine width={30} />
      <SeparatorText tag="span" type={FONT_TYPES.CAPTION}>
        {text}
      </SeparatorText>
      <StyledLine width={1} />
    </Flex>
  );
};

TextSeparator.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextSeparator;
