import styled from 'styled-components';
import { fontSize } from 'styled-system';
import { COLORS, COLORS_VALUES } from '../../theme/colors';

const TextAreaField = styled.textarea`
  ${fontSize};
  background-color: ${COLORS_VALUES[COLORS.GREY_LIGHT]};
  border: 1px solid ${props => COLORS_VALUES[props.borderColor]};
  border-radius: ${props => props.theme.space[1]}px;
  color: ${COLORS_VALUES[COLORS.BRANDING_GREEN]};
  font-weight: ${props => props.theme.fontWeights.NORMAL};
  line-height: normal;
  outline: 0;
  width: calc(100% - 14px);
  min-height: 125px;

  &:lang(ar) {
    padding: ${props => props.theme.space[2]}px;
  }
`;

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
