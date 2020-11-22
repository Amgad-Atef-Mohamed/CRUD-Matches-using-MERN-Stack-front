import styled from 'styled-components';
import { space, width } from 'styled-system';
import { Flex } from '@rebass/grid';

const NoAnimationFlex = styled(Flex)`
  animation: none;
  background: transparent !important;
`;

const NoAnimationBox = styled.div`
  animation: none;
  background: transparent !important;
  ${space};
  ${width};
`;

export { NoAnimationBox, NoAnimationFlex };
export default NoAnimationBox;
