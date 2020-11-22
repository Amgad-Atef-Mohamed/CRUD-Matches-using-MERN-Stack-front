import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { space, width } from 'styled-system';
import Text from 'components/Text';
import { COLORS, COLORS_VALUES } from 'components/theme/colors';

export const StickyContainer = styled(Flex)`
  position: -webkit-sticky;
  position: sticky;
  z-index: 1;
  background-color: ${COLORS_VALUES[COLORS.GREY_MEDIUM]};
`;

export const CardBody = styled(Flex)`
  height: 100%;
`;

export const SubTitle = styled(Text)`
  direction: rtl;
  margin-left: ${props => props.theme.space[1]}px;
`;

export const CardTitle = styled(Flex)`
  text-align: center;
  border-bottom: 1px solid ${COLORS_VALUES[COLORS.GREY_MEDIUM]};
`;

export const CardLabel = styled(Text)`
  border-radius: ${props => props.theme.space[1]}px;
  min-width: 56px;
  width: max-content;
  text-align: center;
`;

export const CardFooter = styled(Flex)`
  border-top: 1px solid ${COLORS_VALUES[COLORS.GREY_MEDIUM]};
`;

export const CallToActionIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

export const HyperLink = styled.a`
  ${width};
  display: flex;
  text-decoration: none;
`;

export const HyperLinkText = styled(Text)`
  &:hover {
    color: ${COLORS_VALUES[COLORS.BRANDING_GREEN]};
  }
`;

export const MoreDetailsLink = styled(Link)`
  text-decoration: none;
`;

export const StyledSelect = styled(Select)`
  ${width};
  ${space};
`;

export const customSelectStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: COLORS_VALUES[COLORS.GREY_LIGHT],
    color: COLORS_VALUES[COLORS.WHITE_TRANSPARENT_BACKGROUND],
  }),
  option: (styles, { isDisabled }) => ({
    ...styles,
    backgroundColor: COLORS_VALUES[COLORS.GREY_LIGHT],
    color: COLORS_VALUES[COLORS.WHITE],
    ':hover': {
      backgroundColor: COLORS_VALUES[COLORS.WHITE],
      color: COLORS_VALUES[COLORS.GREY_LIGHT],
    },
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    marginBottom: '2px',
  }),
  container: styles => ({
    ...styles,
    backgroundColor: COLORS_VALUES[COLORS.GREY_LIGHT],
  }),
  multiValue: styles => ({
    ...styles,
    backgroundColor: COLORS_VALUES[COLORS.GREY_LIGHT],
    color: COLORS_VALUES[COLORS.WHITE],
  }),
  multiValueLabel: styles => ({
    ...styles,
    backgroundColor: COLORS_VALUES[COLORS.BRANDING_GREEN],
    color: COLORS_VALUES[COLORS.WHITE],
  }),
  multiValueRemove: styles => ({
    ...styles,
    backgroundColor: COLORS_VALUES[COLORS.ILLUSTRATION_BACKGROUND],
    color: COLORS_VALUES[COLORS.WHITE],
    ':hover': {
      backgroundColor: COLORS_VALUES[COLORS.BRANDING_GREEN],
      color: COLORS_VALUES[COLORS.WHITE],
      cursor: 'pointer',
    },
  }),
};

export const customSelectStylesIsDanger = (isDanger = false) =>
  Object.assign({}, customSelectStyles, {
    control: styles => ({
      ...styles,
      borderColor: isDanger ? COLORS_VALUES[COLORS.LIGHT_RED] : styles.borderColor,
      backgroundColor: COLORS_VALUES[COLORS.GREY_LIGHT],
      color: COLORS_VALUES[COLORS.WHITE_TRANSPARENT_BACKGROUND],
    }),
  });

export const selectColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: COLORS_VALUES[COLORS.DISABLED],
    primary25: COLORS_VALUES[COLORS.DISABLED],
    primary50: COLORS_VALUES[COLORS.DISABLED],
    primary75: COLORS_VALUES[COLORS.DISABLED],
    danger: COLORS_VALUES[COLORS.DISABLED],
    dangerLight: COLORS_VALUES[COLORS.BRANDING_GREEN],
    neutral0: COLORS_VALUES[COLORS.GREY_MEDIUM],
    neutral5: COLORS_VALUES[COLORS.ILLUSTRATION_BACKGROUND],
    neutral10: COLORS_VALUES[COLORS.ILLUSTRATION_BACKGROUND],
    neutral20: COLORS_VALUES[COLORS.DISABLED],
    neutral30: COLORS_VALUES[COLORS.DISABLED],
    neutral40: COLORS_VALUES[COLORS.DISABLED],
    neutral50: COLORS_VALUES[COLORS.PLACEHOLDER_GREY],
    neutral60: COLORS_VALUES[COLORS.DISABLED],
    neutral70: COLORS_VALUES[COLORS.DISABLED],
    neutral80: COLORS_VALUES[COLORS.DISABLED],
    neutral90: COLORS_VALUES[COLORS.DISABLED],
  },
});
