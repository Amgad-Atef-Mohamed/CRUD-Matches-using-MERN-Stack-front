import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { shimmerEffect } from '../theme/animations';
import { COLORS_VALUES, COLORS } from '../theme/colors';

const ShimmerEffect = styled(Flex)`
  div {
    animation-duration: 1.3s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${shimmerEffect};
    animation-timing-function: linear;

    background: ${COLORS_VALUES[COLORS.GREY_LIGHT]};
    background-attachment: fixed;
    background-image: linear-gradient(
      to right,
      ${COLORS_VALUES[COLORS.GREY_LIGHT]} 0%,
      ${COLORS_VALUES[COLORS.GREY_MEDIUM]} 40%,
      ${COLORS_VALUES[COLORS.GREY_LIGHT]} 60%,
      ${COLORS_VALUES[COLORS.GREY_LIGHT]} 100%
    );
    background-repeat: no-repeat;
    background-size: 250%;
  }
`;

export default ShimmerEffect;
