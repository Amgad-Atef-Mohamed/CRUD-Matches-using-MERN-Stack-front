import styled from 'styled-components';
import { space } from 'styled-system';

import { COLORS, COLORS_VALUES } from '../theme/colors';

const StyledSeparator = styled.hr`
  border: 0;
  border-top: 1px solid ${COLORS_VALUES[COLORS.GREY_DARK]};
  display: block;
  height: 1px;
  padding: 0;
  ${space};
`;

export default StyledSeparator;
