import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { space, minHeight, width, height, maxWidth } from 'styled-system';
import { COLORS, COLORS_VALUES } from 'components/theme/colors';

const Card = styled(Flex)`
  background: ${props => props.bgColor}
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  position: relative;
  overflow: ${props => props.overflow};
  ${space};
  ${minHeight};
  ${maxWidth}
  ${width};
  ${height};
`;
Card.displayName = 'Card';

Card.defaultProps = {
  bgColor: COLORS_VALUES[COLORS.GREY_MEDIUM],
};

export default Card;
