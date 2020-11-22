import styled from 'styled-components';
import { borderColor, space, minWidth, flexDirection, bgColor } from 'styled-system';
import themeSpace from '../theme/space';

const ButtonBase = styled.button`
  border: 1px solid;
  ${minWidth};
  ${bgColor};
  ${borderColor};
  ${space};
  ${flexDirection};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  height: 36px;
  padding: 0 ${themeSpace[3]}px;
  transition: all 100ms ease-out;
  outline: none;
  position: relative;
  max-width: max-content;

  &:not(:disabled) {
    cursor: pointer;
  }
`;

export default ButtonBase;
