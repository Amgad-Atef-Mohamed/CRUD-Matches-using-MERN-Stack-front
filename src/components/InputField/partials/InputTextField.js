import styled from 'styled-components';
import { fontSize } from 'styled-system';
import { COLORS, COLORS_VALUES } from '../../theme/colors';

const InputTextField = styled.input`
  background-color: ${COLORS_VALUES[COLORS.GREY_LIGHT]};
  border: 1px solid ${COLORS_VALUES[COLORS.GREY_DARK]};
  border-radius: ${props => props.theme.space[1]}px;
  color: ${props => (props.color ? props.color : COLORS_VALUES[COLORS.BRANDING_GREEN])};
  font-weight: ${props => props.theme.fontWeights.NORMAL};
  line-height: normal;
  outline: 0;
  width: ${props => (props.icon ? 'calc(100% - 36px)' : 'calc(100% - 14px)')};
  ${fontSize}

  &:lang(ar) {
    padding: ${props => props.theme.space[2]}px
      ${props => (props.icon ? props.theme.space[8] : props.theme.space[2])}px
      ${props => props.theme.space[2]}px ${props => props.theme.space[1]}px;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;

InputTextField.displayName = 'InputTextField';

export default InputTextField;
